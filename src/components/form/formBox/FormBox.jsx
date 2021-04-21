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

const getValue = (name, data) => {
    if(data){
        return data[name];
    }return "";
};

const FormBox = ({control, fields, data}) => {

    return (
        <Container>
            {fields.map((inputField,index) => {
                return <Controller 
                key={index}
                name={inputField.name}
                defaultValue={getValue(inputField.name, data)} 
                control={control} 
                render={({ field }) => 
                (<InputField 
                    type={inputField.type}
                    onChange={field.onChange} 
                    value={field.value} 
                    onBlur={field.onBlur}
                    checks={inputField.checks}
                    text={inputField.text} 
                    key={inputField.name}
                    selectOptions={inputField.options}
                    unit={inputField.unit}
                    />
            )}></Controller>})}
        </Container>
    );
};

export default FormBox;