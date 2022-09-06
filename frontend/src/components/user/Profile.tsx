import { Avatar, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userImageState, userInfoSelector, userInfoState } from '../../store/user';
import { getWithdrawal } from '../../api/auth';
import React, { useEffect, useRef, useState } from 'react';
import Loading from '../common/Loading';
import imageCompression from 'browser-image-compression';

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
    height: 80vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    /* justify-content: center; */
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgb(225, 225, 225);
`;

const Profile = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [image, setImage] = useRecoilState<any>(userImageState);
    const fileInput = useRef<HTMLInputElement | null>(null);
    const { userId, userNickName, userEmail }: userInfos = userInfo;
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [nicknameModify, setNicknameModify] = useState(true);
    const [emailModify, setEmailModify] = useState(true);

    const navigate = useNavigate();

    interface userInfos {
        userId?: string;
        userNickName?: string;
        userEmail?: string;
    }

    const withdrawal = () => {
        let confirmWithdrawal = window.confirm('정말 탈퇴하시겠어요?');
        if (confirmWithdrawal) {
            // getWithdrawal();
            alert('탈퇴 완료');
            navigate('/');
        } else {
            return;
        }
    };

    // 이미지 업로드
    const onChange = (e: any) => {
        const value = e?.target?.files[0];
        if (value) {
            setImage(() => value);
        } else {
            //업로드 취소할 시
            setImage('/broken-image.jpg');
            return;
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        actionImgCompress(value)
            .then((result: File) => {
                reader.readAsDataURL(result);
            })
            .then(() => {
                reader.onload = () => {
                    const base64data = reader.result;
                    if (reader.readyState === 2) {
                        setImage(base64data);
                        console.log(base64data);
                    }
                };
            });
    };

    // 이미지 압축
    const actionImgCompress = async (fileSrc: any) => {
        console.log('압축 시작');

        const options = {
            maxSizeMb: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(fileSrc, options);
            console.log(compressedFile);
            return compressedFile;
        } catch (error) {
            console.log(error);
        }
    };

    const handleModifyNickname = () => {
        if (nicknameModify === false) {
            setUserInfo({ ...userInfo, userNickName: nickname });
        }
        setNicknameModify(!nicknameModify);
    };

    const handleModifyEmail = () => {
        if (emailModify === false) {
            setUserInfo({ ...userInfo, userEmail: email });
        }
        setEmailModify(!emailModify);
    };

    const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(e.target.value);
    };

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    useEffect(() => {
        setNickname(userNickName || '');
        setEmail(userEmail || '');
    }, [userInfo]);

    return (
        <Background>
            <Card>
                <div style={{ width: '90%', height: '100%' }}>
                    <Typography
                        sx={{
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            borderBottom: '1px solid #EAEAEA',
                            padding: '24px',
                            textAlign: 'center',
                        }}
                    >
                        프로필
                    </Typography>
                    <div style={{ height: '100%', paddingTop: '24px' }}>
                        <div
                            style={{
                                height: '80%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-evenly',
                            }}
                        >
                            <div>
                                <ProfileAvatar
                                    src={String(image)}
                                    onClick={() => {
                                        fileInput.current?.click();
                                    }}
                                />
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/jpg,image/png,image/jpeg"
                                    name="profile_img"
                                    onChange={onChange}
                                    ref={fileInput}
                                />
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        fileInput.current?.click();
                                    }}
                                >
                                    이미지 변경
                                </Button>
                            </div>
                            <ModifyDiv>
                                <CustomTypography>아이디</CustomTypography>
                                <ProfileInput disabled={true} value={userId || ''} />
                            </ModifyDiv>

                            <ModifyDiv>
                                <CustomTypography>닉네임</CustomTypography>
                                <ProfileInput
                                    disabled={nicknameModify}
                                    value={nickname || ''}
                                    onChange={changeNickname}
                                />
                                <ModifyButton onClick={handleModifyNickname}>
                                    {nicknameModify ? '수정' : '확인'}
                                </ModifyButton>
                            </ModifyDiv>
                            <ModifyDiv>
                                <CustomTypography>이메일</CustomTypography>
                                <ProfileInput disabled={emailModify} value={email || ''} onChange={changeEmail} />
                                <ModifyButton onClick={handleModifyEmail}>{emailModify ? '수정' : '확인'}</ModifyButton>
                            </ModifyDiv>
                            <Button variant="outlined" onClick={withdrawal}>
                                회원 탈퇴
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </Background>
    );
};

export default Profile;

const CustomTypography = styled(Typography)`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.3rem;
    text-align: left;
    width: 100%;
`;

const ProfileAvatar = styled(Avatar)`
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        opacity: 0.8;
        transition: all 0.3s;
    }
`;

const ProfileInput = styled.input`
    padding: 1rem;
    flex-grow: 1;
`;

const ModifyDiv = styled.div`
    width: 90%;
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
`;

const ModifyButton = styled(Button)`
    border: 1px solid #eaeaea;
    font-weight: bold;
    color: black;
    margin-left: 0.5rem;
`;
