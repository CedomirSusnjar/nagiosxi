import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';

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
    align-items: center;
    justify-content: center;
`;

const AddButton = styled(Flex)`
    height: 40%;
    width: 45%;
    background-image: url("images/plus.png");
    background-repeat: no-repeat;
`;

const AddHost = (props) => {
    return (
        <Container>
            <AddButton/>
        </Container>
    );

};

export default AddHost;