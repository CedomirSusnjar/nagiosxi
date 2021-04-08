import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import BounceLoader from "react-spinners/BounceLoader";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import Modal from '../../components/modal/Modal';
import { withLocalizeStrings } from '../../languages/Localize';
import Service from '../../components/service/Service';
import { getHostServices } from '../../application/application-service';


const Title = styled(Flex)`
    width: 100%;
    height: 6rem;
    font-size: 2.4rem;
    padding-top: 1.2rem;
    position: relative;
    padding-left: 2rem;
    margin-bottom: 0;
`;

const SpinnerBlock = styled(Flex)`
    position: absolute;
    top: 40rem;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const Board = styled(Flex)`
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    position: relative;
`;

const Message = styled(Flex)`
    margin-left: 2rem;
    position: absolute;
    top: 6rem;
    font-size: 1.8rem;
    border: .05rem solid gainsboro;
    border-radius: 1rem;
    height: 4rem;
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: center;
`;

const Services = ({ strings }) => {


    let [services, setServices] = useState(null);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gainsboro");
    let [serviceToDelete, setServiceToDelete] = useState('');
    let [servicesExist, setServicesExist] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const { hostname } = useParams();

    const showDeleteModal = (service) => {
        setServiceToDelete(service);
        setShowModal(true);
    }

    const deleteService = () => {
        onDeleteHandler(serviceToDelete);
    }

    const doNotDeleteService = () => {
        setShowModal(false);
    }

    const onDeleteHandler = (service) => {
        // removeHost(hostName).then(res => {
        //     console.log(res);
        //     setHosts(hosts.filter(host => host.host_name !== hostName));
        //     setShowModal(false);
        // });
        removeService(service);
        setShowModal(false);
        console.log(service);
    }

    const removeService = (id) => {
        let servicesTemp = services.filter(e => e.service_object_id !== id);
        setServices(servicesTemp);
    }

    useEffect(() => {

        (async function () {
            try {
                const res = await getHostServices(hostname);
                console.log(res.data);
                setServices(res.data.servicestatus);
                if (res.data.servicestatus.length !== 0) {
                    setServicesExist(true);
                }
                setLoading(false);
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
                <Modal question={strings.modalQuestions.deleteService} show={showModal} confirm={deleteService} decline={doNotDeleteService} />
                <Board>
                    <Title>{hostname + (servicesExist ? ' - ' + services[0].host_address : "")}</Title>
                    {servicesExist ? (services.map(service => {
                        return <Service key={service.service_object_id} data={service} onDelete={() => showDeleteModal(service.service_object_id)} />
                    })) : (
                        <Message>{strings.page.services.noServices}</Message>
                    )}
                </Board >
            </Dashboard >
        )

    );
};

export default withLocalizeStrings(Services);