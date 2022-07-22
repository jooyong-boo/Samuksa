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

const Register = () => {
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
                            회원가입
                        </Typography>
                        {/* </div> */}
                        <div style={{ paddingTop: '24px', display: 'inline-flex', flexDirection: 'column' }}>
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
                                placeholder="8자리 이상 영문, 숫자"
                                sx={{
                                    '::-webkit-input-placeholder': { fontSize: '12px' },
                                    '::-ms-input-placeholder': { fontSize: '5px' },
                                    '::placeholder': { fontSize: '1px' },
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '12px' }}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="비밀번호 확인"
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5rem 0',
                                height: '20px',
                            }}
                        >
                            <Typography fontSize={14}>
                                <NavLink to={`/login`} style={{ textDecoration: 'none', color: '#969696' }}>
                                    로그인
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
                                회원가입
                            </Button>
                        </div>
                    </div>
                </Card>
            </Background>
        </>
    );
};

export default Register;
