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

const SpinnerBlock = styled(Flex)`
    position: absolute;
    top: 40%;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Hosts = ({ strings }) => {

    const [hosts, setHosts] = useState(null);
    const [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gainsboro");
    const [showModal, setShowModal] = useState(false);
    let [hostnameToDelete, setHostnameToDelete] = useState('');

    const showDeleteModal = (hostname) => {
        setHostnameToDelete(hostname);
        setShowModal(true);
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
        getAllHosts().
            then(res => {
                console.log(res.data.hoststatus);
                setHosts(res.data.hoststatus);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    return (
        loading ? (
            <SpinnerBlock>
                <BounceLoader color={color} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                <Modal
                    question={strings.modalQuestions.deleteHost}
                    show={showModal}
                    confirm={deleteHost}
                    decline={doNotDeleteHost}
                />
                {hosts.map(data => {
                    return <Host
                        key={data.host_object_id}
                        data={data}
                        onDeleteHandler={() => { showDeleteModal(data.host_name) }}
                    />
                })}
                <AddHost />
            </Dashboard>
        )
    );
};

export default withLocalizeStrings(Hosts);