import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import HostGroup from './HostGroup';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAllHostgroups } from '../../application/application-service';
import BounceLoader from "react-spinners/BounceLoader";
import { strings, withLocalizeStrings } from '../../languages/Localize';
import Title from '../title/Title';
import Dashboard from '../dashboard/Dashboard';

const List = styled(Flex)`
    flex-direction: row;
    width: 100%;
    flex-wrap: wrap;
`;

const SpinnerBlock = styled(Flex)`
    position: absolute;
    justify-content: center;
    width: 100%;
    height: 30%;
    align-items: center;
    top: calc(40% - 8.5rem);
`;

const Board = styled(Flex)`
    position: absolute;
    top: 6rem;
    width: 100%;
    flex-wrap: wrap;
`;

const HostGroupSection = () => {

    let [hostgroups, setHostgroups] = useState(null);
    let [hostgroupLoading, setHostgroupLoading] = useState(true);

    useEffect(() => {
        (async function () {
            try {
                const res = await getAllHostgroups();
                setHostgroups(res.data);
                setTimeout(function () { setHostgroupLoading(false); }, 1000);
            } catch (err) {
                setHostgroupLoading(false);
                console.log(err);
            }
        })();

    }, []);

    return (
        hostgroupLoading ? (
            <SpinnerBlock>
                <BounceLoader color="gainsboro" loading={hostgroupLoading} size={120} />
            </SpinnerBlock>
        ) : (
            <Dashboard>
                <Title text={strings.page.home.hostgroups} />
                <Board>
                    <List>
                        {hostgroups.map(hostgroup => {
                            return <HostGroup
                                key={hostgroup.hostgroup_name}
                                name={hostgroup.hostgroup_name}
                                alias={hostgroup.alias}
                                hosts={hostgroup.members}
                            />
                        })}
                    </List>
                </Board>
            </Dashboard >
        )

    );

};

export default withLocalizeStrings(HostGroupSection);