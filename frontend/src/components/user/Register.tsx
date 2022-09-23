import { Button, Link, TextField, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { signUp, checkIdAxios, checkNickNameAxios, checkEmailAxios, checkEmailAuthAxios } from '../../api/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSetRecoilState } from 'recoil';
import { userIdState } from '../../store/user';
import { kakaoLogin, kakaoUserInfo } from '../../api/kakaoAuth';

const Register = () => {
    const navigate = useNavigate();
    const notifyError = (text: ReactElement | string) => {
        dismissAll();
        toast.warning(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    };
    const notifySuccess = (text: ReactElement | string) => {
        dismissAll();
        toast.success(text, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
        });
    };
    const dismissAll = () => toast.dismiss();

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
    const [checkEmail, setCheckEmail] = useState(true);

    // 이메일 인증번호
    const [authNum, setAuthNum] = useState('');
    const [checkAuthNum, setCheckAuthNum] = useState(true);

    const onChange = (
        change: (value: string) => void,
        check: string,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        let inputChange = e.target.value;
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
    };

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
                notifySuccess(
                    <p>
                        입력한 이메일로 인증번호를 발송했습니다.
                        <br /> 우편함을 확인해주세요
                    </p>,
                );
            } else {
                setCheckEmail(false);
            }
        });
    };

    const onClickEmailAuthCheck = () => {
        checkEmailAuthAxios({ authNum, email }).then((res) => {
            console.log(res);
            if (res?.data === 'success') {
                notifySuccess('이메일 인증완료');
                setCheckAuthNum(true);
            } else {
                notifyError('인증번호를 재확인해주세요');
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
                    <RegisterContainer>
                        <RegisterTitle>회원가입</RegisterTitle>
                        <InputAreaContainer>
                            <CustomTypography>아이디</CustomTypography>
                            <InputBox>
                                <TextField
                                    id="id"
                                    variant="outlined"
                                    size="small"
                                    placeholder="4~12자 영문, 숫자"
                                    autoComplete="off"
                                    color={checkId ? 'error' : 'primary'}
                                    sx={{ flexGrow: 1 }}
                                    onChange={(e) => {
                                        onChange(setId, id, e);
                                    }}
                                />
                                <CustomBtn variant="contained" disabled={checkId} onClick={checkOverlappingId}>
                                    중복체크
                                </CustomBtn>
                            </InputBox>
                            <>
                                {overlappingId === true ? (
                                    <PossibleStatusTypography color={'red'}>
                                        이미 존재하는 아이디입니다.
                                    </PossibleStatusTypography>
                                ) : null}
                                {overlappingId === false ? (
                                    <PossibleStatusTypography color={'green'}>
                                        사용 가능한 아이디입니다.
                                    </PossibleStatusTypography>
                                ) : null}
                            </>
                            <CustomTypography>닉네임</CustomTypography>
                            <InputBox>
                                <TextField
                                    id="nickName"
                                    variant="outlined"
                                    size="small"
                                    placeholder="2~9자 한글 또는 영문"
                                    sx={{ flexGrow: 1 }}
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
                                >
                                    중복체크
                                </CustomBtn>
                            </InputBox>
                            <>
                                {overlappingNickName === false ? (
                                    <PossibleStatusTypography color={'green'}>
                                        사용 가능한 닉네임입니다.
                                    </PossibleStatusTypography>
                                ) : null}
                                {overlappingNickName === true ? (
                                    <PossibleStatusTypography color={'red'}>
                                        이미 존재하는 닉네임입니다.
                                    </PossibleStatusTypography>
                                ) : null}
                            </>
                            <InputBox paddingTop={'1rem'} display={'block'}>
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
                            </InputBox>
                            <InputBox paddingTop={'0.5rem'} display={'block'}>
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
                            </InputBox>
                            <CustomTypography>이메일</CustomTypography>
                            <InputBox>
                                <TextField
                                    id="email"
                                    variant="outlined"
                                    size="small"
                                    placeholder="이메일 형식을 지켜주세요"
                                    fullWidth
                                    sx={{ flexGrow: 1 }}
                                    color={checkEmail ? 'error' : 'primary'}
                                    onChange={(e) => {
                                        onChange(setEmail, email, e);
                                    }}
                                />
                                <CustomBtn variant="contained" onClick={onClickEmailAuth} disabled={checkEmail}>
                                    인증
                                </CustomBtn>
                            </InputBox>
                            <InputBox paddingTop={'0.5rem'} display={'flex'}>
                                {!checkEmail ? (
                                    <>
                                        <TextField
                                            id="emailAuth"
                                            variant="outlined"
                                            size="small"
                                            autoComplete="off"
                                            placeholder="인증번호 입력"
                                            sx={{ flexGrow: 1 }}
                                            color={checkAuthNum ? 'error' : 'primary'}
                                            onChange={(e) => {
                                                onChange(setAuthNum, authNum, e);
                                            }}
                                        />
                                        <CustomBtn
                                            variant="contained"
                                            onClick={onClickEmailAuthCheck}
                                            disabled={checkAuthNum}
                                        >
                                            확인
                                        </CustomBtn>
                                    </>
                                ) : null}
                            </InputBox>
                        </InputAreaContainer>
                        <div>
                            <RegisterBtn
                                variant="contained"
                                type="submit"
                                onClick={() => {
                                    onSignUp();
                                }}
                            >
                                회원가입
                            </RegisterBtn>
                            <>
                                <Typography>
                                    <AskingSpan>이미 회원이신가요?</AskingSpan>
                                    <CustomNavLink to={`/login`}>로그인</CustomNavLink>
                                </Typography>
                            </>
                        </div>
                    </RegisterContainer>
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
    padding-top: 60px;
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

const RegisterContainer = styled.div`
    width: 70%;
    text-align: center;
`;

const InputAreaContainer = styled.div`
    width: 100%;
    text-align: left;
`;
interface InputBoxProps {
    paddingTop?: any;
    display?: any;
}
const InputBox = styled.div<InputBoxProps>`
    padding-top: ${(props) => (props.paddingTop ? `${props.paddingTop}` : '0')};
    display: ${(props) => (props.display ? `${props.display}` : 'flex')};
`;

const RegisterTitle = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 1rem;
    text-align: center;
`;

const CustomTypography = styled(Typography)`
    margin: auto;
    font-size: 1rem;
    font-weight: bold;
    margin: 0.5rem 0 0.3rem 0; ;
`;

const CustomBtn = styled(Button)`
    background-color: #0098ee;
    color: white;
    box-shadow: none;
    margin-left: 0.5rem;
    :hover {
        box-shadow: none;
    }
`;

const RegisterBtn = styled(Button)`
    width: 100%;
    margin-top: 1rem;
    background-color: #0098ee;
    color: white;
    box-shadow: none;
    margin-bottom: 0.5rem;
    :hover {
        box-shadow: none;
    }
`;

const AskingSpan = styled.span`
    color: #969696;
    font-size: 0.875rem;
    margin-right: 0.3rem;
`;

const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    font-size: 0.8rem;
    color: #0098ee;
    &:hover {
        font-weight: bold;
    }
`;

const PossibleStatusTypography = styled(Typography)`
    font-size: 0.9rem;
    font-weight: medium;
    color: ${(props) => (props.color ? `${props.color}` : 'black')};
`;
