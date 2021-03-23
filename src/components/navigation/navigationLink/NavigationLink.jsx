import styled from 'styled-components';

const StyledNavigationLink = styled.a`
    margin-left: 20px;
    margin: right: 20px;
    min-width: 80px;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    &: hover {
        text-decoration: underline;
    }
    
`;

const NavigationLink = ({text}) => {

    return (
        <StyledNavigationLink>{text}</StyledNavigationLink>
    );

};

export default NavigationLink;