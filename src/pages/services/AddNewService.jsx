import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../languages/Localize';
import InputField from '../../components/inputs/InputField';
import PageAddHostButton from '../../components/buttons/hostButtons/PageAddHostButton';
import { addHost, addService } from '../../application/application-service';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import BounceLoader from "react-spinners/BounceLoader";
import { useForm, Controller } from 'react-hook-form';
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { css } from '@emotion/css';
import FormBox from '../../components/form/formBox/FormBox';
import stringJSON from '../../languages/languages.json';

const check = [{ value: "On", key: 1 }, { value: "Off", key: 2 }, { value: "Skip", key: 3 }, { value: "Null", key: 4 }];
const check1 = [{ value: "Down", key: 1 }, { value: "Up", key: 2 }, { value: "Unreachable", key: 3 }];
const check2 = [{ value: "Down", key: 1 }, { value: "Unreachable", key: 2 }, { value: "Recovery", key: 3 }, { value: "Flapping", key: 4 }, { value: "Scheduled Downtime", key: 5 }];
const check3 = [{ value: "Down", key: 1 }, { value: "Up", key: 2 }, { value: "Unreachable", key: 3 }, { value: "Notification", key: 4 }, { value: "None", key: 5 }];
const check4 = [{ value: "Critical", key: 1 }, { value: "Warning", key: 2 }, { value: "Ok", key: 3 }, { value: "Unknown", key: 4 }];
const check5 = [{ value: "Warning", key: 1 }, { value: "Critical", key: 2 }, { value: "Unknown", key: 3 }, { value: "Recovery", key: 4 }, { value: "Flapping", key: 5 }, { value: "Scheduled Downtime", key: 6 }];
const check6 = [{ value: "Warning", key: 1 }, { value: "Critical", key: 2 }, { value: "Ok", key: 3 }, { value: "Unknown", key: 4 }, { value: "Notification", key: 5 }, { value: "None", key: 6 }];

const addNewServiceLocalize = stringJSON.sr.page.addNewService;

const commonFields = [
    { type: "text", name: "config_name", text: addNewServiceLocalize.configName},
    { type: "text", name: "service_description", text: addNewServiceLocalize.serviceDescription },
    { type: "text", name: "display_name", text: addNewServiceLocalize.displayName },
    { type: "text", name: "check_command", text: addNewServiceLocalize.checkCommand }
];

const checkSettings1 = [
    { type: "text", name: "check_interval", text: addNewServiceLocalize.checkInterval },
    { type: "text", name: "retry_interval", text: addNewServiceLocalize.retryInterval },
    { type: "text", name: "max_check_attempts", text: addNewServiceLocalize.maxCheckAttempts },
    { type: "check", name: "active_checks_enabled", checks: check, text: addNewServiceLocalize.activeChecksEnabled },
    { type: "check", name: "passive_checks_enabled", checks: check, text: addNewServiceLocalize.passiveChecksEnabled},
    { type: "text", name: "check_period", text: addNewServiceLocalize.checkPeriod },
    { type: "text", name: "freshness_threshold", text: addNewServiceLocalize.freshnessThreshold },
    { type: "check", name: "check_freshness", checks: check, text: addNewServiceLocalize.checkFreshness },
];


const checkSettings2 = [
    { type: "text", name: "eventHandler", text: addNewServiceLocalize.eventHandler },
    { type: "check", name: "event_handler_enabled", checks: check, text: addNewServiceLocalize.eventHandlerEnabled },
    { type: "text", name: "low_flap_threshold", text: addNewServiceLocalize.lowFlapThreshold },
    { type: "text", name: "high_flap_threshold", checks: check, text: addNewServiceLocalize.highFlapThreshold },
    { type: "check", name: "flap_detection_enabled", checks: check, text: addNewServiceLocalize.flapDetectionEnabled },
    { type: "check", name: "flap_detection_options", checks: check4, text: addNewServiceLocalize.flapDetectionOptions },
    { type: "check", name: "retain_status_information", checks: check, text: addNewServiceLocalize.retainStatusInformation },
    { type: "check", name: "retain_non_status_information", checks: check, text: addNewServiceLocalize.retainNoStatusInformation },
    { type: "check", name: "process_perf_data", checks: check, text: addNewServiceLocalize.processPerfData },
    { type: "check", name: "is_volatile", checks: check, text: addNewServiceLocalize.isVolatile },
];

