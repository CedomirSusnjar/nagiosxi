import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { useEffect, useState } from 'react';
import { getAllServices } from '../../application/application-service';
import BounceLoader from "react-spinners/BounceLoader";
import { withLocalizeStrings } from '../../languages/Localize';
import Title from '../../components/title/Title';
import { basicColor, spinnerColor } from '../../common/config/config';

const ServiceContainer = styled(Flex)`
    flex-direction: row;
    width: 95%;
    height: 3.5rem;
    margin-left: 2rem;
    font-size: 1.4rem;
    border-top: .05rem solid ${basicColor};
    border-left: .05rem solid ${basicColor};
    border-right: .05rem solid ${basicColor};
    :last-child {
        border-bottom: .05rem solid ${basicColor};
    }
    :first-child {
        background-color: ${basicColor};
        font-weight: bold;
    }
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
    position: absolute;
    top: 7rem;
    flex-direction: column;
    width: 100%;
    flex-wrap: wrap;
`;

const OutputData = styled(Flex)`
    width: 40%;
    font-size: 1.1rem;
    padding-left: .2rem;
    align-items: center;
`;

const OutputDataProp = styled(Flex)`
    width: 40%;
    font-size: 1.1rem;
    padding-left: .2rem;
    align-items: center;
    font-size: 1.4rem;
`;

const ServiceData = styled(Flex)`
    width: 15%;
    padding-left: .2rem;
    border-right: .05rem solid ${basicColor};
    align-items: center;
`;

const AllServices = ({ strings }) => {

    let [services, setServices] = useState(null);
    let [loading, setLoading] = useState(true);

    useEffect(() => {

        (async function () {
            try {
                const res = await getAllServices();
                setServices(res.data.servicestatus);
                setTimeout(function () { setLoading(false); }, 1000);
            } catch (err) {
                console.error(err);
            }
        })();

    }, []);

    return (
        loading ? (
            <SpinnerBlock>
                <BounceLoader color={spinnerColor} loading={loading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                <Title text={strings.page.services.allServices} />
                <Board>
                    <ServiceContainer>
                        <ServiceData>{strings.page.services.hostName}</ServiceData>
                        <ServiceData>{strings.page.services.serviceName}</ServiceData>
                        <ServiceData>{strings.page.services.lastCheck}</ServiceData>
                        <ServiceData>{strings.page.services.nextCheck}</ServiceData>
                        <OutputDataProp>{strings.page.services.output}</OutputDataProp>
                    </ServiceContainer>
                    {services.map(service => {
                        return <ServiceContainer key={service.service_object_id}>
                            <ServiceData>{service.host_name}</ServiceData>
                            <ServiceData>{service.display_name}</ServiceData>
                            <ServiceData>{service.last_check}</ServiceData>
                            <ServiceData>{service.next_check}</ServiceData>
                            <OutputData>{service.output}</OutputData>
                        </ServiceContainer>;
                    })
                    }
                </Board>
            </Dashboard >
        )
    );
};

export default withLocalizeStrings(AllServices);