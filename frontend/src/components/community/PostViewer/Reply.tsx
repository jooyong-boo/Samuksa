import { Typography } from '@mui/material';
import styled from 'styled-components';
import UserInfo from './UserInfo';

interface ReplyProps {
    idx: number;
    avatarUrl: string;
    nickName: string;
    receiverNickName: string;
    content: string;
    createdAt: string;
    modifiedAt: string;
}

interface IProps {
    command: ReplyProps[];
}

const Reply = ({ command }: IProps) => {
    console.log(command);
    return (
        <>
            {command.map((item: ReplyProps, i: number) => {
                const { idx, avatarUrl, nickName, receiverNickName, content, createdAt, modifiedAt } = item;
                return (
                    <Container key={idx}>
                        <UserInfo profileImage={avatarUrl} nickName={nickName} createdAt={createdAt} />
                        {receiverNickName ? (
                            <ReceiverInfoBox>
                                <ReceiverInfoText>@{receiverNickName}</ReceiverInfoText>
                            </ReceiverInfoBox>
                        ) : null}
                        <CommentText>{content}</CommentText>
                    </Container>
                );
            })}
        </>
    );
};

const Container = styled.div`
    margin-left: 2rem;
    padding-left: 2rem;
    border-left: 2px solid #a7a7a7;
    margin-bottom: 1rem;
`;

const ReceiverInfoBox = styled.div`
    display: inline-block;
    background-color: #eaecef;
    padding: 0.3rem 0.5rem;
    border-radius: 5px;
`;

const ReceiverInfoText = styled.span`
    color: #7863d2;
    font-weight: 700;
    font-size: 0.97rem;
`;

const CommentText = styled(Typography)`
    color: rgb(55 65 81);
    margin-bottom: 1rem;
    font-size: 1.125rem;
`;

export default Reply;
