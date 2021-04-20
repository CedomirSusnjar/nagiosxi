import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { css } from '@emotion/css';
import { Select, Input } from 'antd';
import { Radio } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const StyledInput = styled(Input)`
    &.ant-input {
        border-radius: 1rem;
        width: 28rem;
        height: 2.5rem;
        outline: none;
        border: .1rem solid gainsboro;
        padding-left: 1rem;
        font-size: 1.2rem;
    }
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

const SelectS = styled(Select)`

    &.ant-select { 
        width: 28rem;
        border: .05rem solid gainsboro;
        border-radius: 1rem;
        height: 2.5rem;
        overflow: hidden;
        .ant-select-selector {
            height: 2.5rem;
            border: none;
            outline: none;
            .ant-select-selection-search {
                .ant-select-selection-search-input {
                    height: 2rem;
                    outline: none;
                    border: none;
                    background-color:red;
                   
                }
            }
            .ant-select-selection-item {
                display: flex;
                align-items: center;
                font-size: 1.2rem;
            }
        }
        .ant-select-arrow {
            width: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
   
`;

const DropDownClass = css`
        font-size: 1.2rem;
`;

const RadioS = styled(Radio)`
        &.ant-radio-wrapper {
            font-size: 1.2rem;
            span {
                &:last-child {
                    padding-bottom: .25rem;
                }
            }
        }
`;

const RadioG = styled(Radio.Group)`
    &.ant-radio-group {
        display: flex;
    }
`;

const InputField = ({ name, text, onBlur, onChange, value, type, checks, password, selectOptions }) => {


    const [radioGValue, setRadioGValue] = useState(parseInt(value));
    let [selectValue, setSelectValue] = useState(null);

    const onRadioChange = (event) => {
        console.log('radio checked', event.target.value);
        setRadioGValue(event.target.value);
    };

    let input = null;

    function onChangeS(value) {
        setSelectValue(value);
    }


    switch (type) {
        case "text":
            input = <StyledInput type={password} value={value} onChange={onChange} onBlur={onBlur} />;
            break;
        case "select":
            input = <SelectS
                name={name}
                optionFilterProp="children"
                value={selectValue}
                dropdownClassName={DropDownClass}
                dropdownMatchSelectWidth={true}
                onChange={onChangeS}
                options={selectOptions}>
            </SelectS>
            break;
        case "check":
            input = <RadioG onChange={onRadioChange} value={radioGValue}>
                {checks.map(check => {
                    return <RadioS onChange={onChange} key={check.key} value={check.key}>{check.value}</RadioS>;
                })}
            </RadioG>
            break;
        default:
            break;
    }


    return (
        <Container>
            <Text>{text}</Text>
            {input}
        </Container>
    );

};

export default InputField;