import { Avatar, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userImageState, userInfoState } from '../../store/user';
import { changeUserImage, changeUserInfo, getWithdrawal } from '../../api/auth';
import { useEffect, useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';
import handlingDataForm from '../utils/handlingDataForm';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
    profileImage?: string;
}

const Profile = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [image, setImage] = useRecoilState<string | ArrayBuffer | null>(userImageState);
    const fileInput = useRef<HTMLInputElement | null>(null);
    const { userId, nickName, email, profileImage }: userInfos = userInfo;
    const [nickname, setNickname] = useState('');
    const [userEmail, setEmail] = useState('');
    const [nicknameModify, setNicknameModify] = useState(true);
    const [emailModify, setEmailModify] = useState(true);
    console.log(userInfo);
    const navigate = useNavigate();

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
        console.log(e.target.files);
        console.log(value);
        if (value) {
            setImage(() => value);
        } else {
            //업로드 취소할 시
            setImage('/broken-image.jpg');
            return;
        }
        const formData = new FormData();
        formData.append('image', value);

        changeUserImage(formData);
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
                        // console.log(base64data);
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
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                // 변환 완료!
                const base64data = reader.result;
                console.log(reader);

                // formData 만드는 함수
                // handlingDataForm(base64data);
            };
            return compressedFile;
        } catch (error) {
            console.log(error);
        }
    };

    const handleModifyNickname = () => {
        if (nicknameModify === false) {
            setUserInfo({ ...userInfo, nickName: nickname });
            changeUserInfo('newNickName', nickname);
        }
        setNicknameModify(!nicknameModify);
    };

    const handleModifyEmail = () => {
        if (emailModify === false) {
            setUserInfo({ ...userInfo, email: userEmail });
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
        setNickname(nickName || '');
        setEmail(email || '');
    }, [userInfo]);

    return (
        <Background>
            <Card>
                <ProfileContainer>
                    <TitleTypography>프로필</TitleTypography>
                    <UserInfoDiv>
                        <div>
                            <ProfileAvatar
                                src={String(image)}
                                onClick={() => {
                                    fileInput.current?.click();
                                }}
                            />
                            <ImageInput
                                type="file"
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
                                placeholder="2~9자 한글 또는 영문"
                            />
                            <ModifyButton onClick={handleModifyNickname}>
                                {nicknameModify ? '수정' : '확인'}
                            </ModifyButton>
                        </ModifyDiv>
                        <ModifyDiv>
                            <CustomTypography>이메일</CustomTypography>
                            <ProfileInput
                                $marginBottom={'0.5rem'}
                                disabled={emailModify}
                                value={userEmail || ''}
                                onChange={changeEmail}
                            />
                            <ModifyButton $marginBottom={'0.5rem'} onClick={handleModifyEmail}>
                                {emailModify ? '수정' : '확인'}
                            </ModifyButton>
                            {emailModify ? null : (
                                <>
                                    <ProfileInput placeholder="인증번호 입력" />
                                    <ModifyButton>확인</ModifyButton>
                                </>
                            )}
                        </ModifyDiv>
                        <Button variant="outlined" onClick={withdrawal}>
                            회원 탈퇴
                        </Button>
                    </UserInfoDiv>
                </ProfileContainer>
            </Card>
        </Background>
    );
};

export default Profile;

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
    height: 85vh;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    /* justify-content: center; */
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgb(225, 225, 225);
    overflow: auto;
`;

const ProfileContainer = styled.div`
    width: 90%;
    height: 100%;
`;

const TitleTypography = styled(Typography)`
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 1px solid #eaeaea;
    padding: 24px;
    text-align: center;
`;

const UserInfoDiv = styled.div`
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`;

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

const ImageInput = styled.input`
    display: none;
`;

interface ProfileInputProps {
    $marginBottom?: string;
}

const ProfileInput = styled.input<ProfileInputProps>`
    padding: 0.8rem;
    flex-grow: 1;
    margin-bottom: ${(props) => (props.$marginBottom ? `${props.$marginBottom}` : '0')};
`;

const ModifyDiv = styled.div`
    width: 90%;
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
`;

interface ModifyButtonProps {
    $marginBottom?: string;
}

const ModifyButton = styled(Button)<ModifyButtonProps>`
    border: 1px solid #eaeaea;
    font-weight: bold;
    color: black;
    margin-left: 0.5rem;
    margin-bottom: ${(props) => (props.$marginBottom ? `${props.$marginBottom}` : '0')};
`;
