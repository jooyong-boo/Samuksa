import { Button, Checkbox, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { signUp, checkIdAxios, checkNickNameAxios } from '../../api/auth';

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
    width: 30rem;
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
    const [checkId, setCheckId] = useState(true);
    const [overlappingId, setOverlappingId] = useState('');

    const [nickName, setNickName] = useState('');
    const [checkNickName, setCheckNickName] = useState(true);
    const [overlappingNickName, setOverlappingNickName] = useState('');

    const [password, setPassword] = useState(''); // 비밀번호
    const [checkPw, setCheckPW] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState(''); //비밀번호 확인
    const [checkPwConfirm, setCheckPwConfirm] = useState(true);

    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);

    const [authNum, setAuthNum] = useState('');
    const [checkAuthNum, setCheckAuthNum] = useState(false);

    const onChange = (change, check, e) => {
        let inputChange = e.target.value;
        console.log(check);
        // let reg;
        if (check === id) {
            const IdReg = new RegExp(/^[a-z0-9]{4,12}$/);
            if (IdReg.test(inputChange)) {
                change(inputChange);
                setCheckId(false);
            } else {
                change(inputChange);
                setCheckId(true);
            }
        }
        if (check === nickName) {
            const nickNameReg = new RegExp(/^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]{2,6}$/);
            if (nickNameReg.test(inputChange)) {
                change(inputChange);
                setCheckNickName(false);
            } else {
                change(inputChange);
                setCheckNickName(true);
            }
        }
        if (check === password) {
            const passwordReg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/);
            if (passwordReg.test(inputChange)) {
                change(inputChange);
                setCheckPW(false);
            }
        }
        if (check === passwordConfirm) {
            const passwordConfirmReg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/);
            change(inputChange);
            if (passwordConfirmReg.test(inputChange) && password === passwordConfirm) {
                setCheckPwConfirm(false);
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

    // console.log(id, nickName, password, passwordConfirm, email);

    const checkOverlappingId = () => {
        checkIdAxios({ id }).then((res) => setOverlappingId(res));
    };

    const checkOverlappingNickName = () => {
        checkNickNameAxios({ nickName }).then((res) => setOverlappingNickName(res));
    };

    const onClickAuth = () => {
        setCheckAuthNum(true);
    };

    const onSignUp = (id, password, nickName, email) => {
        if (id && nickName && password && email) {
            if ((checkId && checkNickName && checkPw && checkPwConfirm) === false && checkEmail === true) {
                signUp({ id, password, nickName, email }).then((res) => alert('회원가입 성공'));
            } else {
                console.log('체크중에 오류');
            }
        } else {
            console.log('입력값 오류');
        }
        console.log(id, nickName, password, email);
    };

    useEffect(() => {
        if (password !== passwordConfirm) {
            setCheckPwConfirm(true);
        } else {
            setCheckPwConfirm(false);
        }
    }, [password, passwordConfirm]);

    return (
        <>
            <Background>
                <Card>
                    <div style={{ width: '100%', textAlign: 'center' }}>
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
                                color={checkId ? 'error' : 'primary'}
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
                                disabled={checkId}
                                onClick={checkOverlappingId}
                            >
                                중복체크
                            </Button>
                            {overlappingId === true ? (
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                    이미 존재하는 아이디입니다.
                                </Typography>
                            ) : null}
                            {overlappingId === false ? (
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'green' }}>
                                    사용 가능한 아이디입니다.
                                </Typography>
                            ) : null}
                        </div>
                        <div style={{ paddingTop: '1rem' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>닉네임</Typography>
                            <TextField
                                id="nickName"
                                variant="outlined"
                                size="small"
                                placeholder="한글 또는 영문"
                                autoComplete="off"
                                color={checkNickName ? 'error' : 'primary'}
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
                                disabled={checkNickName}
                                onClick={checkOverlappingNickName}
                            >
                                중복체크
                            </Button>
                            {overlappingNickName === false ? (
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'green' }}>
                                    사용 가능한 닉네임입니다.
                                </Typography>
                            ) : null}
                            {overlappingNickName === true ? (
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                    이미 존재하는 닉네임입니다.
                                </Typography>
                            ) : null}
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
                                color={checkPw ? 'error' : 'primary'}
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
                                color={checkPwConfirm ? 'error' : 'primary'}
                                onChange={(e) => {
                                    onChange(setPasswordConfirm, passwordConfirm, e);
                                }}
                            />
                            {/* {passwordConfirm ? null : (
                                <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                    비밀번호가 일치하지 않습니다.
                                </Typography>
                            )} */}
                        </div>
                        <div style={{ paddingTop: '1rem' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>이메일</Typography>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                placeholder="이메일 형식을 지켜주세요"
                                sx={{ width: '14rem' }}
                                color={checkEmail ? 'primary' : 'error'}
                                onChange={(e) => {
                                    onChange(setEmail, email, e);
                                }}
                            />
                            {checkEmail && (
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
                            )}
                            {/* <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                이미 등록된 이메일입니다.
                            </Typography> */}
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
                                            marginTop: '0.2rem',
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
                                    width: '50%',
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
