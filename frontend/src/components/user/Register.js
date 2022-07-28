import { Button, Checkbox, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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
    width: 40rem;
    height: 45rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    overflow: auto;
`;

const Register = () => {
    const [id, setId] = useState('');
    const [idOverlapping, setIdOverlapping] = useState('');

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [checkPw, setCheckPW] = useState(true);

    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);

    const [nickName, setNickName] = useState('');
    const [nickNameOverlapping, setNickNameOverlapping] = useState('');

    const [authNum, setAuthNum] = useState('');
    const [checkAuthNum, setCheckAuthNum] = useState(false);

    const onChange = (change, check, e) => {
        let inputChange = e.target.value;
        // let reg;
        if (check === id) {
            const IdReg = new RegExp(/^[a-z0-9]{4,12}$/);
            if (IdReg.test(inputChange)) {
                change(inputChange);
            }
        }
        if (check === nickName) {
            const nickNameReg = new RegExp(/^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]{2,6}$/);
            if (nickNameReg.test(inputChange)) {
                change(inputChange);
            }
        }
        if (check === password) {
            const passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/);
            if (passwordReg.test(inputChange)) {
                change(inputChange);
            }
        }
        if (check === passwordConfirm) {
            const passwordConfirmReg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/);
            if (passwordConfirmReg.test(inputChange)) {
                change(inputChange);
            }
        }
        if (check === email) {
            const emailReg = new RegExp(
                /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
            );
            if (emailReg.test(inputChange)) {
                setCheckEmail(true);
                change(inputChange);
            } else {
                setCheckEmail(false);
            }
        }
        // console.log(reg.test(inputChange));
    };

    console.log(id, nickName, password, passwordConfirm, email);

    const checkOverlapping = () => {};

    const onClickAuth = () => {
        setCheckAuthNum(true);
    };

    const onSignUp = () => {
        if (id && checkPw && checkAuthNum) {
            alert('회원가입 완료');
        } else {
            alert('빈칸을 입력해주세요');
        }
    };

    useEffect(() => {
        if (password !== passwordConfirm) {
            setCheckPW(false);
        } else {
            setCheckPW(true);
        }
    }, [password, passwordConfirm]);

    return (
        <>
            <Background>
                <Card>
                    <div style={{ width: '50%', textAlign: 'center' }}>
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
                        <div style={{ paddingTop: '1rem' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>아이디</Typography>
                            <TextField
                                id="id"
                                variant="outlined"
                                size="small"
                                placeholder="아이디 입력"
                                autoComplete="off"
                                // fullWidth
                                sx={{}}
                                onChange={(e) => {
                                    onChange(setId, id, e);
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6EA5F8',
                                    color: 'white',
                                    boxShadow: 'none',
                                    marginTop: '0.2rem',
                                    ml: '0.5rem',
                                    ':hover': { boxShadow: 'none' },
                                }}
                            >
                                중복체크
                            </Button>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'green' }}>
                                사용 가능한 아이디입니다.
                            </Typography>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                이미 존재하는 아이디입니다.
                            </Typography>
                        </div>
                        <div style={{ paddingTop: '1rem' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>닉네임</Typography>
                            <TextField
                                id="nickName"
                                variant="outlined"
                                size="small"
                                placeholder="한글 또는 영문"
                                autoComplete="off"
                                onChange={(e) => {
                                    onChange(setNickName, nickName, e);
                                }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#6EA5F8',
                                    color: 'white',
                                    boxShadow: 'none',
                                    marginTop: '0.2rem',
                                    ml: '0.5rem',
                                    ':hover': { boxShadow: 'none' },
                                }}
                            >
                                중복체크
                            </Button>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'green' }}>
                                사용 가능한 닉네임입니다.
                            </Typography>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                이미 존재하는 닉네임입니다.
                            </Typography>
                        </div>
                        <div style={{ paddingTop: '1rem' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>비밀번호</Typography>
                            <TextField
                                id="password"
                                variant="outlined"
                                size="small"
                                type="password"
                                placeholder="8자리 이상 영문, 숫자"
                                autoComplete="off"
                                onChange={(e) => {
                                    onChange(setPassword, password, e);
                                }}
                            />
                        </div>
                        <div style={{ paddingTop: '0.5rem' }}>
                            <TextField
                                id="passwordConfirm"
                                variant="outlined"
                                size="small"
                                type="password"
                                placeholder="비밀번호 확인"
                                autoComplete="off"
                                onChange={(e) => {
                                    onChange(setPasswordConfirm, passwordConfirm, e);
                                }}
                            />
                            {checkPw ? null : (
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                    비밀번호가 일치하지 않습니다.
                                </Typography>
                            )}
                        </div>
                        <div style={{ paddingTop: '1rem' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>이메일</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="이메일 형식을 지켜주세요"
                                sx={{ width: '14rem' }}
                                onChange={(e) => {
                                    onChange(setEmail, email, e);
                                }}
                            />
                            {checkEmail ? (
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: '#6EA5F8',
                                        color: 'white',
                                        boxShadow: 'none',
                                        marginTop: '0.2rem',
                                        ml: '0.5rem',
                                        ':hover': { boxShadow: 'none' },
                                    }}
                                    onClick={onClickAuth}
                                >
                                    인증
                                </Button>
                            ) : null}
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                이미 등록된 이메일입니다.
                            </Typography>
                        </div>
                        <div></div>
                        <div style={{ paddingTop: '0.1rem' }}>
                            {checkAuthNum ? (
                                <>
                                    {/* <Typography sx={{ fontSize: '16px', mb: 0.5 }}>인증번호를 입력해주세요</Typography> */}
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        autoComplete="off"
                                        placeholder="인증번호"
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#6EA5F8',
                                            color: 'white',
                                            boxShadow: 'none',
                                            marginTop: '0.2rem',[]
                                            ml: '0.5rem',
                                            ':hover': { boxShadow: 'none' },
                                        }}
                                    >
                                        확인
                                    </Button>
                                </>
                            ) : null}
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
                                    ':hover': { boxShadow: 'none' },
                                }}
                                onClick={onSignUp}
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
