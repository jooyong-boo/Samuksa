import { Button, Checkbox, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
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
    height: 45rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #eaeaea;
`;

const Register = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checkPw, setCheckPW] = useState(true);
    const [email, setEmail] = useState('');

    const onChange = (change, check, e) => {
        let inputChange = e.target.value;
        let reg;
        if (check === id) {
            reg = new RegExp(/^[a-z0-9]{4,12}$/);
        }
        if (check === password) {
            reg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/);
        }
        if (check === passwordConfirm) {
            reg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/);
        }
        if (check === email) {
            reg = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
        }
        if (reg) {
            change(inputChange);
        }
        console.log(reg.test(inputChange));
        // return console.log(reg.test(inputChange));
        // change(e.target.value);
    };

    console.log(id, password, passwordConfirm, email);

    useEffect(() => {
        if (password !== passwordConfirm) {
            setCheckPW(false);
        } else {
            setCheckPW(true);
        }
    }, [password, passwordConfirm]);

    const onSign = () => {};

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
                                onChange={(e) => {
                                    onChange(setId, id, e);
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '24px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>닉네임</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="한글 또는 영문"
                            />
                        </div>
                        <div style={{ paddingTop: '24px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>비밀번호</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="8자리 이상 영문, 숫자"
                                sx={
                                    {
                                        // '::-webkit-input-placeholder': { fontSize: '12px' },
                                        // '::-ms-input-placeholder': { fontSize: '5px' },
                                        // '::placeholder': { fontSize: '1px' },
                                    }
                                }
                                onChange={(e) => {
                                    onChange(setPassword, password, e);
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '12px' }}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="비밀번호 확인"
                                onChange={(e) => {
                                    onChange(setPasswordConfirm, passwordConfirm, e);
                                }}
                            />
                            {checkPw ? null : <Typography>비밀번호가 일치하지 않습니다.</Typography>}
                        </div>
                        <div style={{ paddingTop: '24px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>이메일 주소</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="8자리 이상 영문, 숫자"
                                onChange={(e) => {
                                    onChange(setEmail, email, e);
                                }}
                            />
                            <Button
                                sx={{
                                    backgroundColor: '#6EA5F8',
                                    color: 'white',
                                    boxShadow: 'none',
                                }}
                            >
                                인증
                            </Button>
                        </div>
                        <div style={{ paddingTop: '0.5rem' }}>
                            <Typography sx={{ fontSize: '16px', mb: 0.5 }}>인증번호를 입력해주세요</Typography>
                            <TextField id="outlined-basic" variant="outlined" size="small" placeholder="" />
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
