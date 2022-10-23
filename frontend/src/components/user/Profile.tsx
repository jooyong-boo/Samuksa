import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { changeUserInfo, getWithdrawal } from '../../api/auth';
import { userInfoState } from 'store/user';
import { useEffect, useState } from 'react';
import UserImage from './Profile/UserImage';
import UserInfoInput from './Profile/UserInfoInput';
import WithDrawalButton from './Profile/WithDrawalButton';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
    profileImage?: string;
}

const Profile = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { userId, nickName, email, profileImage }: userInfos = userInfo;
    const [userEmail, setEmail] = useState('');
    const [emailModify, setEmailModify] = useState(true);
    // console.log(userInfo);
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

    const handleModifyEmail = () => {
        if (emailModify === false) {
            setUserInfo({ ...userInfo, email: userEmail });
        }
        setEmailModify(!emailModify);
    };

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    useEffect(() => {
        setEmail(email || '');
    }, [userInfo]);

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
                            <UserInfoInput
                                label="닉네임"
                                value={nickName}
                                id="nickName"
                                placeholder="3~9자 한글 또는 영문"
                            />
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
                        <WithDrawalButton />
                        {/* <Button variant="outlined" onClick={withdrawal}>
                            회원 탈퇴
                        </Button> */}
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
