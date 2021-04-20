import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';
import { useHistory } from 'react-router';
import plus from '../../assets/plus.png';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 20rem;
    width: 20rem;
    margin: 1.5rem;
    cursor: pointer;
    border: .05rem solid gainsboro;
    box-shadow: none;
    &: hover {
        box-shadow: 0 .5rem 2.2rem -1.2rem rgba(0,0,0,0.75);
    }
    align-items: center;
    justify-content: center;
`;

const AddButton = styled(Flex)`
    height: 6.4rem;
    width: 6.4rem;
    background-image: url(${plus});
    align-items: center;
    justify-content: center;
`;

const AddService = ({hostname}) => {
   
    const history = useHistory();

    const onClickHandler = () => { history.push(`/${hostname}/services/add`);}
    
    return (
        <Container onClick={onClickHandler}>
            <AddButton />
        </Container>
    );
};

export default AddService;