const alertFields = [
    { type: "text", name: "notification_period", text: addNewServiceLocalize.notificationPeriod },
    { type: "check", name: "notification_options", checks: check5, text: addNewServiceLocalize.notificationOptions },
    { type: "text", name: "notification_interval", text: addNewServiceLocalize.notificationInterval },
    { type: "text", name: "first_notification_delay", text: addNewServiceLocalize.firstNotificationDelay },
    { type: "check", name: "notification_enabled", checks: check, text: addNewServiceLocalize.notificationEnabled },
    { type: "check", name: "stalking_options", checks: check6, text: addNewServiceLocalize.stalkingOptions }
];

const miscSettings1 = [
    { type: "text", name: "notes", text: addNewServiceLocalize.notes },
    { type: "text", name: "notes_url", text: addNewServiceLocalize.notesURL },
    { type: "text", name: "action_url", text: addNewServiceLocalize.actionURL },
    { type: "text", name: "icon_image", text: addNewServiceLocalize.iconImage },
    { type: "text", name: "icon_image_alt_text", text: addNewServiceLocalize.iconImageAltText },
    { type: "text", name: "generic_name", text: addNewServiceLocalize.genericName }
];

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
    // hostname: string().required().max(30),
    // address: string().required().max(15),
    // checkCommand: string().required().max(30),
    // max_check_attempts: string().required().max(2),
    // check_period: string().required().max(30),
    // contacts: string().required().max(30),
    // notification_interval: string().required().max(30)
});

const FormSplit = styled(Flex)`
    flex-direction: row;
`;

const AddNewService = ({ strings }) => {

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

    const { hostname } = useParams();

    const onSubmit = (service) => {//axios get params
        setBadInput(false);
        setLoading(true);
        const obj = `host_name=Duc`
            + `&service_description=Memory Usage`
            + `&check_command=check_local_mem\!30!20`
            + `&max_check_attempts=2`
            + `&check_period=24x7`
            + `&contacts=nagiosadmin`
            + `&notification_interval=5`
            + `&notification_period=24x7`
            + `&retry_interval=5`
            + `&check_interval=5`
            + `&applyconfig=1`;

        (async function () {
            try {
                const res = await addService(obj);
                setTimeout(function () { history.push(`/services/${hostname}`); }, 5000);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    }

    const onError = (err) => { console.log(err); }

    return (
        <Dashboard>
            <Board>
                <Title>{strings.page.addNewService.title}</Title >
                <AddBoard>
                    <AddSpace>
                        {loading ? (
                            <SpinnerBlock>
                                <AddMessage>{strings.page.addNewService.waitingForConfigDone}</AddMessage>
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

                                    <TabPanel><FormBox control={control} fields={commonFields} /></TabPanel>
                                    <TabPanel>
                                        <FormSplit>
                                            <FormBox control={control} fields={checkSettings1} />
                                            <FormBox control={control} fields={checkSettings2} />
                                        </FormSplit>
                                    </TabPanel>
                                    <TabPanel><FormBox control={control} fields={alertFields} /></TabPanel>
                                    <TabPanel><FormBox control={control} fields={miscSettings1} /></TabPanel>
                                </Tabs>
                                <PageAddHostButton disabled={!isValid} htmlType="submit" />
                            </Form>
                        )}
                    </AddSpace>
                </AddBoard>
            </Board >
        </Dashboard >
    );
};

export default withLocalizeStrings(AddNewService);