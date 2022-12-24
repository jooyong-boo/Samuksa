import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo, login } from '../../api/auth';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInfoState, userLoginFormState } from '../../store/user';
import KakaoLogin from './KakaoLogin';
import { notifyError, notifySuccess } from 'utils/notify';
import InputWithLabel from './Login/InputWithLabel';

const Login = () => {
    const navigate = useNavigate();

    const userInfo = useSetRecoilState(userInfoState);

    const [userForm, setUserForm] = useRecoilState(userLoginFormState);
    const { userId, password } = userForm;
    const [idSaveStatus, setIdSaveStatus] = useState<boolean>(false);

    const getLogin = async () => {
        if (userForm.userId === '') {
            notifyError('아이디를 입력해주세요');
            return;
        } else if (userForm.password === '') {
            notifyError('비밀번호를 입력해주세요');
            return;
        }
        let { userId, password } = userForm;
        login({ userId, password })
            .then((res: any) => {
                if (res.status !== 200) {
                    throw res;
                }
                if (res.status === 200) {
                    navigate('/');
                    setUserForm({ ...userForm, password: '' });
                }
                if (idSaveStatus) {
                    localStorage.setItem('id', userId);
                }
            })
            .then(() => {
                getUserInfo().then((res: any) => {
                    if (res.code === 500) {
                        return;
                    }
                    if (res.data.nickName) {
                        notifySuccess(`${res.data.nickName}님 반갑습니다!`);
                        userInfo(res.data);
                    }
                });
            })
            .catch((e) => {
                setUserForm({ ...userForm, password: '' });
                if (e.code === 'ERR_NETWORK') {
                    notifyError('서버와의 연결이 끊겼습니다.');
                }
                if (e.code === 'ERR_BAD_REQUEST') {
                    if (e.response.data.message === '아이디가 없습니다') {
                        notifyError('존재하지 않는 아이디입니다.');
                    } else if (e.response.data.message === 'Unauthorized') {
                        notifyError(
                            <p>
                                아이디 또는 비밀번호가 틀립니다.
                                <br /> 입력하신 내용을 다시 확인해주세요.
                            </p>,
                        );
                    }
                }
            });
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIdSaveStatus(e.target.checked);
        if (e.target.checked) {
            let { userId } = userForm;
            localStorage.setItem('id', userId);
        } else {
            localStorage.removeItem('id');
        }
    };

    const handleEnterLogin = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            getLogin();
        }
    };

    useEffect(() => {
        if (localStorage.getItem('id')) {
            setUserForm({ ...userForm, userId: localStorage.getItem('id') || '' });
            setIdSaveStatus(true);
        }
    }, []);

    return (
        <Background>
            <Card>
                <LoginTitle>로그인</LoginTitle>
                <LoginSubTitle>원활한 서비스 이용을 위해 로그인해주세요.</LoginSubTitle>
                <LoginBox>
                    <InputWithLabel
                        label="아이디"
                        id="userId"
                        type="string"
                        value={userId}
                        handleEnterLogin={handleEnterLogin}
                    />
                    <PasswordDiv>
                        <InputWithLabel
                            label="비밀번호"
                            id="password"
                            type="password"
                            value={password}
                            handleEnterLogin={handleEnterLogin}
                        />
                    </PasswordDiv>
                    <IdSaveAndLoginBox>
                        <SaveIdTypography>
                            <SaveIdCheckbox type="checkbox" checked={idSaveStatus} onChange={handleCheckbox} />
                            아이디 저장
                        </SaveIdTypography>
                        <CustomNavLink to={`/register`}>계정찾기</CustomNavLink>
                    </IdSaveAndLoginBox>
                    <LoginBtnDiv>
                        <LoginBtn variant="contained" type="submit" onClick={getLogin}>
                            로그인
                        </LoginBtn>
                        <Typography>
                            <AskingSpan>아직 회원이 아니신가요?</AskingSpan>
                            <CustomNavLink to={`/register`}>회원가입</CustomNavLink>
                        </Typography>
                    </LoginBtnDiv>
                    <SNSTypography>SNS로그인</SNSTypography>
                    <KakaoLogin />
                </LoginBox>
            </Card>
        </Background>
    );
};

export default Login;

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
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    padding: 5rem 0;
    flex-direction: column;
    align-items: center;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    text-align: center;
    overflow: auto;
`;

const LoginTitle = styled(Typography)`
    width: 60%;
    height: 10%;
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 24px;
    text-align: center;
`;

const LoginSubTitle = styled(Typography)`
    margin-top: 1rem;
    font-weight: medium;
`;

const LoginBox = styled.div`
    width: 60%;
    height: 70%;
    margin: auto;
`;

const PasswordDiv = styled.div`
    padding-top: 1rem;
`;

const IdSaveAndLoginBox = styled.div`
    width: 100%;
    height: 20px;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
`;

const SaveIdCheckbox = styled.input`
    width: 1rem;
    height: 1rem;
    background-color: white;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
    vertical-align: middle;
    margin-right: 0.2rem;
    cursor: pointer;
`;

const SaveIdTypography = styled(Typography)`
    font-size: 0.8rem;
    color: #969696;
`;

const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.main};
    &:hover {
        font-weight: bold;
    }
`;

const LoginBtnDiv = styled.div`
    width: 100%;
    margin: 1rem auto;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 0.5rem;
`;

const LoginBtn = styled(Button)`
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    box-shadow: none;
    width: 100%;
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

const SNSTypography = styled(Typography)`
    margin-bottom: 0.5rem;
    color: #4b5563;
    font-size: 0.875rem;
    font-weight: medium;
`;
