import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import closeImg from '../../assets/close.png';
import { withLocalizeStrings } from '../../languages/Localize';
import FormBox from '../../components/form/formBox/FormBox';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { css } from '@emotion/css';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { object } from "yup";
import { string } from "yup";
import { commonFields, commonServiceFields, checkSettings1, checkSettings2, alertFields, miscSettings1, miscSettings2 } from '../../common/config/nagios-field-names';
import PageAddHostButton from '../buttons/hostButtons/PageAddHostButton';
import { updateHost } from '../../application/application-service';
import { useHistory } from 'react-router';

const ModalContainer = styled(Flex)`
    flex-direction: column;
    position: fixed;
    margin: 0 auto;
    top: 20%;
    width: 120rem;
    height: 50rem;
    background-color: white;
    z-index: 500;
    border-radius: 2rem;
`;

const Container = styled(Flex)`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: center;
    align-items: center;
    z-index: 500;
`;

const Backdrop = styled(Flex)`
    background-color: black;
    opacity: 0.2;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 500;
    click: pointer;
`;

const Close = styled(Flex)`
    width: 3rem;
    height: 3rem;
    border-radius: 20rem;
    background-color: white;
    position: absolute;
    top: 1rem;
    right: 1rem;
    justify-content: center;
    align-items: center;
    &: hover {
        border: .2rem solid red;
    }
    cursor: pointer;
`;

const CloseImg = styled(Flex)`
    background-image: url(${closeImg});
    width: 1.6rem;
    height: 1.6rem;
    background-repeat: no-repeat;
`;

const Header = styled(Flex)`
    position: relative;
    top: 1.5rem;
    left: 2rem;
    right: 5rem;
    width: 70%;
    font-size: 1.8rem;
`;

const TabCSS = css`
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    margin-bottom: 1.5rem;
    margin-top: 2.5rem;
    .react-tabs__tab-list {
        .react-tabs__tab {
            bottom: -.1rem;
            font-size: 1.2rem;
        }
        .react-tabs__tab--selected {
        }
    }
    border-bottom: .05rem solid gainsboro;
    z-index: 1000;
`;

const FormSplit = styled(Flex)`
    flex-direction: row;
`;

const UpdateButton = styled(PageAddHostButton)`
    position: absolute;
    bottom: 2rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const validationSchema = object().shape({
    // host_name: string().required(),
    // address: string().required(),
    // max_check_attempts: string().required(),
    // check_period: string().required(),
    // notification_interval: string().required(),
    // notification_period: string().required()
});

const InfoModal = ({ strings, show, confirm, isHost, decline, question, data }) => {

    let [loading, setLoading] = useState(true);
    const [tabIndex, setTabIndex] = useState(0);
    const { setValue, formState, control, handleSubmit } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    const history = useHistory();

    let common = null;

    if (isHost) { common = commonFields; }
    else common = commonServiceFields;

    const onSubmit = (host) => {
        if (isHost) {
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
                    const res = await updateHost(obj);
                    console.log(res);
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            })();
            
            decline();
        }

    }

    const onError = (err) => { console.error(err); }

    return (
        show && <>
            <Backdrop />
            <Container onClick={decline}>
                <ModalContainer onClick={stopPropagation}>
                    <Close onClick={decline}><CloseImg /></Close>
                    <Header>{`${data.display_name} - ${strings.common.details}`}</Header>
                    <Form onSubmit={handleSubmit(onSubmit, onError)}>
                        <Tabs className={TabCSS} selectedIndex={tabIndex} onSelect={(index, _, event) => {
                            event.stopPropagation();
                            setTabIndex(index);
                        }}>
                            <TabList>
                                <Tab>{strings.page.addNewHost.commonSettings}</Tab>
                                <Tab>{strings.page.addNewHost.checkSettings}</Tab>
                                <Tab>{strings.page.addNewHost.alertSettings}</Tab>
                                <Tab>{strings.page.addNewHost.miscSettings}</Tab>
                            </TabList>
                            <TabPanel>
                                <FormBox control={control} data={data} fields={common} />
                            </TabPanel>
                            <TabPanel>
                                <FormSplit>
                                    <FormBox control={control} data={data} fields={checkSettings1} />
                                    <FormBox control={control} data={data} fields={checkSettings2} />
                                </FormSplit>
                            </TabPanel>
                            <TabPanel>
                                <FormBox control={control} data={data} fields={alertFields} />
                            </TabPanel>
                            <TabPanel>
                                <FormSplit>
                                    <FormBox control={control} data={data} fields={miscSettings1} />
                                    <FormBox control={control} data={data} fields={miscSettings2} />
                                </FormSplit>
                            </TabPanel>
                        </Tabs>
                        <UpdateButton text={strings.buttons.update} htmlType="submit" disabled={false} />
                    </Form>

                </ModalContainer>
            </Container>
        </>
    );
};

export default withLocalizeStrings(InfoModal);