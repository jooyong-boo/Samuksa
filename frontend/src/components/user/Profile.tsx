import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userImageState, userInfoSelector, userInfoState } from '../../store/user';
import { getWithdrawal } from '../../api/auth';
import { useRef, useState } from 'react';
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
    // const userInfo = useRecoilValue(userInfoState);
    const userInfo = useRecoilValue(userInfoSelector);
    const [image, setImage] = useRecoilState<any>(userImageState);
    const fileInput = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();

    interface userInfos {
        userId?: string;
        userNikName?: string;
        userEmail?: string;
    }
    const { userId, userNikName, userEmail }: userInfos = userInfo;

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
                                <Avatar
                                    src={String(image)}
                                    sx={{ width: '6rem', height: '6rem', cursor: 'pointer' }}
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
                            <div>
                                <Typography>아이디</Typography>
                            </div>
                            <div style={{ border: '1px solid rgb(225, 225, 225)', padding: '1rem', width: '90%' }}>
                                <Typography>{userId}</Typography>
                            </div>
                            <div>
                                <Typography>닉네임</Typography>
                            </div>
                            <div style={{ border: '1px solid rgb(225, 225, 225)', padding: '1rem', width: '90%' }}>
                                <Typography>{userNikName}</Typography>
                            </div>
                            <div>
                                <Typography>이메일</Typography>
                            </div>
                            <div style={{ border: '1px solid rgb(225, 225, 225)', padding: '1rem', width: '90%' }}>
                                <Typography>{userEmail}</Typography>
                            </div>
                            <Button variant="outlined" sx={{ margin: '10px 0' }}>
                                정보 수정
                            </Button>
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
