import styled from 'styled-components';
import { Flex } from 'reflexbox/styled-components';
import { Input } from 'antd';
import { Select } from 'antd';
import { css } from '@emotion/css';

const StyledInput = styled(Input)`
    border-radius: 1rem;
    width: 28rem;
    height: 3.5rem;
    outline: none;
    border: .1rem solid gainsboro;
    padding-left: 1rem;
`;

const Container = styled(Flex)`
    flex-direction: row;
    margin-left: 1.6rem;
    margin-top: 1.2rem;
    position: relative;
`;

const Text = styled(Flex)`
    font-size: 1.4rem;
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

const { Option } = Select;

const DropDownClass = css`
    background-color: white;
    border: .05rem solid gainsboro;
    border-radius: 1rem;
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

`;


function onChange({value}) {
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

const onOptionSelect = ({value}) => {
    console.log(value);
}

const InputField = ({ text, value, onChange, onBlur, type }) => {

    let input = null;

    switch (type) {
        case "text":
            input = <StyledInput type="text" value={value} onChange={onChange} onBlur={onBlur} />;
            break;
        case "select":
            input = <SelectS
                showSearch
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                dropdownClassName={DropDownClass}
                onSelect={onOptionSelect}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                <Option className={OptionClass} value="jack">Jack</Option>
                <Option className={OptionClass} value="lucy">Lucy</Option>
                <Option className={OptionClass} value="tom">Tom</Option>
            </SelectS>
    }


    return (
        <Container>
            <Text>{text}</Text>
            {input}
        </Container>
    );

};

export default InputField;