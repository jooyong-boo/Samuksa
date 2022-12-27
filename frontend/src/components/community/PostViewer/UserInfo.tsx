import { Avatar, Typography } from '@mui/material';
import styled from 'styled-components';
import { randomNickname } from 'utils/randomNickname';
import timeForToday from 'utils/TimeForToday';
import { getRandomNumber } from '../PostViewer';

interface IProps {
    userId: string;
    id: string;
    profileImage: string;
    nickName: string;
    createdAt: string;
}

const UserInfo = ({ ...props }: IProps) => {
    const { userId, id, profileImage, nickName, createdAt } = props;
    return (
        <CommentUserInfoDiv>
            {userId === id ? (
                <CommentAvatar src={profileImage} />
            ) : (
                <CommentAvatar src={`https://randomuser.me/api/portraits/men/${getRandomNumber(1, 98)}.jpg`} />
            )}
            <CommentUserInfoBox>
                <CommentUserInfoText color={'#4B5563'} fontWeight={'500'}>
                    {nickName ? nickName : randomNickname()}
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
