import { Button, Checkbox, TextField, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Header';

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
    width: 30%;
    height: 35rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #eaeaea;
`;

const Login = () => {
    return (
        <>
            <Header />
            <Background>
                <Card>
                    <div>
                        {/* <div style={{ borderBottom: '1px solid #EAEAEA', height: '10%', width: '60%', display: 'flex', justifyContent: 'center', margin: 'auto' }}> */}
                        <Typography
                            sx={{
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                borderBottom: '1px solid #EAEAEA',
                                paddingBottom: '24px',
                                textAlign: 'center',
                            }}
                        >
                            로그인
                        </Typography>
                        {/* </div> */}
                        <div style={{ paddingTop: '24px', display: 'inline-flex', flexDirection: 'column' }}>
                            <Typography sx={{ fontSize: '12px', mb: '1rem', fontWeight: 'bold' }}>
                                원활한 서비스 이용을 위해 로그인해주세요.
                            </Typography>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>아이디</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="아이디 입력"
                                sx={{}}
                            />
                        </div>
                        <div style={{ paddingTop: '24px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>비밀번호</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="비밀번호 입력"
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.5rem 0',
                                height: '20px',
                            }}
                        >
                            <Typography fontSize={12} color="#969696">
                                <input
                                    type="checkbox"
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: 'white',
                                        border: '1px solid #D9D9D9',
                                        borderRadius: '3px',
                                        verticalAlign: 'middle',
                                        marginRight: '0.2rem',
                                    }}
                                />
                                아이디 저장
                            </Typography>
                            <Typography fontSize={12} fontWeight="bold">
                                <NavLink to={`/register`} style={{ textDecoration: 'none', color: 'black' }}>
                                    회원가입
                                </NavLink>
                            </Typography>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    backgroundColor: '#6EA5F8',
                                    color: 'white',
                                    boxShadow: 'none',
                                    width: '100%',
                                }}
                            >
                                로그인
                            </Button>
                        </div>
                    </div>
                </Card>
            </Background>
        </>
    );
};

export default Login;
