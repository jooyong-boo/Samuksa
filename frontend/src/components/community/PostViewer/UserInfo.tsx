import { Avatar, Typography } from '@mui/material';
import styled from 'styled-components';
import timeForToday from 'utils/TimeForToday';

interface IProps {
    profileImage: string;
    nickName: string;
    createdAt: string;
}

const UserInfo = ({ ...props }: IProps) => {
    const { profileImage, nickName, createdAt } = props;
    return (
        <CommentUserInfoDiv>
            <CommentAvatar src={profileImage} />
            <CommentUserInfoBox>
                <CommentUserInfoText color={'#4B5563'} fontWeight={'500'}>
                    {nickName}
                </CommentUserInfoText>
                <CommentUserInfoText color={'#979797'}>{timeForToday(createdAt)}</CommentUserInfoText>
            </CommentUserInfoBox>
        </CommentUserInfoDiv>
    );
};

const CommentUserInfoDiv = styled.div`
    display: flex;
    align-items: center;
`;

const CommentAvatar = styled(Avatar)`
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
`;

const CommentUserInfoBox = styled.div`
    margin: 1rem 0;
`;

interface CommentUserInfoTextProps {
    color: string;
    fontWeight?: string;
}

const CommentUserInfoText = styled(Typography)<CommentUserInfoTextProps>`
    color: ${(props) => `${props.color}`};
    font-weight: ${(props) => `${props.fontWeight}`};
`;

export default UserInfo;
