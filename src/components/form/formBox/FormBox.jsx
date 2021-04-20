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

const FormBox = ({control, fields, manageCheck}) => {

    return (
        <Container>
            {fields.map((inputField,index) => {
                return <Controller 
                key={index}
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
                    manageCheckClick={manageCheck}
                    text={inputField.text} 
                    key={Math.random()}
                    selectOptions={inputField.options}/>
            )}></Controller>})}
        </Container>
    );
};

export default FormBox;