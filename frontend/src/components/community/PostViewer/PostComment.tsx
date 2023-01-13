import { Button, TextField, Typography } from '@mui/material';
import { useCreateReply } from 'api/hooks/post/useCreateReply';
import { useDeleteComment } from 'api/hooks/post/useDeleteComment';
import { useEditComment } from 'api/hooks/post/useEditComment';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { TiEdit } from 'react-icons/ti';
import styled from 'styled-components';
import { notifyError } from 'utils/notify';
import CommentMenu from './CommentMenu';
import EditAndReplyButton from './EditAndReplyButton';
import RecommendBtn from './RecommendBtn';
import Reply from './Reply';
import UserInfo from './UserInfo';

interface CommentProps {
    idx: number;
    avatarUrl: string;
    nickName: string;
    content: string;
    createdAt: string;
    modifiedAt: string;
    command: ReplyProps[];
}

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

interface CommentsProps {
    comment: CommentProps;
    comments: CommentProps[];
    setComments: Dispatch<SetStateAction<any>>;
    userInfo: UserInfoProps;
    titleIdx: string;
}

const PostComment = ({ setComments, comment, comments, userInfo, titleIdx }: CommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const [commentModify, setCommentModify] = useState(false);
    const [newReply, setNewReply] = useState('');
    const [commentReply, setCommentReply] = useState(false);
    const { userId, profileImage, nickName: infoNickname } = userInfo;
    const { idx, avatarUrl, nickName, content, createdAt, modifiedAt, command } = comment;
    const { mutate: deleteComment } = useDeleteComment(idx);
    const { mutate: modifyComment } = useEditComment(newComment, idx);
    const { mutate: createReply } = useCreateReply(idx, newReply, titleIdx);

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const handleCommentDelete = () => {
        deleteComment();
    };

    const handleChangeCommentModify = () => {
        setCommentReply(false);
        setCommentModify(!commentModify);
    };

    const handleCommentModify = () => {
        if (newComment.length > 0) {
            modifyComment();
            handleChangeCommentModify();
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
        if (newComment.length > 0) {
            handleOpenReply();
            createReply();
        }
    };

    useEffect(() => {
        setCommentModify(false);
    }, [comments]);

    return (
        <CommentDiv>
            <PostCommentsInfo>
                <UserInfo profileImage={avatarUrl} nickName={nickName} createdAt={createdAt} />
                <FlexBox>
                    <RecommendBtn />
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
            </PostCommentsInfo>
            {infoNickname === nickName && commentModify ? (
                <CommentUserEditTextareaBox>
                    <EditAndReplyButton
                        value={content}
                        onChange={handleChangeComment}
                        onClickCancel={handleChangeCommentModify}
                        onClickRegister={handleCommentModify}
                        disable={newComment}
                        placeholder="댓글을 적어주세요"
                    />
                </CommentUserEditTextareaBox>
            ) : (
                <CommentText>{content}</CommentText>
            )}
            {commentReply ? (
                <CommentReplyBox>
                    <EditAndReplyButton
                        value={newReply}
                        onChange={handleChangeReply}
                        onClickCancel={handleOpenReply}
                        onClickRegister={handleCreateReply}
                        disable={newReply}
                        placeholder="답글을 적어주세요"
                    />
                </CommentReplyBox>
            ) : null}
            {command.length
                ? command.map((item) => {
                      const { idx } = item;
                      return <Reply userInfo={userInfo} item={item} key={idx} />;
                  })
                : null}
        </CommentDiv>
    );
};

const PostCommentsInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const FlexBox = styled.div`
    display: flex;
    align-items: center;
    @media all and (max-width: 500px) {
        flex-direction: column-reverse;
    }
`;

const CommentUserEditTextareaBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
`;

const CommentReplyBox = styled(CommentUserEditTextareaBox)`
    border-left: 2px solid #e5e7eb;
    padding-left: 1rem;
    margin-bottom: 1rem;
`;

const CommentDiv = styled.div`
    border-bottom: 1px solid #d3d4d8;
    &:last-child {
        border-bottom: none;
    }
`;

const CommentText = styled(Typography)`
    color: rgb(55 65 81);
    margin-bottom: 1rem;
    font-size: 1.125rem;
    word-break: break-all;
`;

export default PostComment;
