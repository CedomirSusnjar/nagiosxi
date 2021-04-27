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
import ErrorModal from '../../components/modal/ErrorModal';
import { nagiosAuthFailedMessage, authFailed, spinnerColor, basicColor } from '../../common/config/config';
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
    border: .1rem solid ${basicColor};
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
    host_name: string().required(),
    address: string().required(),
    max_check_attempts: string().required(),
    check_period: string().required(),
    notification_interval: string().required(),
    notification_period: string().required()
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
    border-bottom: .05rem solid ${basicColor};
`;

const FormSplit = styled(Flex)`
    flex-direction: row;
`;

const AddNewHost = ({ strings }) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);
    let [color] = useState(spinnerColor);
    let [showErrorModal, setShowErrorModal] = useState(false);
    const { formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const [tabIndex, setTabIndex] = useState(0);

    const { isValid } = formState;

    const onSubmit = (host) => {
        setLoading(true);

        let arr = Object.entries(host);
        let obj = 'contacts=nagiosadmin&applyconfig=1';

        arr.forEach(prop => {
            if (prop[1] !== "") {
                obj += `&${prop[0]}=${prop[1]}`
            }
        });

        console.log(obj);
        obj = obj.replace("normal_check_interval", "check_interval");
        obj = obj.replace("retry_check_interval", "retry_interval");

        (async function () {
            try {
                const res = await addHost(obj);
                if(res.data.error === nagiosAuthFailedMessage){
                    setShowErrorModal(true);
                    throw Error(authFailed);
                }
                setTimeout(function () { history.push("/hosts"); }, 5000);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        })();
    }

    const onError = (err) => { console.error(err); };

    const closeErrorModal = () => {
        setShowErrorModal(false);
        history.push('/hosts');
    };

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
                            <>
                            {showErrorModal && <ErrorModal show={showErrorModal} text={strings.page.hosts.permissionDenied} decline={closeErrorModal}/>}
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
                                    <TabPanel> <FormBox control={control} fields={alertFields} /> </TabPanel>
                                    <TabPanel>
                                        <FormSplit>
                                            <FormBox control={control} fields={miscSettings1} />
                                            <FormBox control={control} fields={miscSettings2} />
                                        </FormSplit>
                                    </TabPanel>
                                </Tabs>
                                <PageAddHostButton text={strings.buttons.add} disabled={!isValid} htmlType="submit" />
                            </Form>
                            </>
                        )}
                    </AddSpace>
                </AddBoard>
            </Board >
        </Dashboard >
    );
};

export default withLocalizeStrings(AddNewHost);