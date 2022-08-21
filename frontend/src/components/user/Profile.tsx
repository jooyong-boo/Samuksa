import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../store/user';
import { withdrawal } from '../../api/auth';
import { useRef, useState } from 'react';
import { render } from '@testing-library/react';
import Loading from '../common/Loading';

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
    width: 25rem;
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
    const userInfo = useRecoilValue(userInfoState);
    const [image, setImage] = useState<any>('/broken-image.jpg');
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
            // withdrawal();
            alert('탈퇴 완료');
            navigate('/');
        } else {
            return;
        }
    };

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
        reader.onload = () => {
            if (reader.readyState === 1) {
                return <Loading />;
            }
            if (reader.readyState === 2) {
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(value);
    };
    console.log(image);

    return (
        <Background>
            <Card>
                <div style={{ width: '100%', height: '100%' }}>
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
                                    sx={{ width: '6rem', height: '6rem' }}
                                    onClick={() => {
                                        fileInput.current?.click();
                                    }}
                                />
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    accept="image/jpg,impge/png,image/jpeg"
                                    name="profile_img"
                                    onChange={onChange}
                                    ref={fileInput}
                                />
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
                            <Button variant="outlined">정보 수정</Button>
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
