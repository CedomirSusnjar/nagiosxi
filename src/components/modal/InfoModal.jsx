import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import closeImg from '../../assets/close.png';
import { withLocalizeStrings } from '../../languages/Localize';
import FieldBox from '../../components/form/fieldBox/FieldBox';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { css } from '@emotion/css';
import { useState } from 'react';
import { commonFields, commonServiceFields, checkSettings1, checkSettings2, alertFields, miscSettings1, miscSettings2 } from '../../common/config/nagios-field-names';

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
    margin-bottom: 2.5rem;
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

const InfoModal = ({ strings, show, confirm, isHost, decline, question, data }) => {

    const [tabIndex, setTabIndex] = useState(0);

    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    let common = null;

    if(isHost){
        common = commonFields;
    }else common = commonServiceFields;

    return (
        show && <>
            <Backdrop />
            <Container onClick={decline}>
                <ModalContainer onClick={stopPropagation}>
                    <Close onClick={decline}><CloseImg /></Close>
                    <Header>{`${data.display_name} - ${strings.common.details}`}</Header>
                    <Tabs className={TabCSS} selectedIndex={tabIndex} onSelect={(index,_,event) => {
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
                            <FieldBox data={data} fields={common} />
                        </TabPanel>
                        <TabPanel>
                            <FormSplit>
                                <FieldBox data={data} fields={checkSettings1} />
                                <FieldBox data={data} fields={checkSettings2} />
                            </FormSplit>
                        </TabPanel>
                        <TabPanel>
                            <FieldBox data={data} fields={alertFields} />
                        </TabPanel>
                        <TabPanel>
                            <FormSplit>
                                <FieldBox data={data} fields={miscSettings1} />
                                <FieldBox data={data} fields={miscSettings2} />
                            </FormSplit>
                        </TabPanel>
                    </Tabs>
                </ModalContainer>
            </Container>
        </>
    );
};

export default withLocalizeStrings(InfoModal);