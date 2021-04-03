import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import BounceLoader from "react-spinners/BounceLoader";
import ServicesList from './ServicesList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import Modal from '../../components/modal/Modal';
import {withLocalizeStrings} from '../../languages/Localize';
import Service from '../../components/service/Service';


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
`;

const Services = ({strings}) => {


    let [services, setServices] = useState(null);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("gainsboro");
    let [serviceToDelete, setServiceToDelete] = useState('');
    const [showModal, setShowModal] = useState(false);

    const { id } = useParams();

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
        let servicesTemp = services.filter(e => e.service_object_id != id);
        setServices(servicesTemp);
    }


    useEffect(() => {

        console.log(id);
        axios.get("http://192.168.17.128/nagiosxi/api/v1/objects/servicestatus?apikey=oPsQN6A9cPBZICKNpvF0Zhp9DJqbEUb2hhRHWvhUCM9e7ejb2ZdCWGbB7W0ZGjmo&pretty=1")
            .then(res => {
                console.log(res.data.servicestatus);
                setServices(res.data.servicestatus);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        loading ? (
            <SpinnerBlock>
                <BounceLoader color={color} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                 <Modal
                    question={strings.modalQuestions.deleteService}
                    show={showModal}
                    confirm={deleteService}
                    decline={doNotDeleteService}
                />
                <Board>
                    <Title>{services[0].host_name + " - " + services[0].host_address}</Title >
                    {/* <ServicesList setServices={setServices} services={services}/> */}
                    {services.map(service => {
                        return <Service
                            status={service.state_type === "1" ? "Aktivan" : "Neaktivan"}
                            serviceName={service.display_name}
                            description={service.service_description}
                            onDelete={() => showDeleteModal(service.service_object_id)}
                        />
                    })}
                </Board >
            </Dashboard >
        )

    );
};

export default withLocalizeStrings(Services);