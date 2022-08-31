import { Button, Checkbox, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUp, checkIdAxios, checkNickNameAxios } from '../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from 'recoil';
import { userIdState } from '../../store/user';
import { kakaoLogin, kakaoUserInfo } from '../../api/kakaoAuth';

const Register = () => {
    const navigate = useNavigate();
    const notify = (text: string) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });

    const setUserId = useSetRecoilState(userIdState);

    const [id, setId] = useState('');
    const [checkId, setCheckId] = useState(true);
    const [overlappingId, setOverlappingId] = useState<string | boolean>('');

    const [nickName, setNickName] = useState('');
    const [checkNickName, setCheckNickName] = useState(true);
    const [overlappingNickName, setOverlappingNickName] = useState<string | boolean>('');

    const [password, setPassword] = useState(''); // 비밀번호
    const [checkPw, setCheckPw] = useState(true);
    const [passwordConfirm, setPasswordConfirm] = useState(''); //비밀번호 확인
    const [checkPwConfirm, setCheckPwConfirm] = useState(true);

    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);

    const [authNum, setAuthNum] = useState('');
    const [checkAuthNum, setCheckAuthNum] = useState(false);

    const onChange = (
        change: (value: string) => void,
        check: string,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        let inputChange = e.target.value;
        // console.log(check);
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
            const nickNameReg = new RegExp(/^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]{1,8}$/);
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
                setCheckPw(false);
            } else {
                change(inputChange);
                setCheckPw(true);
            }
        }
        if (check === passwordConfirm) {
            const passwordConfirmReg = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/);
            change(inputChange);
            if (passwordConfirmReg.test(inputChange) && password === passwordConfirm) {
                setCheckPwConfirm(false);
            } else {
                setCheckPwConfirm(true);
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
        checkIdAxios({ id }).then((res) => {
            setOverlappingId(res);
            setCheckId(true);
        });
    };

    const checkOverlappingNickName = () => {
        checkNickNameAxios({ nickName }).then((res) => {
            setOverlappingNickName(res);
            setCheckNickName(true);
        });
    };

    const onClickAuth = () => {
        setCheckEmail(true);
        setCheckAuthNum(true);
    };

    const onSignUp = () => {
        if (id && nickName && password && email) {
            if ((checkId && checkNickName && checkPw && checkPwConfirm) === false && checkEmail === true) {
                signUp({ id, password, nickName, email }).then(() => {
                    navigate('/login');
                    localStorage.removeItem('id');
                    setUserId(id);
                });
            } else {
                console.log('체크중에 오류');
            }
        } else {
            console.log('입력값 오류');
        }
    };

    useEffect(() => {
        setOverlappingId('');
    }, [id]);

    useEffect(() => {
        setOverlappingNickName('');
    }, [nickName]);

    useEffect(() => {
        if (password !== passwordConfirm) {
            setCheckPwConfirm(true);
        } else {
            setCheckPwConfirm(false);
        }
    }, [password, passwordConfirm]);

    let code = new URL(window.location.href).searchParams.get('code');
    useEffect(() => {
        if (code) {
            kakaoLogin(code).then(() => {
                kakaoUserInfo();
            });
        }
    }, [code]);

    return (
        <>
            <Background>
                <Card>
                    <div style={{ width: '70%', textAlign: 'center' }}>
                        <RegisterTitle>회원가입</RegisterTitle>
                        {/* </div> */}
                        <div style={{ width: '100%', textAlign: 'left' }}>
                            <div style={{ paddingTop: '1rem' }}>
                                <CustomTypography>아이디</CustomTypography>
                                <TextField
                                    id="id"
                                    variant="outlined"
                                    size="small"
                                    placeholder="4~12자 영문, 숫자"
                                    autoComplete="off"
                                    color={checkId ? 'error' : 'primary'}
                                    sx={{ width: '70%' }}
                                    onChange={(e) => {
                                        onChange(setId, id, e);
                                    }}
                                />
                                <CustomBtn
                                    variant="contained"
                                    disabled={checkId}
                                    onClick={checkOverlappingId}
                                    sx={{ marginLeft: '0.5rem' }}
                                >
                                    중복체크
                                </CustomBtn>
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
                                <CustomTypography>닉네임</CustomTypography>
                                <TextField
                                    id="nickName"
                                    variant="outlined"
                                    size="small"
                                    placeholder="2~9자 한글 또는 영문"
                                    sx={{ width: '70%' }}
                                    autoComplete="off"
                                    color={checkNickName ? 'error' : 'primary'}
                                    onChange={(e) => {
                                        onChange(setNickName, nickName, e);
                                    }}
                                />
                                <CustomBtn
                                    variant="contained"
                                    disabled={checkNickName}
                                    onClick={checkOverlappingNickName}
                                    sx={{ marginLeft: '0.5rem' }}
                                >
                                    중복체크
                                </CustomBtn>
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
                                <CustomTypography>비밀번호</CustomTypography>
                                <TextField
                                    id="password"
                                    variant="outlined"
                                    size="small"
                                    type="password"
                                    placeholder="8~16자리 영문, 숫자"
                                    autoComplete="off"
                                    fullWidth
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
                                    fullWidth
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
                                <CustomTypography>이메일</CustomTypography>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    // disabled={checkAuthNum}
                                    placeholder="이메일 형식을 지켜주세요"
                                    fullWidth
                                    sx={{ width: '70%' }}
                                    color={checkEmail ? 'primary' : 'error'}
                                    onChange={(e) => {
                                        onChange(setEmail, email, e);
                                    }}
                                />

                                <CustomBtn
                                    variant="contained"
                                    // disabled={checkAuthNum}
                                    sx={{ marginLeft: '0.5rem' }}
                                    onClick={onClickAuth}
                                    disabled={checkEmail ? false : true}
                                >
                                    인증
                                </CustomBtn>
                                {/* <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                이미 등록된 이메일입니다.
                            </Typography> */}
                            </div>
                            <div style={{ paddingTop: '0.5rem' }}>
                                {checkAuthNum ? (
                                    <>
                                        {/* <Typography sx={{ fontSize: '16px', mb: 0.5 }}>인증번호를 입력해주세요</Typography> */}
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            placeholder="인증번호"
                                            sx={{ width: '70%' }}
                                        />
                                        <CustomBtn variant="contained" sx={{ marginLeft: '0.5rem' }}>
                                            확인
                                        </CustomBtn>
                                    </>
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <CustomBtn
                                variant="contained"
                                type="submit"
                                sx={{ width: '100%', marginTop: '1rem' }}
                                onClick={() => {
                                    onSignUp();
                                }}
                            >
                                회원가입
                            </CustomBtn>
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
                            <Typography sx={{ ':hover': { fontWeight: 'bold' } }}>
                                <NavLink
                                    to={`/login`}
                                    style={{ textDecoration: 'none', color: '#969696', fontSize: '0.875rem' }}
                                >
                                    로그인
                                </NavLink>
                            </Typography>
                        </div>
                    </div>
                </Card>
            </Background>
        </>
    );
};

export default Register;

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
    height: 42rem;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    overflow: auto;
`;

const RegisterTitle = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 24px;
    text-align: center;
`;

const CustomTypography = styled(Typography)`
    margin: auto;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
`;

const CustomBtn = styled(Button)`
    background-color: #6ea5f8;
    color: white;
    box-shadow: none;
    :hover {
        box-shadow: none;
    }
`;
