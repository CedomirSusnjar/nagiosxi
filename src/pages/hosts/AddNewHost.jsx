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

const AddNewHost = ({ strings }) => {

    let [hostname, setHostname] = useState('');
    let [hostAddress, setHostAddress] = useState(null);
    let [checkCommand, setCheckCommand] = useState(null);
    let [maxCheckAttempts, setMaxCheckAttempts] = useState(null);
    let [checkPeriod, setCheckPeriod] = useState(null);
    let [contact, setContact] = useState("nagiosadmin");
    let [notificationInterval, setNotificationInterval] = useState(null);
    let [notificationPeriod, setNotificationPeriod] = useState(null);
    let [applyConfig, setApplyConfig] = useState(1);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    let [color, setColor] = useState("gainsboro");

    const onHostnameChangeHandler = (event) => {
        setHostname(event.target.value);
        console.log('hostname' + hostname);
    }

    const waitForNagiosConfigDone = () => {
        return new Promise(setTimeout(function () { history.push("/hosts"); }, 5000));
    }

    const onClickHandler = () => {
        setLoading(true);
        const hostObj = {
            host_name: "TestHost",
            address: "192.168.17.129",
            max_check_attempts: "2",
            check_period: "24x7",
            notification_interval: "5",
            notification_period: "24x7",
            applyconfig: "1"
        }

        const obj = `host_name=${hostObj.host_name}`
            + `&address=${hostObj.address}`
            + `&max_check_attempts=${hostObj.max_check_attempts}`
            + `&check_period=${hostObj.check_period}`
            + `&contacts=${contact}`
            + `&notification_interval=${hostObj.notification_interval}`
            + `&notification_period=${hostObj.notification_period}`
            + `&applyconfig=${hostObj.applyconfig}`;

        // console.log(hostObj);

        addHost(obj).
            then(res => {
                console.log(res);
                waitForNagiosConfigDone().then(setLoading(false));
            }).catch(err => {
                console.log(err);
            });
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
                            <>
                                <Input text="Ime: " value={hostname} onChange={(event) => { onHostnameChangeHandler(event) }} />
                                <Input text="Adresa: " value="192.168.17.129" />
                                <Input text="Check komanda:" value="check_ping\!3000,80%\!5000,100%" />
                                <Input text="Maksimalan broj pokusaja: " value="2" />
                                <Input text="Period provjere: " value="24x7" />
                                <Input text="Kontakt:" value="nagiosadmin" />
                                <Input text="Interval obavjestenja: " value="5" />
                                <Input text="Period notifikacija: " value="24x7" />
                                <PageAddHostButton onClickHandler={onClickHandler} />
                            </>
                        )}

                    </AddSpace>
                </AddBoard>
            </Board >
        </Dashboard >
    );
};

export default withLocalizeStrings(AddNewHost);