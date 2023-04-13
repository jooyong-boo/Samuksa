import { Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { changeUserInfoAxios } from '../../api/auth';
import { userInfoState } from 'store/user';
import { useState } from 'react';
import UserImage from './Profile/UserImage';
import UserInfoInput from './Profile/UserInfoInput';
import WithDrawalButton from './Profile/WithDrawalButton';
import { notifyError, notifySuccess } from 'utils/notify';
import { Button } from 'components/common';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
    profileImage?: string;
}

const Profile = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { userId, nickName, email, profileImage }: userInfos = userInfo;
    const [passwordModify, setPasswordModify] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleClickPassword = () => {
        if (!passwordModify) {
            changeUserInfoAxios('newPassword', newPassword, userId, currentPassword).then((res) => {
                if (res?.data === 'success') {
                    setCurrentPassword('');
                    setNewPassword('');
                    notifySuccess('비밀번호 변경 완료');
                } else {
                    notifyError('비밀번호를 확인해주세요');
                    return;
                }
            });
        }
        setPasswordModify(!passwordModify);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(e.target.value);
    };

    const handleChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    return (
        <Background>
            <Card>
                <ProfileContainer>
                    <TitleTypography>프로필</TitleTypography>
                    <UserInfoDiv>
                        <UserImage />
                        <ModifyDiv>
                            <CustomTypography>아이디</CustomTypography>
                            <ProfileInput disabled={true} value={userId || ''} />
                        </ModifyDiv>
                        <ModifyDiv>
                            <CustomTypography>비밀번호</CustomTypography>
                            <ProfileInput
                                $marginBottom={'0.5rem'}
                                disabled={passwordModify}
                                value={currentPassword}
                                onChange={handleChangePassword}
                                placeholder="현재 비밀번호"
                                autoComplete="new-password"
                                type="password"
                            />
                            <ModifyButton $marginBottom={'0.5rem'} onClick={handleClickPassword}>
                                {passwordModify ? '수정' : '확인'}
                            </ModifyButton>
                            {passwordModify ? null : (
                                <ProfileInput
                                    $marginBottom={'0.5rem'}
                                    placeholder="새 비밀번호"
                                    autoComplete="new-password"
                                    value={newPassword}
                                    onChange={handleChangeNewPassword}
                                    type="password"
                                />
                            )}
                        </ModifyDiv>

                        <ModifyDiv>
                            <UserInfoInput
                                label="닉네임"
                                value={nickName}
                                id="nickName"
                                placeholder="3~9자 한글 또는 영문"
                            />
                        </ModifyDiv>
                        <ModifyDiv>
                            <CustomTypography>이메일</CustomTypography>
                            <ProfileInput $marginBottom={'0.5rem'} disabled={true} value={email} />
                        </ModifyDiv>
                        <WithDrawalButton />
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
    padding-top: 50px;
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
    margin-left: 0.5rem;
    margin-bottom: ${(props) => (props.$marginBottom ? `${props.$marginBottom}` : '0')};
`;
