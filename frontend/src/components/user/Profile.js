import { Typography } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../store/user';

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 70px;
    overflow: hidden;
`;

const Card = styled.div`
    background-color: white;
    width: 25rem;
    height: 35rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    /* justify-content: center; */
    align-items: center;
    border-radius: 5px;
    border: 1px solid #eaeaea;
`;

const Profile = () => {
    const userInfo = useRecoilValue(userInfoState);
    console.log(userInfo);
    return (
        <Background>
            <Card>
                <div style={{ width: '100%', height: '100%', textAlign: 'center' }}>
                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #EAEAEA',
                            padding: '24px',
                            textAlign: 'center',
                        }}
                    >
                        프로필
                    </Typography>
                    <div
                        style={{ height: '100%', paddingTop: '24px', display: 'inline-flex', flexDirection: 'column' }}
                    >
                        <div
                            style={{
                                height: '40%',
                                display: 'flex',
                                flexDirection: 'column',
                                flexWrap: 'wrap',
                                justifyContent: 'space-evenly',
                                alignItems: 'flex-start',
                            }}
                        >
                            <Typography>아이디: {userInfo.userId}</Typography>
                            <Typography>닉네임: {userInfo.userNikName}</Typography>
                            <Typography>이메일: {userInfo.userEmail}</Typography>
                        </div>
                    </div>
                    {/* <Typography sx={{ height: '10rem', padding: '5rem' }}>Profile</Typography> */}
                </div>
            </Card>
        </Background>
    );
};

export default Profile;
