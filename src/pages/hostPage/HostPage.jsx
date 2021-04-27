import React, { useEffect, useState } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import AddHost from '../../components/host/AddHost';
import Host from '../../components/host/Host';
import BounceLoader from "react-spinners/BounceLoader";
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { getAllHosts, removeHost, getHostgroupHosts, getHostByName } from '../../application/application-service';
import Modal from '../../components/modal/Modal';
import ErrorModal from '../../components/modal/ErrorModal';
import { withLocalizeStrings } from '../../languages/Localize';
import InfoModal from '../../components/modal/InfoModal';
import { useParams } from 'react-router';
import Title from '../../components/title/Title';
import { nagiosAuthFailedMessage, authFailed, spinnerColor } from '../../common/config/config';

const SpinnerBlock = styled(Flex)`
    position: absolute;
    justify-content: center;
    width: 100%;
    height: 12rem;
    top: 40%;
    margin: 0 auto;
`;

const Board = styled(Flex)`
    position: absolute;
    top: 6rem;
    width: 100%;
    flex-wrap: wrap;
`;

let hostData = null;

const HostPage = ({ strings }) => {

    const [hosts, setHosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    let [hostnameToDelete, setHostnameToDelete] = useState('');
    let [showErrorModal, setShowErrorModal] = useState(false);
    let [color] = useState(spinnerColor);

    const { hostgroup } = useParams();

    const showDeleteModal = (hostname) => {
        setHostnameToDelete(hostname);
        setShowModal(true);
    }

    const onShowInfoModal = (data) => {
        hostData = { ...data };
        setShowInfoModal(true);
    }

    const closeInfoModal = () => { setShowInfoModal(false);}

    const deleteHost = () => { onDeleteHandler(hostnameToDelete);}

    const doNotDeleteHost = () => { setShowModal(false);}

    const closeErrorModal = () => { setShowErrorModal(false);}

    const onDeleteHandler = (hostName) => {
        (async function () {
            try {
                const res = await removeHost(hostName);
                if (res.data.error === nagiosAuthFailedMessage) {
                    setShowErrorModal(true);
                    setShowModal(false);
                    throw Error(authFailed);
                }
                setHosts(hosts.filter(host => host.host_name !== hostName));
                setShowModal(false);
            } catch (err) {
                console.error(err);
            }
        })();
    };

    useEffect(() => {
        if (hostgroup) {
            (async function () {
                try {
                    const res = await getHostgroupHosts(hostgroup);
                    console.log(res);
                    let hostsNames = res.data[0].members ? res.data[0].members : [];
                    let hostsTemp = [];
                    hostsNames.forEach(async hostName => {
                        const hostRes = await getHostByName(hostName);
                        hostsTemp.push(hostRes.data.hoststatus[0]);
                    });
                    setHosts(hostsTemp);
                    setTimeout(function () { setLoading(false); }, 500);
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            })();
        } else {
            (async function () {
                try {
                    const res = await getAllHosts();
                    setHosts(res.data.hoststatus);
                    setTimeout(function () { setLoading(false); }, 500);
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            })();
        }

    }, [hostgroup]);

    return (
        loading ? (
            <SpinnerBlock>
                <BounceLoader color={color} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                <Title text={hostgroup ? `${hostgroup}` : strings.page.hosts.allHosts} />
                <Board>
                    {showModal && <Modal question={strings.modalQuestions.deleteHost} show={showModal} confirm={deleteHost} decline={doNotDeleteHost} />}
                    {showInfoModal && <InfoModal showErrorModal={setShowErrorModal} isHost={true} show={showInfoModal} decline={closeInfoModal} data={hostData} />}
                    {showErrorModal && <ErrorModal closeInfoModal={closeInfoModal} show={showErrorModal} text={strings.page.hosts.permissionDenied} decline={closeErrorModal}/>}
                    {hosts.map(data => {
                        return <Host
                            key={data.host_object_id}
                            data={data}
                            onDeleteHandler={() => { showDeleteModal(data.host_name) }}
                            onShowInfoHandler={() => { onShowInfoModal(data) }}
                        />
                    })}
                    <AddHost />
                </Board>
            </Dashboard>
        )
    );
};

export default withLocalizeStrings(HostPage);