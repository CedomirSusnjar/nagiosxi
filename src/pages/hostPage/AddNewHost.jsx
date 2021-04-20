import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../languages/Localize';
import PageAddHostButton from '../../components/buttons/hostButtons/PageAddHostButton';
import { addHost } from '../../application/application-service';
import { useState } from 'react';
import { useHistory } from 'react-router';
import BounceLoader from "react-spinners/BounceLoader";
import { useForm } from 'react-hook-form';
import { object } from "yup";
import { string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { css } from '@emotion/css';
import 'react-tabs/style/react-tabs.css';
import FormBox from '../../components/form/formBox/FormBox';
import { commonFields, checkSettings1, checkSettings2, alertFields, miscSettings1, miscSettings2 } from '../../common/config/nagios-field-names';

const Board = styled(Flex)`
    width: 100%;
    height: 100%;
    flex-direction: column;
`;

const Title = styled(Flex)`
    width: 100%;
    height: 6rem;
    font-size: 2.2rem;
    padding-top: 1.2rem;
    position: relative;
    padding-left: 2rem;
    margin-bottom: 0;
`;

const AddBoard = styled(Flex)`
    width: 100%;
    height: 60rem;
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
    justify-content: flex-start;
    flex-direction: column;
`;

const validationSchema = object().shape({
    //host_name: string().required().max(5)
    // address: string().required().max(15),
    // checkCommand: string().required().max(30),
    // max_check_attempts: string().required().max(2),
    // check_period: string().required().max(30),
    // contacts: string().required().max(30),
    // notification_interval: string().required().max(30)
});

const TabCSS = css`
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    margin-bottom: 2.5rem;
    margin-top: 1rem;
    .react-tabs__tab-list {
        .react-tabs__tab {
            bottom: -.1rem;
            font-size: 1.3rem;
        }
        .react-tabs__tab--selected {
        }
    }
    border-bottom: .05rem solid gainsboro;
`;

const FormSplit = styled(Flex)`
    flex-direction: row;
`;

const AddNewHost = ({ strings }) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    let [color] = useState("gainsboro");
    //const [badInput, setBadInput] = useState(false);
    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const manageCheckClick = () => {
        console.log('click');
    }

    const [tabIndex, setTabIndex] = useState(0);

    const { isValid } = formState;

    const onSubmit = (host) => {//axios get params
       // console.log(host);
        //setBadInput(false);
        setLoading(true);
        const obj = `host_name=${host.host_name}`
            + `&address=${host.address}`
            + `&check_command=${host.check_command}`
            + `&check_interval=${host.normal_check_interval}`
            + `&retry_interval=${host.retry_check_interval}`
            + `&max_check_attempts=${host.max_check_attempts}`
            + `&check_period=${host.check_period}`
            + `&freshness_threshold=${host.freshness_threshold}`
            + `&event_handler=${host.event_handler}`
            + `&low_flap_threshold=${host.low_flap_threshold}`
            + `&high_flap_threshold=${host.high_flap_threshold}`
            + `&contacts=nagiosadmin`
            + `&notification_interval=${host.notification_interval}`
            + `&notification_period=${host.notification_period}`
            + `&active_checks_enabled=${host.active_checks_enabled}`
            + `&passive_checks_enabled=${host.passive_checks_enabled}`
            + `&applyconfig=1`;

        const objj = 
            `host_name=Malina`
            + `&host_alias=Malina`
            + `&address=192.168.17.129`
            + `&display_name=Malina`
            + `&check_interval=4`
            + `&retry_interval=2`
            + `&check_command=check-host-alive!!!!!!!!`
            + `&max_check_attempts=5`
            + `&check_period=24x7`
            + `&contacts=nagiosadmin`
            + `&notification_interval=2`
            + `&notification_period=24x7`
            + `&flap_detection_enabled=2`
            + `&freshness_threshold=20`
            //+ `&active_checks_enabled=2`
            // + `&passive_checks_enabled=${host.passive_checks_enabled}`
            + `&applyconfig=1`;

            console.log(obj);

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
                                <Tabs className={TabCSS} selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                                    <TabList>
                                        <Tab>{strings.page.addNewHost.commonSettings}</Tab>
                                        <Tab>{strings.page.addNewHost.checkSettings}</Tab>
                                        <Tab>{strings.page.addNewHost.alertSettings}</Tab>
                                        <Tab>{strings.page.addNewHost.miscSettings}</Tab>
                                    </TabList>

                                    <TabPanel>
                                        <FormBox control={control} fields={commonFields} />
                                    </TabPanel>
                                    <TabPanel>
                                        <FormSplit>
                                            <FormBox manageCheck={manageCheckClick} control={control} fields={checkSettings1} />
                                            <FormBox control={control} fields={checkSettings2} />
                                        </FormSplit>
                                    </TabPanel>
                                    <TabPanel>
                                        <FormBox control={control} fields={alertFields} />
                                    </TabPanel>
                                    <TabPanel>
                                        <FormSplit>
                                            <FormBox control={control} fields={miscSettings1} />
                                            <FormBox control={control} fields={miscSettings2} />
                                        </FormSplit>
                                    </TabPanel>
                                </Tabs>
                                <PageAddHostButton disabled={false} htmlType="submit"/>
                            </Form>
                        )}
                    </AddSpace>
                </AddBoard>
            </Board >
        </Dashboard >
    );
};

export default withLocalizeStrings(AddNewHost);