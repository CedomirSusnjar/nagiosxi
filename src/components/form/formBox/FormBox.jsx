import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import InputField from '../../inputs/InputField';

const Container = styled(Flex)`
    flex-direction: column;
    width: 100%;
    height: 35rem;
    border-radius: 2rem;
`;

const FormBox = ({control, fields}) => {

    return (
        <Container>
            {fields.map(inputField => {
                return <Controller 
                name={inputField.name}
                defaultValue="" 
                control={control} 
                render={({ field }) => 
                (<InputField 
                    type={inputField.type}
                    onChange={field.onChange} 
                    value={field.value} 
                    onBlur={field.onBlur}
                    checks={inputField.checks}
                    text={inputField.text} />)} />
            })}
        </Container>
    );

};

export default FormBox;