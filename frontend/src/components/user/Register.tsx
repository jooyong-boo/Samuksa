import { Button, Checkbox, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signUp, checkIdAxios, checkNickNameAxios, checkEmailAxios, checkEmailAuthAxios } from '../../api/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from 'recoil';
import { userIdState } from '../../store/user';
import { kakaoLogin, kakaoUserInfo } from '../../api/kakaoAuth';

const Register = () => {
    const navigate = useNavigate();
    const notifyError = (text: string) =>
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const notifySuccess = (text: string) =>
        toast.success(text, {
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
    const [passwordView, setPasswordView] = useState(false);

    // 이메일
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);

    // 이메일 인증번호
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
            const passwordReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/);
            if (passwordReg.test(inputChange)) {
                change(inputChange);
                setCheckPw(false);
            } else {
                change(inputChange);
                setCheckPw(true);
            }
        }
        if (check === passwordConfirm) {
            const passwordConfirmReg = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/);
            change(inputChange);
            if (passwordConfirmReg.test(inputChange) && password === passwordConfirm) {
                setCheckPwConfirm(false);
            } else {
                setCheckPwConfirm(true);
            }
        }
        if (check === email) {
            const emailReg = new RegExp(
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            );
            if (emailReg.test(inputChange)) {
                setCheckEmail(false);
                change(inputChange);
            } else {
                setCheckEmail(true);
            }
        }
        if (check === authNum) {
            const emailAuthReg = new RegExp(/^[0-9a-zA-Z]{8}$/);
            if (emailAuthReg.test(inputChange)) {
                setCheckAuthNum(false);
                change(inputChange);
            } else {
                setCheckAuthNum(true);
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

    const onClickEmailAuth = () => {
        checkEmailAxios({ email }).then((res) => {
            console.log(res);
            if (res?.data && res?.status === 201) {
                setCheckEmail(true);
            } else {
                setCheckEmail(false);
            }
        });
        // setCheckAuthNum(true);
    };

    const onClickEmailAuthCheck = () => {
        checkEmailAuthAxios({ authNum, email }).then((res) => {
            console.log(res);
            if (res?.data === 'success') {
                setCheckAuthNum(true);
            } else {
                setCheckAuthNum(false);
            }
        });
    };

    const onSignUp = () => {
        if (id && nickName && password && email) {
            if (
                (checkId && checkNickName && checkPw && checkPwConfirm) === false &&
                checkEmail === true &&
                checkAuthNum === true
            ) {
                signUp({ id, password, nickName, email })
                    .then(() => {
                        navigate('/login');
                    })
                    .then(() => {
                        localStorage.setItem('id', id);
                        setUserId(id);
                        notifySuccess('회원가입을 축하합니다!');
                    });
            } else {
                notifyError('확인이 안된 항목이 있습니다.');
            }
        } else {
            notifyError('입력하지 않은칸이 있습니다.');
        }
    };

    const ClickViewPassword = () => {
        setPasswordView(!passwordView);
    };

    useEffect(() => {
        setOverlappingId('');
    }, [id]);

    useEffect(() => {
        setOverlappingNickName('');
    }, [nickName]);

    useEffect(() => {
        if (password !== passwordConfirm || passwordConfirm === '') {
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
                                    sx={{ marginLeft: '0.5rem', marginTop: '0.1rem' }}
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
                                    sx={{ marginLeft: '0.5rem', marginTop: '0.1rem' }}
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
                                    type={passwordView ? '' : 'password'}
                                    placeholder="8~16자리 영문, 숫자 조합"
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
                                    type={passwordView ? '' : 'password'}
                                    placeholder="비밀번호 확인"
                                    autoComplete="off"
                                    fullWidth
                                    color={checkPwConfirm ? 'error' : 'primary'}
                                    onChange={(e) => {
                                        onChange(setPasswordConfirm, passwordConfirm, e);
                                    }}
                                />
                                <Button onClick={ClickViewPassword}>
                                    {passwordView ? '비밀번호 가리기' : '비밀번호 보기'}
                                </Button>
                            </div>
                            <div style={{ paddingTop: '0.5rem' }}>
                                <CustomTypography>이메일</CustomTypography>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    placeholder="이메일 형식을 지켜주세요"
                                    fullWidth
                                    sx={{ width: '70%' }}
                                    color={checkEmail ? 'error' : 'primary'}
                                    onChange={(e) => {
                                        onChange(setEmail, email, e);
                                    }}
                                />
                                <CustomBtn
                                    variant="contained"
                                    onClick={onClickEmailAuth}
                                    disabled={checkEmail}
                                    sx={{ marginLeft: '0.5rem', marginTop: '0.1rem' }}
                                >
                                    인증
                                </CustomBtn>
                                {/* <Typography sx={{ fontSize: '0.9rem', fontWeight: 'medium', color: 'red' }}>
                                이미 등록된 이메일입니다.
                            </Typography> */}
                            </div>
                            <div style={{ paddingTop: '0.5rem' }}>
                                {checkEmail ? (
                                    <>
                                        {/* <Typography sx={{ fontSize: '16px', mb: 0.5 }}>인증번호를 입력해주세요</Typography> */}
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            placeholder="메일로 발송된 인증번호를 입력해주세요"
                                            sx={{ width: '70%' }}
                                            onChange={(e) => {
                                                onChange(setAuthNum, authNum, e);
                                            }}
                                        />
                                        <CustomBtn
                                            variant="contained"
                                            sx={{ marginLeft: '0.5rem' }}
                                            onClick={onClickEmailAuthCheck}
                                            disabled={checkAuthNum}
                                        >
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
                            <Typography>
                                <span style={{ color: '#969696', fontSize: '0.875rem', marginRight: '0.3rem' }}>
                                    이미 회원이신가요?
                                </span>
                                <Link
                                    component={NavLink}
                                    to={`/login`}
                                    sx={{
                                        textDecoration: 'none',
                                        color: '#6ea5f8',
                                        fontSize: '0.875rem',
                                        ':hover': { fontWeight: 'bold' },
                                    }}
                                >
                                    로그인
                                </Link>
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
