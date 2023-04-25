import { Typography } from '@mui/material';
import { useCreateReply } from 'api/hooks/post/useCreateReply';
import { useEditReply } from 'api/hooks/post/useEditReply';
import { useState } from 'react';
import styled from 'styled-components';
import CommentMenu from './CommentMenu';
import EditAndReplyButton from './EditAndReplyButton';
import UserInfo from '../../common/UserInfo';

interface ReplyProps {
    idx: number;
    avatarUrl: string;
    nickName: string;
    receiverNickName: string;
    content: string;
    createdAt: string;
    modifiedAt: string;
}

interface UserInfoProps {
    userId: string;
    nickName: string;
    email: string;
    profileImage: string;
}

interface IProps {
    userInfo: UserInfoProps;
    item: ReplyProps;
    titleIdx: string;
    commentIdx: number;
}

const Reply = ({ userInfo, item, titleIdx, commentIdx }: IProps) => {
    const [newComment, setNewComment] = useState('');
    const [newReply, setNewReply] = useState('');
    const [commentModify, setCommentModify] = useState(false);
    const [commentReply, setCommentReply] = useState(false);
    const { nickName: infoNickname } = userInfo;
    const { idx, avatarUrl, nickName, receiverNickName, content, createdAt } = item;
    const { mutate: createReply } = useCreateReply(commentIdx, newReply, titleIdx, nickName, userInfo);
    const { mutate: modifyReply } = useEditReply(commentIdx, newComment, titleIdx, idx!);

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleChangeCommentModify = () => {
        setCommentReply(false);
        setCommentModify(!commentModify);
    };

    const handleCommentDelete = () => {
        // deleteComment();
    };

    const handleCommentModify = () => {
        if (newComment.length > 0) {
            handleChangeCommentModify();
            modifyReply();
        }
    };

    const handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewReply(e.target.value);
    };

    const handleOpenReply = () => {
        setCommentModify(false);
        setCommentReply(!commentReply);
    };

    const handleCreateReply = () => {
        if (newReply.length > 0) {
            handleOpenReply();
            createReply();
            setNewReply('');
        }
    };
    return (
        <Container key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <UserInfo profileImage={avatarUrl} nickName={nickName} createdAt={createdAt} />
                <FlexBox>
                    {/* <RecommendBtn /> */}
                    {infoNickname ? (
                        <CommentMenu
                            infoNickname={infoNickname}
                            nickName={nickName}
                            handleEdit={handleChangeCommentModify}
                            handleDelete={handleCommentDelete}
                            handleReply={handleOpenReply}
                        />
                    ) : null}
                </FlexBox>
            </div>
            {receiverNickName ? (
                <ReceiverInfoBox>
                    <ReceiverInfoText>@{receiverNickName}</ReceiverInfoText>
                </ReceiverInfoBox>
            ) : null}
            <CommentText>{content}</CommentText>
            {infoNickname === nickName && commentModify ? (
                <EditAndReplyButton
                    value={content}
                    onChange={handleChangeComment}
                    onClickCancel={handleChangeCommentModify}
                    onClickRegister={handleCommentModify}
                    disable={newComment}
                    placeholder="댓글을 적어주세요"
                />
            ) : null}
            {commentReply ? (
                <EditAndReplyButton
                    value={newReply}
                    onChange={handleChangeReply}
                    onClickCancel={handleOpenReply}
                    onClickRegister={handleCreateReply}
                    disable={newReply}
                    placeholder="답글을 적어주세요"
                />
            ) : null}
        </Container>
    );
};

const Container = styled.div`
    justify-content: space-between;
    margin-left: 2rem;
    padding-left: 2rem;
    border-left: 2px solid #e5e7eb;
    border-bottom: 1px dashed ${({ theme }) => theme.colors.gray};
    &:last-child {
        border-bottom: none;
    }
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
    @media all and (max-width: 500px) {
        flex-direction: column-reverse;
    }
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
    padding-bottom: 1rem;
    font-size: 1.125rem;
`;

export default Reply;
