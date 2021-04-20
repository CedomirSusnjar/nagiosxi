import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import InputField from '../../inputs/InputField';

const Container = styled(Flex)`
    flex-direction: column;
    width: 100%;
    height: 35rem;
    border-radius: 2rem;
`;

const getValue = (name, data) => {
    let value;
    data.forEach(prop => {
        console.log(prop);
        //console.log(prop[0]);
        if(prop[0] === name){
            value = prop[1];
        }
    });
    return value;
};

const FieldBox = ({fields, data}) => {

    data = Object.entries(data);

    return (
        <Container>
            {fields.map(inputField => {
                return <InputField 
                    type={inputField.type}
                    checks={inputField.checks}
                    name={inputField.name}
                    text={inputField.text}
                    value={getValue(inputField.name, data)}
                    key={Math.random()}
                    options={inputField.options}
                    />;
            })}
        </Container>
    );
};

export default FieldBox;