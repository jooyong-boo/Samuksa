import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'store/user';
import styled from 'styled-components';

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
    const [userForm, serUserForm] = useState({ [id]: value });

    const [modify, setModify] = useState(true);
    console.log(userForm);
    const changeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        serUserForm({ ...userForm, [id]: value });
    };

    const handleModifyUserInfo = () => {
        if (modify === false) {
            setUserInfo({ ...userInfo, ...userForm });
        }
        setModify(!modify);
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
            />
            <ModifyButton onClick={handleModifyUserInfo}>{modify ? '수정' : '확인'}</ModifyButton>
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
    color: black;
    margin-left: 0.5rem;
    margin-bottom: ${(props) => (props.$marginBottom ? `${props.$marginBottom}` : '0')};
`;
