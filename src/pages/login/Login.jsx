import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import {Flex} from 'reflexbox/styled-components';
import { useHistory } from 'react-router';
import { useApplicationStateValue } from '../../application/Application';

const Form = styled(Flex)`
    flex-direction: column;
    box-shadow: 0px 5px 37px -12px rgba(0,0,0,0.75);
    height: 50%;
    width: 40%;
    min-width: 280px;
    align-items: center;
    margin: 100px auto;
    position: relative;
`;

const LoginButton = styled(Flex)`
    width: 60%;
    height: 30px;
    border-radius: 50px;
    border: 2px solid gainsboro;
    position: absolute;
    bottom: 60px;
    justify-content: center;
    cursor: pointer;
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