import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Signals from '../signal/Signals';
import { useHistory } from 'react-router';

const Container = styled(Flex)`
    border-radius: 20px;
    flex-direction: column;
    height: 45%;
    min-width: 20%;
    margin: 20px;
    cursor: pointer;
    box-shadow: 0px 5px 37px -12px rgba(0,0,0,0.75);
    &: hover {
        box-shadow: none;
        border: .5px solid gainsboro;
    }
`;

console.log('Host');


const Host = (props) => {

    const history = useHistory();

    const onClickHandler = () => {
        history.push("/service");
    }


    return (
        <Container onClick={onClickHandler}>
            <div style={{'height': '80%'}}></div>
            <Signals/>
        </Container>
    );
}

export default Host;