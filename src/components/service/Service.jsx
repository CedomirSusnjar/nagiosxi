import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import ServiceButtons from '../buttons/serviceButtons/ServiceButtons';
import ServiceInformation from '../hostInformation/ServiceInformation';
import { withLocalizeStrings } from '../../languages/Localize';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 20rem;
    width: 15rem;
    min-width: 12rem;
    margin: 1.5rem;
    box-shadow: none;
    border: .1rem solid gainsboro;
    position: relative;  
    overflow: hidden;
    justify-content: center;
`;

const ServiceName = styled(Flex)`
    height: 2rem;
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
    position: absolute;
    top: .5rem;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const Description = styled(Flex)`
    position: absolute;
    top: 3rem;
    height: 6rem;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const Status = styled(Flex)`
    justify-content: center;
    align-items: center;
    color: ${props => props.color};
    font-weight: bold;
    height: 2.5rem;
    font-size: 1.4rem;
`;

const InfoBlock = styled(Flex)`
    flex-direction: column;
    position: absolute;
    top: 9.5rem;
    justify-content: center;
    width: 100%;
`;

const Service = ({ data, onDelete, onShowInfo, strings }) => {

    return (
        <Container>
            <ServiceName>{data.service_description}</ServiceName>
            <Description>{data.output}</Description>
            <InfoBlock>
                <ServiceInformation text={strings.page.services.lastCheck} value={data.last_check} />
                <ServiceInformation text={strings.page.services.nextCheck} value={data.next_check} />
            </InfoBlock> 
            <ServiceButtons onDelete={onDelete} onShowInfo={onShowInfo} />
        </Container>
    );
}

export default withLocalizeStrings(Service);