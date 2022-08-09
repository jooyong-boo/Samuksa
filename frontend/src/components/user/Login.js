import { Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserInfo, login } from '../../api/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import kakaoBtn from '../assets/img/kakaoLoginBtn.png';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userIdState, userInfoState } from '../../store/user';

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
    const notifyError = (text) =>
        toast.error(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const notifySuccess = (text) =>
        toast.success(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    const dismissAll = () => toast.dismiss();

    const navigate = useNavigate();

    const userInfo = useSetRecoilState(userInfoState);

    const [userId, setUserId] = useRecoilState(userIdState);
    const [passwd, setPasswd] = useState('');
    const [idSaveStatus, setIdSaveStatus] = useState('');

    const getLogin = async () => {
        login({ userId, passwd })
            .then((res) => {
                console.log(res);
                if (res.message === 'PASSWORD NOT MATCH') {
                    dismissAll();
                    notifyError('비밀번호가 틀립니다.');
                } else if (res.message === 'ID REGISTERED') {
                    dismissAll();
                    notifyError('아이디가 틀립니다.');
                } else if (res) {
                    navigate('/');
                }
                if (idSaveStatus) {
                    localStorage.setItem('id', userId);
                }
            })
            .then(() => {
                getUserInfo().then((res) => {
                    notifySuccess(`${res.userNikName}님 반갑습니다!`);
                    userInfo(res);
                });
            })
            .catch((e) => {
                console.log(e);
                notifyError(e);
            });
    };

    const handleChangeUserId = (e) => {
        setUserId(e.target.value);
    };

    const handleChangePasswd = (e) => {
        setPasswd(e.target.value);
    };

    const handleCheckbox = (e) => {
        setIdSaveStatus(e.target.checked);
        if (e.target.checked) {
            localStorage.setItem('id', userId);
        } else {
            localStorage.removeItem('id');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('id')) {
            setUserId(localStorage.getItem('id'));
            setIdSaveStatus(true);
        }
    });

    return (
        <>
            {/* <ToastContainer
                toastStyle={{
                    backgroundColor: '#F5F5F5',
                    color: '#575757',
                }}
            /> */}
            <Background>
                <Card>
                    <div style={{ width: '100%', textAlign: 'center' }}>
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
                                id="id"
                                variant="outlined"
                                size="small"
                                placeholder="아이디 입력"
                                onChange={handleChangeUserId}
                                value={userId}
                                sx={{}}
                            />
                        </div>
                        <div style={{ paddingTop: '24px' }}>
                            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', mb: 0.5 }}>비밀번호</Typography>
                            <TextField
                                id="password"
                                variant="outlined"
                                type="password"
                                size="small"
                                placeholder="비밀번호 입력"
                                autoComplete="off"
                                onChange={handleChangePasswd}
                            />
                        </div>
                        <div
                            style={{
                                display: 'inline-flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1.5rem 0',
                                height: '20px',
                                width: '40%',
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
                                        cursor: 'pointer',
                                    }}
                                    checked={idSaveStatus}
                                    onChange={handleCheckbox}
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
                                    width: '40%',
                                    marginBottom: '0.5rem',
                                    ':hover': { boxShadow: 'none' },
                                }}
                                onClick={getLogin}
                            >
                                로그인
                            </Button>
                        </div>
                        <div>
                            <img src={kakaoBtn} width="180" alt="카카오 로그인 버튼" />
                        </div>
                    </div>
                </Card>
            </Background>
        </>
    );
};

export default Login;
