import { Grid, Typography } from '@mui/material';
import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import introduce1 from '../components/assets/img/introduce1.webp';
import introduce2 from '../components/assets/img/introduce2.webp';
import introduce3 from '../components/assets/img/introduce3.webp';
import BackgroundWave from './BackgroundWave';

const Introduction = () => {
    const theme = useContext(ThemeContext);
    return (
        <Background>
            <TitleBox>
                <TitleText fontSize={'4rem'} marginRight={'1rem'}>
                    What is
                </TitleText>
                <TitleText fontSize={'4rem'} color={theme.colors.main} fontWeight={'600'} marginRight={'0.5rem'}>
                    Samuksa
                </TitleText>
                <TitleText fontSize={'4rem'}>?</TitleText>
            </TitleBox>
            <StyledGrid container>
                <Grid item>
                    <Img src={introduce1} alt="생선을 들고있는 어부" loading="lazy" />
                    <CustomTypography fontSize={'1.42rem'} fontWeight={'bold'} color={'#373737'}>
                        사용자 대상
                    </CustomTypography>
                    <CustomTypography width={'250px'} color={'#545454'}>
                        직접 수산물 시장가서 회를 사먹는 사람들을 위한 서비스
                    </CustomTypography>
                </Grid>
                <Grid item>
                    <Img src={introduce2} alt="수산물시장 수조" loading="lazy" />
                    <CustomTypography fontSize={'1.42rem'} fontWeight={'bold'} color={'#373737'}>
                        목표
                    </CustomTypography>
                    <CustomTypography width={'250px'} color={'#545454'}>
                        당일 시장의 횟감 시세를 적용인원과 예산에 맞게 추천
                    </CustomTypography>
                </Grid>
                <Grid item>
                    <Img src={introduce3} alt="접시에 담긴 회" loading="lazy" />
                    <CustomTypography fontSize={'1.42rem'} fontWeight={'bold'} color={'#373737'}>
                        만든 이유
                    </CustomTypography>
                    <CustomTypography width={'250px'} fontSize={'1rem'} color={'#545454'}>
                        좋아하는 것을 만들어보기로 공통의 관심사 ‘회’
                    </CustomTypography>
                </Grid>
                <BackgroundWave />
            </StyledGrid>
        </Background>
    );
};

export default Introduction;

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    display: flex;
    /* flex-wrap: wrap; */
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
    padding-top: 3rem;
    ${({ theme }) => theme.device.mobile} {
        justify-content: center;
    }
`;

interface TitleBoxProps {
    fontSize?: any;
    color?: any;
    fontWeight?: any;
    marginRight?: any;
}

const TitleText = styled(Typography)<TitleBoxProps>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '1rem')};
    color: ${(props) => (props.color ? `${props.color}` : 'black')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : 'normal')};
    margin-right: ${(props) => (props.marginRight ? `${props.marginRight}` : '0')};
    ${({ theme }) => theme.device.mobile} {
        font-size: 3rem;
    }
`;

const Img = styled.img`
    display: block;
    width: 14rem;
    height: 19rem;
    object-fit: cover;
    margin: auto;
    margin-bottom: 0.5rem;
    border-radius: 5px;
    ${({ theme }) => theme.device.tablet} {
        width: 12rem;
        height: 16rem;
    }
    ${({ theme }) => theme.device.mobile} {
        width: 9rem;
        height: 12rem;
        margin-bottom: 0.1rem;
    }
`;

const TitleBox = styled.div`
    display: flex;
    margin-top: 30px;
    ${({ theme }) => theme.device.mobile} {
        text-align: center;
        margin-bottom: 25px;
    }
`;

const StyledGrid = styled(Grid)`
    text-align: center;
    margin-bottom: 30px;
    justify-content: space-evenly;
    column-gap: 1rem;
    row-gap: 1rem;
`;

interface CustomTypographyProps {
    fontSize?: any;
    color?: any;
    fontWeight?: any;
    marginRight?: any;
    width?: any;
}

const CustomTypography = styled(Typography)<CustomTypographyProps>`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '1rem')};
    color: ${(props) => (props.color ? `${props.color}` : 'black')};
    font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : 'normal')};
    margin-right: ${(props) => (props.marginRight ? `${props.marginRight}` : '0')};
    width: ${(props) => (props.width ? `${props.width}` : 'auto')};
`;
