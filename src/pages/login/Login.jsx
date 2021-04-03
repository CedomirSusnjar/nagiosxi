import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import {Flex} from 'reflexbox/styled-components';
import { useHistory } from 'react-router';
import { useApplicationStateValue } from '../../application/Application';

const Form = styled(Flex)`
    flex-direction: column;
    box-shadow: 0 .5rem 3.7rem -1.2rem rgba(0,0,0,0.75);
    height: 40rem;
    width: 80rem;
    min-width: 28rem;
    align-items: center;
    margin: 10rem auto;
    position: relative;
`;

const LoginButton = styled(Flex)`
    width: 40rem;
    height: 3rem;
    border-radius: 5rem;
    border: .2rem solid gainsboro;
    position: absolute;
    bottom: 6rem;
    justify-content: center;
    cursor: pointer;
    font-size: 1.8rem;
    &: hover {
        background-color: gainsboro;
    }
`;

const Login = (props) => {

    const history = useHistory();
    const {setAuthorized} = useApplicationStateValue();
    const onClickHandler = () => {
        setAuthorized(true);
        history.push("/home");
    }

    return(
        <Dashboard>
            <Form>
                <LoginButton onClick={onClickHandler}>Prijavi se</LoginButton>
            </Form>
        </Dashboard>
    );

};

export default Login;