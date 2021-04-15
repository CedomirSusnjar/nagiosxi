import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { css } from '@emotion/css';
import { Select, Input } from 'antd';
import Check from '../../components/checks/Check';

const { Option } = Select;

const StyledInput = styled(Input)`
    border-radius: 1rem;
    width: 28rem;
    height: 2.5rem;
    outline: none;
    border: .1rem solid gainsboro;
    padding-left: 1rem;
`;

const Container = styled(Flex)`
    flex-direction: row;
    margin-top: 1.2rem;
    position: relative;
`;

const Text = styled(Flex)`
    font-size: 1.2rem;
    width: 20rem;
    vertical-align: center;
`;

const ErrorMessage = styled(Flex)`
    color: red;
    position: relative;
    width: 30rem;
`;

const ErrMsgText = styled(Flex)`
    position: absolute;
    top: .8rem;
    width: 100%;
    font-size: 1rem;
    padding-left: 2rem;
`;

const SelectS = styled(Select)`

    &.ant-select { 
        width: 28rem;
        border: .05rem solid gainsboro;
        border-radius: 1rem;
        display: flex;
        flex-direction: row;
        height: 3.5rem;
        .ant-select-selector {
            width: 90%;
            .ant-select-selection-search {
                position: relative;
                .ant-select-selection-search-input {
                    width: 24rem;
                    height: 2.5rem;
                    outline: none;
                    border: none;
                    position: absolute;
                    top: .5rem;
                    left: .5rem;
                }
        }
    }
    .ant-select-arrow {
        width: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
   
`;

const Combobox = styled(Flex)`
    border-radius: 1rem;
    width: 28rem;
    height: 3.5rem;
    outline: none;
    border: .1rem solid gainsboro;
    padding-left: 1rem;
`;



const DropDownClass = css`
    background-color: white;
    border: .05rem solid gainsboro;
    z-index: 1000;
`;

const OptionClass = css`
    cursor: pointer;
    border-bottom: .05rem solid gainsboro;
    &: hover {
        background-color: red;
    }
    height: 3rem;
    display: flex;
    align-items: center;
    padding-left: 1.5rem;
    position: relative;
    
`;

const CheckContainer = styled(Flex)`
    flex-direction: row;
`;


function onChange({ value }) {
    console.log(`selected ${value}`);
}

function onBlur() {
    console.log('blur');
}

function onFocus() {
    console.log('focus');
}

function onSearch(val) {
    console.log('search:', val);
}

const onOptionClick = (value) => {
    console.log(value);
}

const onOptionSelect = ({ value }) => {
    console.log(value);
}

const InputField = ({ name, text, value, onChange, onBlur, type, checks }) => {

    let input = null;

    const opt = [
        {
            label: "Jack",
            value: "jack"
        },
        {
            label: "afaf",
            value: "afaf"
        },
        {
            label: "sss",
            value: "sss"
        },
        {
            label: "24x7",
            value: "24x7"
        },
    ]

    switch (type) {
        case "text":
            input = <StyledInput type="text" value={value} onChange={onChange} onBlur={onBlur} />;
            break;
        case "select":
            input = <SelectS
                name={name}
                optionFilterProp="children"
                value={value}
                dropdownClassName={DropDownClass}
                dropdownMatchSelectWidth={true}
                onChange={onChange}
                options={opt}
            >
            </SelectS>
            break;
        case "check":
            console.log(checks);
            input = <CheckContainer>
                {checks.map(check => { return <Check key={check.key} text={check.value} /> })}
            </CheckContainer>

    }


    return (
        <Container>
            <Text>{text}</Text>
            {input}
        </Container>
    );

};

export default InputField;