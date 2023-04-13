import { Typography } from '@mui/material';
import { changeUserInfoAxios } from 'api/auth';
import { notifyError } from 'utils/notify';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'store/user';
import styled from 'styled-components';
import { Button } from 'components/common';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
    profileImage?: string;
}

interface UserInfoInputProps {
    label: string;
    value?: string;
    id: string;
    placeholder: string;
}

const UserInfoInput = ({ label, value, id, placeholder }: UserInfoInputProps) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { userId, nickName }: userInfos = userInfo;
    const [userForm, serUserForm] = useState({ [id]: value });
    const [password, setPassword] = useState('');
    const [modify, setModify] = useState(true);

    const changeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        serUserForm({ ...userForm, [id]: value });
    };

    const handleModifyUserInfo = () => {
        if (modify === false) {
            changeUserInfoAxios('newNickName', userForm[id], userId, password).then((res) => {
                if (res?.data === 'success') {
                    setUserInfo({ ...userInfo, ...userForm });
                } else {
                    notifyError('비밀번호를 확인해주세요');
                    serUserForm({ ...userForm, nickName });
                }
            });
        }
        setModify(!modify);
    };

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <CustomTypography>{label}</CustomTypography>
            <ProfileInput
                id={id}
                disabled={modify}
                value={userForm[id] || ''}
                onChange={changeUserInfo}
                placeholder={placeholder}
                $marginBottom={!modify ? '0.5rem' : ''}
            />
            <ModifyButton onClick={handleModifyUserInfo} $marginBottom={!modify ? '0.5rem' : ''}>
                {modify ? '수정' : '확인'}{' '}
            </ModifyButton>
            {!modify ? (
                <ProfileInput
                    id={password}
                    value={password}
                    type="password"
                    onChange={handleChangePassword}
                    autoComplete="off"
                    placeholder="비밀번호를 입력해주세요"
                />
            ) : null}
        </>
    );
};

export default UserInfoInput;

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

interface ModifyButtonProps {
    $marginBottom?: string;
}

const ModifyButton = styled(Button)<ModifyButtonProps>`
    border: 1px solid #eaeaea;
    font-weight: bold;
    margin-left: 0.5rem;
    margin-bottom: ${(props) => (props.$marginBottom ? `${props.$marginBottom}` : '0')};
`;
