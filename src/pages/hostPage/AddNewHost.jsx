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
import { Select } from 'antd';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { css } from '@emotion/css';
import 'react-tabs/style/react-tabs.css';
import Check from '../../components/checks/Check';
import FormBox from '../../components/form/formBox/FormBox';
import stringJSON from '../../languages/languages.json';

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

const opt = [
    {
        label: "Jack",
        value: "jack"
    }
]

const validationSchema = object().shape({
    // hostname: string().required().max(30),
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
            font-size: 1.2rem;
        }
        .react-tabs__tab--selected {
        }
    }
    border-bottom: .05rem solid gainsboro;
`;

const FormSplit = styled(Flex)`
    flex-direction: row;
`;

const addNewHostLocalize = stringJSON.sr.page.addNewHost;

const check = [{ value: "On", key: 1 }, { value: "Off", key: 2 }, { value: "Skip", key: 3 }, { value: "Null", key: 4 }];
const check1 = [{ value: "Down", key: 1 }, { value: "Up", key: 2 }, { value: "Unreachable", key: 3 }];
const check2 = [{ value: "Down", key: 1 }, { value: "Unreachable", key: 2 }, { value: "Recovery", key: 3 }, { value: "Flapping", key: 4 }, { value: "Scheduled Downtime", key: 5 }];
const check3 = [{ value: "Down", key: 1 }, { value: "Up", key: 2 }, { value: "Unreachable", key: 3 }, { value: "Notification", key: 4 }, { value: "None", key: 4 }];

const commonFields = [
    { type: "text", name: "hostname", text: addNewHostLocalize.hostname},
    { type: "text", name: "alias", text: addNewHostLocalize.alias },
    { type: "text", name: "address", text: addNewHostLocalize.address },
    { type: "text", name: "display_name", text: addNewHostLocalize.displayName },
    { type: "text", name: "check_command", text: addNewHostLocalize.checkCommand }
];

const checkSettings1 = [
    { type: "text", name: "check_interval", text: addNewHostLocalize.checkInterval },
    { type: "text", name: "retry_interval", text: addNewHostLocalize.retryInterval },
    { type: "text", name: "max_check_attempts", text: addNewHostLocalize.maxCheckAttempts },
    { type: "check", name: "active_checks_enabled", checks: check, text: addNewHostLocalize.activeChecksEnabled },
    { type: "check", name: "passive_checks_enabled", checks: check, text: addNewHostLocalize.passiveChecksEnabled},
    { type: "text", name: "check_period", text: addNewHostLocalize.checkPeriod },
    { type: "text", name: "freshness_threshold", text: addNewHostLocalize.freshnessThreshold },
    { type: "check", name: "check_freshness", checks: check, text: addNewHostLocalize.checkFreshness },
];


const checkSettings2 = [
    { type: "text", name: "eventHandler", text: addNewHostLocalize.eventHandler },
    { type: "check", name: "event_handler_enabled", checks: check, text: addNewHostLocalize.eventHandlerEnabled },
    { type: "text", name: "low_flap_threshold", text: addNewHostLocalize.lowFlapThreshold },
    { type: "text", name: "high_flap_threshold", checks: check, text: addNewHostLocalize.highFlapThreshold },
    { type: "check", name: "flap_detection_enabled", checks: check, text: addNewHostLocalize.flapDetectionEnabled },
    { type: "check", name: "flap_detection_options", checks: check1, text: addNewHostLocalize.flapDetectionOptions },
    { type: "check", name: "retain_status_information", checks: check, text: addNewHostLocalize.retainStatusInformation },
    { type: "check", name: "retain_non_status_information", checks: check, text: addNewHostLocalize.retainNoStatusInformation },
    { type: "check", name: "process_perf_data", checks: check, text: addNewHostLocalize.processPerfData },
];

const alertFields = [
    { type: "text", name: "notification_period", text: addNewHostLocalize.notificationPeriod },
    { type: "check", name: "notification_options", checks: check2, text: addNewHostLocalize.notificationOptions },
    { type: "text", name: "notification_interval", text: addNewHostLocalize.notificationInterval },
    { type: "text", name: "first_notification_delay", text: addNewHostLocalize.firstNotificationDelay },
    { type: "check", name: "notification_enabled", checks: check, text: addNewHostLocalize.notificationEnabled },
    { type: "check", name: "stalking_options", checks: check1, text: addNewHostLocalize.stalkingOptions }
];

const miscSettings1 = [
    { type: "text", name: "notes", text: addNewHostLocalize.notes },
    { type: "text", name: "VRMLimage", text: addNewHostLocalize.VRMLimage },
    { type: "text", name: "notes_url", text: addNewHostLocalize.notesURL },
    { type: "text", name: "status_image", text: addNewHostLocalize.statusImage },
    { type: "text", name: "action_url", text: addNewHostLocalize.actionURL },
    { type: "text", name: "icon_image", text: addNewHostLocalize.iconImage },
    { type: "text", name: "icon_image_alt_text", text: addNewHostLocalize.iconImageAltText }
];

const miscSettings2 = [
    { type: "text", name: "2Dcoords", text: addNewHostLocalize._2Dcoords },
    { type: "text", name: "3Dcoords", text: addNewHostLocalize._3Dcoords},
    { type: "text", name: "generic_name", text: addNewHostLocalize.genericName }
];

const AddNewHost = ({ strings }) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    let [color] = useState("gainsboro");
    const [badInput, setBadInput] = useState(false);
    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });


    const [tabIndex, setTabIndex] = useState(0);

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
                                            <FormBox control={control} fields={checkSettings1} />
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