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
                    <div
                        style={{
                            marginLeft: '2rem',
                            paddingLeft: '2rem',
                            borderLeft: '2px solid #A7A7A7',
                            marginBottom: '1rem',
                        }}
                        key={idx}
                    >
                        <UserInfo profileImage={avatarUrl} nickName={nickName} createdAt={createdAt} />
                        <CommentText>{content}</CommentText>
                    </div>
                );
            })}
        </>
    );
};

const CommentText = styled(Typography)`
    color: rgb(55 65 81);
    margin-bottom: 1rem;
`;

export default Reply;
