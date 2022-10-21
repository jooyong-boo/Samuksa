import { Typography } from '@mui/material';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const Title = () => {
    const theme = useContext(ThemeContext);
    return (
        <>
            <Container>
                <MainTitle>모두가 편히</MainTitle>
                <MainTitle marginLeft={'1rem'}>떠먹는 그날까지,</MainTitle>
                <MainTitle color={theme.colors.main} marginLeft={'1rem'}>
                    사먹사
                </MainTitle>
            </Container>
            <MainTitle marginBottom={'2rem'} fontSize={'1.78rem'} fontWeight={'600'}>
                고민하지말고 편하게 추천 받아보세요.
            </MainTitle>
        </>
    );
};

export default Title;

const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
`;

interface MainTitleProps {
    fontSize?: any;
    fontWeight?: any;
    color?: any;
    marginLeft?: any;
    marginBottom?: any;
}

const MainTitle = styled(Typography)<MainTitleProps>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '3.85rem')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : '900')};
    text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    color: ${(props) => (props.color ? `${props.color}` : 'white')};
    margin-left: ${(props) => (props.marginLeft ? `${props.marginLeft}` : '0')};
    margin-bottom: ${(props) => (props.marginBottom ? `${props.marginBottom}` : '0')};
`;
