import styled from 'styled-components';
import {Flex} from 'reflexbox/styled-components';
import { useHistory } from 'react-router';
import plus from '../../assets/plus.png';
import { basicColor } from '../../common/config/config';

const Container = styled(Flex)`
    border-radius: 2rem;
    flex-direction: column;
    height: 30rem;
    min-width: 30rem;
    margin: 2rem;
    cursor: pointer;
    border: .2rem solid ${basicColor};
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

const AddHost = () => {
    const history = useHistory();

    const onClickHandler = () => { history.push("/hosts/add");}
    
    return (
        <Container onClick={onClickHandler}>
            <AddButton />
        </Container>
    );
};

export default AddHost;