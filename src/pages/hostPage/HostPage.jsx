import React, { useEffect, useState } from 'react';
import Dashboard from '../../components/dashboard/Dashboard';
import AddHost from '../../components/host/AddHost';
import Host from '../../components/host/Host';
import BounceLoader from "react-spinners/BounceLoader";
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { getAllHosts, removeHost } from '../../application/application-service';
import Modal from '../../components/modal/Modal';
import { withLocalizeStrings } from '../../languages/Localize';
import InfoModal from '../../components/modal/InfoModal';

const SpinnerBlock = styled(Flex)`
    position: absolute;
    top: 10rem;
    justify-content: center;
    width: 100%;
    height: 12rem%;
    top: 35rem;
    margin: 0 auto;
`;

let hostData = null;

const HostPage = ({ strings }) => {

    const [hosts, setHosts] = useState(null);
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gainsboro");
    const [showModal, setShowModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    let [hostnameToDelete, setHostnameToDelete] = useState('');
   

    const showDeleteModal = (hostname) => {
        setHostnameToDelete(hostname);
        setShowModal(true);
    }

    const onShowInfoModal = (data) => {
        hostData = {...data};
        setShowInfoModal(true);
    }

    const closeInfoModal = () => {
        setShowInfoModal(false);
    }

    const deleteHost = () => {
        onDeleteHandler(hostnameToDelete);
    }

    const doNotDeleteHost = () => {
        setShowModal(false);
    }

    const onDeleteHandler = (hostName) => {
        removeHost(hostName).then(res => {
            console.log(res);
            setHosts(hosts.filter(host => host.host_name !== hostName));
            setShowModal(false);
        });
    }

    useEffect(() => {
        (async function () {
            try {
                const res = await getAllHosts();
                console.log(res.data.hoststatus);
                setHosts(res.data.hoststatus);
                setTimeout(function() {setLoading(false);}, 500);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }, []);

    return (
        loading ? (
            <SpinnerBlock>
                <BounceLoader color={color} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                {showModal && <Modal question={strings.modalQuestions.deleteHost} show={showModal} confirm={deleteHost} decline={doNotDeleteHost} />}
                {showInfoModal && <InfoModal show={showInfoModal} decline={closeInfoModal} data={hostData}/>}
                {hosts.map(data => {
                    return <Host
                        key={data.host_object_id}
                        data={data}
                        onDeleteHandler={() => { showDeleteModal(data.host_name) }}
                        onShowInfoHandler={() => { onShowInfoModal(data) }}
                    />
                })}
                <AddHost />
            </Dashboard>
        )
    );
};

export default withLocalizeStrings(HostPage);