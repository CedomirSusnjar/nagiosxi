import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import BounceLoader from "react-spinners/BounceLoader";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Modal from '../../components/modal/Modal';
import { withLocalizeStrings } from '../../languages/Localize';
import Service from '../../components/service/Service';
import { getHostServices, removeService } from '../../application/application-service';
import AddService from '../../components/service/AddService';
import InfoModal from '../../components/modal/InfoModal';

const Title = styled(Flex)`
    width: 100%;
    height: 6rem;
    font-size: 2.4rem;
    padding-top: 1.2rem;
    position: relative;
    padding-left: 2rem;
`;

const SpinnerBlock = styled(Flex)`
    position: absolute;
    justify-content: center;
    width: 100%;
    height: 12rem;
    top: 40%;
    margin: 0 auto;
`;

const Board = styled(Flex)`
    width: 100%;
    position: absolute;
    top: 4rem;
    flex-direction: column;
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

const BackButton = styled(Flex)`
    width: 5rem;
    background-color: red;
`;

const Header = styled(Flex)`
    flex-direction: row;
    width: 100%;
    height: 6rem;
`;

const ServiceDashboard = styled(Flex)`
    flex-wrap: wrap;
    position: absolute;
    top: 6rem;
    padding-bottom: 3rem;
`;

let serviceData = null;

const Services = ({ strings }) => {

    let [services, setServices] = useState(null);
    let [loading, setLoading] = useState(true);
    let [color] = useState("gainsboro");
    let [serviceToDelete, setServiceToDelete] = useState('');
    let [servicesExist, setServicesExist] = useState(false);
    const [showModal, setShowModal] = useState(false);
    let [showInfoModal, setShowInfoModal] = useState(false);

    const { hostname } = useParams();

    const showDeleteModal = (service) => {
        setServiceToDelete(service);
        setShowModal(true);
    }

    const deleteService = () => { onDeleteHandler(serviceToDelete); }

    const doNotDeleteService = () => { setShowModal(false); }

    const onShowInfoModal = (data) => {
        serviceData = { ...data };
        setShowInfoModal(true);
    }

    const closeInfoModal = () => { setShowInfoModal(false); }

    const onDeleteHandler = (service) => {

        (async function () {
            try {
                const response = await removeService(service, hostname);
                console.log(response);
                let servicesTemp = services.filter(e => e.service_description !== service);
                setServices(servicesTemp);
                setShowModal(false);
                console.log(service);
            } catch (err) {
                console.error(err);
            }
        })();
    }

    useEffect(() => {

        (async function () {
            try {
                setServicesExist(false);
                const res = await getHostServices(hostname);
                console.log(res.data);
                setServices(res.data.servicestatus);
                if (res.data.servicestatus.length !== 0) { setServicesExist(true); }
                setTimeout(function () { setLoading(false); }, 1000);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }, [hostname]);

    return (

        loading ? (
            <SpinnerBlock>
                <BounceLoader color={color} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Board>
                <Header>
                    {/* <BackButton /> */}
                    <Title>{strings.page.services.title + hostname}</Title>
                </Header>
                <ServiceDashboard>
                    <Modal question={strings.modalQuestions.deleteService} show={showModal} confirm={deleteService} decline={doNotDeleteService} />
                    {showInfoModal && <InfoModal show={showInfoModal} decline={closeInfoModal} data={serviceData} />}
                    {servicesExist ?
                        (services.map(service => {
                            return <Service
                                key={service.service_object_id}
                                data={service}
                                onDelete={() => showDeleteModal(service.service_description)}
                                onShowInfo={() => { onShowInfoModal(service) }}
                            />
                        })) :
                        (<Message>{strings.page.services.noServices}</Message>)}
                    <AddService hostname={hostname} />
                </ServiceDashboard >
            </Board>
        )

    );
};

export default withLocalizeStrings(Services);