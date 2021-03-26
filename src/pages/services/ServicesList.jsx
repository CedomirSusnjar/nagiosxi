import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import Service from '../../components/service/Service';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Container = styled(Flex)`
    flex-wrap: wrap;
    height: 100%;
`;

const ServicesList = ({services, setServices}) => {

    const removeService = (id) => {
        let servicesTemp = services.filter(e => e.service_object_id != id);
        setServices(servicesTemp);
    }

    return (
        <Container>
            {services.map(service => {
                return <Service
                    status={service.state_type === "1" ? "Aktivan" : "Neaktivan"}
                    serviceName={service.display_name}
                    description={service.service_description}
                    onDelete={() => removeService(service.service_object_id)}
                />
            })}
        </Container>

    );
};

export default ServicesList;