import { Avatar, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userImageState, userInfoState } from 'store/user';
import styled from 'styled-components';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
}

const UserInfo = () => {
    const userInfo = useRecoilValue(userInfoState);
    const userImage = useRecoilValue(userImageState);
    const { nickName }: userInfos = userInfo;

    return (
        <EditorUserInfoBox>
            {userInfo && (
                <>
                    <UserAvatar src={userImage} />
                    <UserTypography>{nickName}</UserTypography>
                </>
            )}
        </EditorUserInfoBox>
    );
};

export default UserInfo;

const EditorUserInfoBox = styled.div`
    display: flex;
    align-items: center;
    padding-top: 1rem;
    margin-bottom: 0.5rem;
`;

const UserAvatar = styled(Avatar)`
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    margin-right: 0.3rem;
`;

const UserTypography = styled(Typography)`
    font-size: 1.2rem;
    font-weight: medium;
`;
