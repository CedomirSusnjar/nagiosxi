import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../languages/Localize';
import InputField from '../../components/inputs/InputField';
import PageAddHostButton from '../../components/buttons/hostButtons/PageAddHostButton';
import { addHost } from '../../application/application-service';
import { useState } from 'react';
import { useHistory } from 'react-router';
import BounceLoader from "react-spinners/BounceLoader";
import { useForm, Controller } from 'react-hook-form';
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Board = styled(Flex)`
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const Title = styled(Flex)`
    width: 100%;
    height: 6rem;
    font-size: 2.4rem;
    padding-top: 1.2rem;
    position: relative;
    padding-left: 2rem;
    margin-bottom: 0;
`;

const AddBoard = styled(Flex)`
    width: 100%;
    height: 55rem;
`;

const AddSpace = styled(Flex)`
    width: 100%;
    height: 100%;
    border: .1rem solid gainsboro;
    border-radius: 2rem;
    margin-left: 2rem;
    margin-right: 2rem;
    margin-bottom: 2rem;
    flex-direction: column;
`;

const SpinnerBlock = styled(Flex)`
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const AddMessage = styled(Flex)`
    font-size: 1.8rem;
    font-style: italic;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 6rem;
`;

const Form = styled.form`
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    `;

const validationSchema = object().shape({
    hostname: string().required().max(30),
    address: string().required().max(15),
    checkCommand: string().required().max(30),
    max_check_attempts: string().required().max(2),
    check_period: string().required().max(30),
    contacts: string().required().max(30),
    notification_interval: string().required().max(30)
});

const AddNewHost = ({ strings }) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    let [color] = useState("gainsboro");
    const [badInput, setBadInput] = useState(false);
    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const { isValid } = formState;

    const onSubmit = (host) => {//axios get params
        setBadInput(false);
        console.log('asdas');
        setLoading(true);
        const obj = `host_name=${host.hostname}`
            + `&address=${host.address}`
            + `&check_command=${host.checkCommand}`
            + `&max_check_attempts=${host.max_check_attempts}`
            + `&check_period=${host.check_period}`
            + `&contacts=${host.contacts}`
            + `&notification_interval=${host.notification_interval}`
            + `&notification_period=${host.notification_period}`
            + `&applyconfig=1`;

        (async function () {
            try {
                const res = await addHost(obj);
                console.log(res);
                setTimeout(function () { history.push("/hosts"); }, 5000);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }

    const onError = (err) => {
        console.log(err);
    }

    return (
        <Dashboard>
            <Board>
                <Title>{strings.page.addNewHost.title}</Title >
                <AddBoard>
                    <AddSpace>
                        {loading ? (
                            <SpinnerBlock>
                                <AddMessage>{strings.page.addNewHost.waitingForConfigDone}</AddMessage>
                                <BounceLoader color={color} loading={loading} size={120} />
                            </SpinnerBlock>
                        ) : (
                            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                                <Controller name="hostname" defaultValue="" control={control} render={({ field }) => (<InputField type="text" value={field.value} onChange={field.onChange} onBlur={field.onBlur} text={strings.page.addNewHost.hostname} />)} />
                                <Controller name="address" defaultValue="" control={control} render={({ field }) => (<InputField  type="text" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.address} />)} />
                                <Controller name="checkCommand" defaultValue="" control={control} render={({ field }) => (<InputField  type="text" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.checkCommand} />)} />
                                <Controller name="max_check_attempts" defaultValue="2" control={control} render={({ field }) => (<InputField type="text" value="2" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.maxCheckAttempts} />)} />
                                <Controller name="check_period" defaultValue="24x7" control={control} render={({ field }) => (<InputField value="24x7" type="combobox" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.checkPeriod} />)} />
                                <Controller name="contacts" defaultValue="" control={control} render={({ field }) => (<InputField type="text" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.contacts} />)} />
                                <Controller name="notification_interval" defaultValue="" control={control} render={({ field }) => (<InputField  type="text"onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.notificationInterval} />)} />
                                <Controller name="notification_period" defaultValue="" control={control} render={({ field }) => (<InputField type="combobox" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.notificationPeriod} />)} />
                                <Controller name="applyconfig" defaultValue="" control={control} render={({ field }) => (<InputField type="text" onChange={field.onChange} value={field.value} onBlur={field.onBlur} text={strings.page.addNewHost.applyconfig} />)} />
                                <PageAddHostButton disabled={false} htmlType="submit" />
                            </Form>
                        )}
                    </AddSpace>
                </AddBoard>
            </Board >
        </Dashboard >
    );
};

export default withLocalizeStrings(AddNewHost);