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

const DropDownClass = css`
    background-color: white;
    border: .05rem solid gainsboro;
    z-index: 1000;
`;

const RadioS = styled(Radio)`
        &.ant-radio-wrapper {
            font-size: 1.2rem;
            .ant-radio {
                margin-right: .3rem;
            }

            cursor: pointer;

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

const InputField = ({ name, text, onBlur, onChange, value, type, checks, manageCheckClick }) => {


    const [radioGValue, setRadioGValue] = useState(parseInt(value));

    const onRadioChange = (event) => {
        console.log('radio checked', event.target.value);
        setRadioGValue(event.target.value);
    };

    let input = null;

    const opt = [
        {
            value: "Marko",
            key: 1
        },
        {
            value: "Janko",
            key: 2
        },
        {
            value: "Zarko",
            key: 3
        }
    ]

    function onChangeS(value) {
        console.log(`selected ${value}`);
      }

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
                onChange={onChangeS}
                options={opt}>
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
        // input = <CheckContainer>
        //     {checks.map(check => { return <Check onClick={manageCheckClick} key={check.key} text={check.value} /> })}
        // </CheckContainer>

    }


    return (
        <Container>
            <Text>{text}</Text>
            {input}
        </Container>
    );

};

export default InputField;