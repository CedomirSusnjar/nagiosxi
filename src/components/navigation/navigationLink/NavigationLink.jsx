import styled from 'styled-components';

const StyledNavigationLink = styled.a`
    margin-left: 2rem;
    margin: right: 2rem;
    font-size: 1.5rem;
    min-width: 8rem;
    display: inline-block;
    text-align: center;
    border-radius: .5rem;
    cursor: pointer;
    &: hover {
        text-decoration: underline;
    }
`;

const NavigationLink = ({text, onClick}) => {

    return (
        <StyledNavigationLink onClick={onClick}>{text}</StyledNavigationLink>
    );

};

export default NavigationLink;