import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import InputField from '../../inputs/InputField';

const Container = styled(Flex)`
    flex-direction: column;
    width: 100%;
    height: 35rem;
    border-radius: 2rem;
`;

const getValue = (name, data) => {return data[name];};

const FieldBox = ({fields, data}) => {

    return (
        <Container>
            {fields.map(inputField => {
                return <InputField 
                    type={inputField.type}
                    checks={inputField.checks}
                    name={inputField.name}
                    text={inputField.text}
                    value={getValue(inputField.name, data)}
                    key={inputField.text}
                    selectOptions={inputField.options}
                    />;
            })}
        </Container>
    );
};

export default FieldBox;