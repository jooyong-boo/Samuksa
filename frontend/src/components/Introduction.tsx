import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import introduce1 from '../components/assets/img/introduce1.jpg';
import introduce2 from '../components/assets/img/introduce2.jpg';
import introduce3 from '../components/assets/img/introduce3.jpg';
import BackgroundWave from './BackgroundWave';

const Introduction = () => {
    return (
        <Background>
            <TitleBox>
                <CustomTypography fontSize={'4.28rem'} marginRight={'1rem'}>
                    What is
                </CustomTypography>
                <CustomTypography fontSize={'4.28rem'} color={'#6EA5F8'} fontWeight={'600'}>
                    Samuksa
                </CustomTypography>
                <CustomTypography fontSize={'4.28rem'}>?</CustomTypography>
            </TitleBox>
            <Grid
                container
                rowSpacing={4}
                sx={{ textAlign: 'center', marginBottom: '30px' }}
                justifyContent="space-evenly"
            >
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
                    <CustomTypography width={'250px'} color={'#545454'}>
                        좋아하는 것을 만들어보기로 공통의 관심사 ‘회’
                    </CustomTypography>
                </Grid>
                <BackgroundWave />
            </Grid>
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
`;

const Img = styled('img')({
    // margin: '13px 13px 12px 16px ',
    display: 'block',
    width: '17.8rem',
    height: '24.2rem',
    objectFit: 'cover',
    margin: 'auto',
    borderRadius: '5px',
});

const TitleBox = styled.div`
    display: flex;
    margin-top: 36px;
`;

// 사이즈
// 컬러
// 웨이트
// 마진라이트
// 위드

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
