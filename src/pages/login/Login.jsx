import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import { useHistory } from 'react-router';
import { useApplicationStateValue } from '../../application/Application';
import { withLocalizeStrings } from '../../languages/Localize';
import { useForm, Controller } from 'react-hook-form';
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from '../../components/inputs/InputField';
import {Select } from 'antd';

const Form = styled(Flex)`
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

const LoginButton = styled(Flex)`
    width: 48rem;
    height: 3rem;
    border-radius: 5rem;
    border: .1rem solid gainsboro;
    position: absolute;
    bottom: 6rem;
    justify-content: center;
    cursor: pointer;
    font-size: 1.8rem;
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

const SelectS = styled(Select)`

    &.ant-select { 
        width: 28rem;
        border: .05rem solid gainsboro;
        border-radius: 1rem;
        display: flex;
        flex-direction: row;
        height: 3.5rem;
        .ant-select-selector {
            width: 90%;
            .ant-select-selection-search {
                position: relative;
                .ant-select-selection-search-input {
                    width: 24rem;
                    height: 2.5rem;
                    outline: none;
                    border: none;
                    position: absolute;
                    top: .5rem;
                    left: .5rem;
                }
        }
    }
    .ant-select-arrow {
        width: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
   
`;

const Login = ({ strings }) => {

    const history = useHistory();
    const { setAuthorized } = useApplicationStateValue();
    const onClickHandler = () => {
        setAuthorized(true);
        history.push("/home");
    }


    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const opt = [
        {
            label: "Jack",
            value: "jack"
        },
        {
            label: "afaf",
            value: "afaf"
        },
        {
            label: "sss",
            value: "sss"
        },
        {
            label: "24x7",
            value: "24x7"
        },
    ]

    return (
        <div>
            <Container>
                <Form>
                    <Controller name="username" defaultValue="" control={control} render={({ field }) => (<InputField type="text" value={field.value} onChange={field.onChange} onBlur={field.onBlur} text={strings.page.login.username} />)} />
                    <Controller name="password" defaultValue="" control={control} render={({ field }) => (<InputField type="text" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.login.password} />)} />
                    <LoginButton onClick={onClickHandler}>Prijavi se</LoginButton>
                </Form>
            </Container>
        </div>

    );

};

export default withLocalizeStrings(Login);