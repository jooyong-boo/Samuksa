import { Grid, Typography } from '@mui/material';
import styled from 'styled-components';
import introduce1 from '../components/assets/img/introduce1.jpg';
import introduce2 from '../components/assets/img/introduce2.jpg';
import introduce3 from '../components/assets/img/introduce3.jpg';
import BackgroundWave from './BackgroundWave';

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

const Introduction = () => {
    return (
        <Background>
            <div style={{ display: 'flex', marginTop: '36px' }}>
                <Typography sx={{ fontSize: '4.28rem' }} mr={1}>
                    What is
                </Typography>
                <Typography sx={{ fontSize: '4.28rem' }} color="#6EA5F8" fontWeight="600">
                    Samuksa
                </Typography>
                <Typography sx={{ fontSize: '4.28rem' }}>?</Typography>
            </div>
            <Grid
                container
                rowSpacing={4}
                sx={{ textAlign: 'center', marginBottom: '30px' }}
                justifyContent="space-evenly"
            >
                <Grid item>
                    <Img src={introduce1} alt="생선을 들고있는 어부" />
                    <Typography sx={{ fontSize: '1.42rem' }} fontWeight="bold" color="#373737">
                        사용자 대상
                    </Typography>
                    <Typography sx={{ width: '250px', fontSize: '1rem', color: '#545454' }}>
                        직접 수산물 시장가서 회를 사먹는 사람들을 위한 서비스
                    </Typography>
                </Grid>
                <Grid item>
                    <Img src={introduce2} alt="수산물시장 수조" />
                    <Typography sx={{ fontSize: '1.42rem' }} fontWeight="bold" color="#373737">
                        목표
                    </Typography>
                    <Typography sx={{ width: '250px', fontSize: '1rem', color: '#545454' }}>
                        당일 시장의 횟감 시세를 적용인원과 예산에 맞게 추천
                    </Typography>
                </Grid>
                <Grid item>
                    <Img src={introduce3} alt="접시에 담긴 회" />
                    <Typography sx={{ fontSize: '1.42rem' }} fontWeight="bold" color="#373737">
                        만든 이유
                    </Typography>
                    <Typography sx={{ width: '250px', fontSize: '1rem', color: '#545454' }}>
                        좋아하는 것을 만들어보기로 공통의 관심사 ‘회’
                    </Typography>
                </Grid>
                <BackgroundWave />
            </Grid>
        </Background>
    );
};

export default Introduction;
