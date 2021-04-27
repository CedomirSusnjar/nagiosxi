import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButtons from '../buttons/serviceButtons/ServiceButtons';
import ServiceInformation from '../hostInformation/ServiceInformation';
import { withLocalizeStrings } from '../../languages/Localize';
import BounceLoader from "react-spinners/BounceLoader";
import { getColorByServiceStatus } from '../../application/application-service';
import { basicColor } from '../../common/config/config';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 20rem;
    width: 21rem;
    min-width: 12rem;
    margin: 1.5rem;
    box-shadow: none;
    border: .1rem solid ${basicColor};
    position: relative;  
    overflow: hidden;
    justify-content: center;
`;

const ServiceName = styled(Flex)`
    height: 2rem;
    font-size: 1.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const InfoBlock = styled(Flex)`
    flex-direction: column;
    position: absolute;
    top: 5rem;
    justify-content: center;
    width: 100%;
`;

const SpinnerBlock = styled(Flex)`
    height: 2rem;
    align-items: center;
    padding-top: .25rem;
`;

const Header = styled(Flex)`
    position: absolute;
    top: 1rem;
    flex-direction: row;
    width: 100%;
    height: 2rem;
`;

const Service = ({ data, onDelete, onShowInfo, strings }) => {

    return (
        <Container>
            <Header>
                <ServiceName>{data.service_description}</ServiceName>
                <SpinnerBlock>
                    <BounceLoader color={getColorByServiceStatus(data.output)} loading={true} size={14} style={{top: "1rem"}}/>
                </SpinnerBlock>
            </Header>
            <InfoBlock>
                <ServiceInformation text={strings.page.services.lastCheck} value={data.last_check} />
                <ServiceInformation text={strings.page.services.nextCheck} value={data.next_check} />
                <ServiceInformation text={strings.page.services.statusInfo} value={data.output} />
            </InfoBlock>
            <ServiceButtons onDelete={onDelete} onShowInfo={onShowInfo} />
        </Container>
    );
}

export default withLocalizeStrings(Service);