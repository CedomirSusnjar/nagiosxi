import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { useHistory } from 'react-router';
import { useApplicationStateValue } from '../../application/Application';
import { withLocalizeStrings } from '../../languages/Localize';
import { useForm, Controller } from 'react-hook-form';
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from '../../components/inputs/InputField';
import { login } from '../../application/application-service';
import { Flex } from 'reflexbox/styled-components';
import { useState } from 'react';

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
    font-size: 1.6rem;
    outline: none;
    background-color: white;
    :disabled {
        background-color: silver;
        color: gray;
    }
    &: hover {
        box-shadow: 0px 6px 11px -6px rgba(0,0,0,0.75);
    }
    &: hover:disabled {
        cursor: no-drop;
        box-shadow: none;
    }
`;

const ErrorMessage = styled(Flex)`
    font-size: 1.4rem;
    color: red;
    height: 3rem;
    position: absolute;
    bottom: 1rem;
`;

const validationSchema = object().shape({
    username: string().required(),
    password: string().required(),
});

const Login = ({ strings }) => {

    const history = useHistory();
    const { setAuthorized, setUsername } = useApplicationStateValue();
    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    let [invalidMessageHidden, setInvalidMessageHidden] = useState(true);

    const { isValid } = formState;

    const onSubmit = (user) => {
        
        const userCredentials = `username=${user.username}&password=${user.password}`;
        (async function () {
            try {
                const res = await login(userCredentials);
                if (res.data.error === 1) {
                    setInvalidMessageHidden(false);
                    throw new Error("Invalid login!");
                } else {
                    setInvalidMessageHidden(true);
                    setAuthorized(true);
                    setUsername(res.data.username);
                    history.push('/home');
                }
            } catch (err) {
                console.error(err);
            }
        })();

    }

    const onError = (err) => { console.err(err);}

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                <Controller name="username" defaultValue="" control={control} render={({ field }) => (<InputField type="text" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.login.username} />)} />
                <Controller name="password" defaultValue="" control={control} render={({ field }) => (<InputField type="text" password="password" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.login.password} />)} />
                <ErrorMessage hidden={invalidMessageHidden}>{strings.page.login.invalidLoginMessage}</ErrorMessage>
                <LoginButton disabled={!isValid} htmlType="submit">{strings.page.login.signIn}</LoginButton>
            </Form>
        </Container>
    );

};

export default withLocalizeStrings(Login);