import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { useHistory } from 'react-router';
import { useApplicationStateValue } from '../../application/Application';
import { withLocalizeStrings } from '../../languages/Localize';
import { useForm, Controller } from 'react-hook-form';
import { object } from "yup";
//import { string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from '../../components/inputs/InputField';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    box-shadow: 0 .5rem 3.7rem -1.2rem rgba(0,0,0,0.75);
    height: 40rem;
    width: 80rem;
    min-width: 28rem;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 5rem;
`;

const Container = styled(Dashboard)`
    justify-content: center;
    align-items: center;
`;

const LoginButton = styled.button`
    width: 48rem;
    height: 3rem;
    border-radius: 5rem;
    border: .1rem solid gainsboro;
    position: absolute;
    bottom: 6rem;
    justify-content: center;
    cursor: pointer;
    font-size: 1.8rem;
    outline: none;
    background-color: white;
    &: hover {
        box-shadow: 0px 6px 11px -6px rgba(0,0,0,0.75);
    }
`;

const validationSchema = object().shape({
    // hostname: string().required().max(30),
    // address: string().required().max(15),
    // checkCommand: string().required().max(30),
    // max_check_attempts: string().required().max(2),
    // check_period: string().required().max(30),
    // contacts: string().required().max(30),
    // notification_interval: string().required().max(30)
});

const Login = ({ strings }) => {

    const history = useHistory();
    const { setAuthorized } = useApplicationStateValue();

    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const { isValid } = formState;

    const onSubmit = () => {
        setAuthorized(true);
        history.push("/home");
    }

    const onError = (err) => {
        console.err(err);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <Controller name="username" defaultValue="" control={control} render={({ field }) => (<InputField type="text" value={field.value} onChange={field.onChange} onBlur={field.onBlur} text={strings.page.login.username} />)} />
                <Controller name="password" defaultValue="" control={control} render={({ field }) => (<InputField type="text" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.login.password} />)} />
                <LoginButton disabled={!isValid} htmlType="submit">Prijavi se</LoginButton>
            </Form>
        </Container>
    );

};

export default withLocalizeStrings(Login);