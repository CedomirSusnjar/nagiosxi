import styled from 'styled-components';
import Dashboard from '../../components/dashboard/Dashboard';
import { Flex } from 'reflexbox/styled-components';
import { withLocalizeStrings } from '../../languages/Localize';
import PageAddHostButton from '../../components/buttons/hostButtons/PageAddHostButton';
import { addService } from '../../application/application-service';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import BounceLoader from "react-spinners/BounceLoader";
import { useForm } from 'react-hook-form';
import { object } from "yup";
//import { string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { css } from '@emotion/css';
import FormBox from '../../components/form/formBox/FormBox';
import { commonFields, checkSettings1, checkSettings2, alertFields, miscSettings1 } from '../../common/config/nagios-field-names';

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
   // const [badInput, setBadInput] = useState(false);
    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });
    const [tabIndex, setTabIndex] = useState(0);

    const { isValid } = formState;

    const { hostname } = useParams();

    const obj = `host_name=Duc`
    + `&service_description=Memory Usage`
    + `&check_command=check_local_mem!30!20`
    + `&max_check_attempts=2`
    + `&check_period=24x7`
    + `&contacts=nagiosadmin`
    + `&notification_interval=5`
    + `&notification_period=24x7`
    + `&retry_interval=5`
    + `&check_interval=5`
    + `&active_checks_enabled=2`
    + `&applyconfig=1`;

    const onSubmit = (service) => {//axios get params
        //setBadInput(false);
        setLoading(true);
        
        (async function () {
            try {
                await addService(obj);
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

                                    <TabPanel><FormBox  control={control} fields={commonFields} /></TabPanel>
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