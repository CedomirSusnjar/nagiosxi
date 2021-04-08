import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../languages/Localize';
import Input from '../../components/inputs/Input';
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
    hostname: string().required().max(10)
});

const AddNewHost = ({ strings }) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    let [color] = useState("gainsboro");
    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const waitForNagiosConfigDone = () => {
        return new Promise(setTimeout(function () { history.push("/hosts"); }, 5000));
    }

    const { isValid } = formState;

    const onSubmit = (host) => {//axios get params
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
                setTimeout(function () { history.push("/hosts"); }, 5000)
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
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
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Controller name="hostname" defaultValue="TestHost" control={control} render={() => (<Input text={strings.page.addNewHost.hostname} />)} />
                                <Controller name="address" defaultValue="192.168.17.129" control={control} render={() => (<Input text={strings.page.addNewHost.address} />)} />
                                <Controller name="checkCommand" defaultValue="check-host-alive" control={control} render={() => (<Input text={strings.page.addNewHost.checkCommand} />)} />
                                <Controller name="max_check_attempts" defaultValue="2" control={control} render={() => (<Input text={strings.page.addNewHost.max_check_attempts} />)} />
                                <Controller name="check_period" defaultValue="24x7" control={control} render={() => (<Input text={strings.page.addNewHost.check_period} />)} />
                                <Controller name="contacts" defaultValue="nagiosadmin" control={control} render={() => (<Input text={strings.page.addNewHost.contacts} />)} />
                                <Controller name="notification_interval" defaultValue="1" control={control} render={() => (<Input text={strings.page.addNewHost.notification_interval} />)} />
                                <Controller name="notification_period" defaultValue="24x7" control={control} render={() => (<Input text={strings.page.addNewHost.notification_period} />)} />
                                <Controller name="applyconfig" defaultValue="1" control={control} render={() => (<Input text={strings.page.addNewHost.applyconfig} />)} />
                                <PageAddHostButton htmlType="submit" />
                            </Form>
                        )}

                    </AddSpace>
                </AddBoard>
            </Board >
        </Dashboard >
    );
};

export default withLocalizeStrings(AddNewHost);