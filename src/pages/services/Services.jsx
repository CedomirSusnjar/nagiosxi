import styled from 'styled-components';
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
import ErrorModal from '../../components/modal/ErrorModal';

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
    const [showModal, setShowModal] = useState(false);
    let [showInfoModal, setShowInfoModal] = useState(false);
    let [showErrorModal, setShowErrorModal] = useState(false);

    const { hostname } = useParams();

    const showDeleteModal = (service) => {
        setServiceToDelete(service);
        setShowModal(true);
    }

    const closeErrorModal = () => { setShowErrorModal(false);}

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
                const res = await removeService(service, hostname);
                if(res.data.error === "Authenticiation failed."){
                    setShowErrorModal(true);
                    setShowModal(false);
                    throw Error("Auth failed.");
                }
                let servicesTemp = services.filter(e => e.service_description !== service);
                setServices(servicesTemp);
                setShowModal(false);
            } catch (err) {
                console.error(err);
            }
        })();
    }

    useEffect(() => {

        (async function () {
            try {
                const res = await getHostServices(hostname);
                setServices(res.data.servicestatus);
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
                    <Title>{hostname + ' - ' + strings.page.services.servicesLabel}</Title>
                </Header>
                <ServiceDashboard>
                    <Modal question={strings.modalQuestions.deleteService} show={showModal} confirm={deleteService} decline={doNotDeleteService} />
                    {showInfoModal && <InfoModal show={showInfoModal} decline={closeInfoModal} data={serviceData} />}
                    {showErrorModal && <ErrorModal closeInfoModal={closeInfoModal} show={showErrorModal} text={strings.page.hosts.permissionDenied} decline={closeErrorModal} />}
                    {services.map(service => {
                        return <Service
                            key={service.service_object_id}
                            data={service}
                            onDelete={() => showDeleteModal(service.service_description)}
                            onShowInfo={() => { onShowInfoModal(service) }}
                        />
                    })}
                    <AddService hostname={hostname} />
                </ServiceDashboard >
            </Board>
        )

    );
};

export default withLocalizeStrings(Services);