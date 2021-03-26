import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';

const Container = styled(Flex)`
    border-radius: 20px;
    flex-direction: column;
    height: 45%;
    min-width: 20%;
    margin: 20px;
    cursor: pointer;
    border: .5px solid gainsboro;
    box-shadow: none;
    &: hover {
        box-shadow: 0px 5px 37px -12px rgba(0,0,0,0.75);
    }
    align-items: center;
    justify-content: center;
`;

const AddButton = styled(Flex)`
    height: 64px;
    width: 64px;
    background-image: url("images/plus.png");
    background-repeat: no-repeat;
    align-items: center;
    justify-content: center;
`;

const AddHost = (props) => {
    return (
        <Container>
            <AddButton/>
        </Container>
    );

};

export default AddHost;