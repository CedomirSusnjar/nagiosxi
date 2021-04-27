import styled from 'styled-components';

const StyledNavigationLink = styled.a`
    margin-left: 2rem;
    margin: right: 2rem;
    color: black;
    font-size: 1.5rem;
    min-width: 8rem;
    display: inline-block;
    border-radius: .5rem;
    cursor: pointer;
    &: hover {
        text-decoration: underline;
        color: black;
    }
`;

const NavigationLink = ({text, onClick, style}) => {

    return (<StyledNavigationLink style={style} onClick={onClick}>{text}</StyledNavigationLink>);
    
};

export default NavigationLink;