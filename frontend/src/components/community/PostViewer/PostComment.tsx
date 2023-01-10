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
                <CommentMenu
                    infoNickname={infoNickname}
                    nickName={nickName}
                    handleEdit={handleChangeCommentModify}
                    handleDelete={handleCommentDelete}
                    handleReply={handleOpenReply}
                />
            </PostCommentsInfo>
            {infoNickname === nickName && commentModify ? (
                <CommentUserEditTextareaBox>
                    <EditAndReplyButton
                        value={content}
                        onChange={handleChangeComment}
                        onClickCancel={handleChangeCommentModify}
                        onClickRegister={handleCommentModify}
                        disable={newComment}
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
                    />
                </CommentReplyBox>
            ) : null}
            {command.length ? <Reply command={command} /> : null}
        </CommentDiv>
    );
};

export default PostComment;

interface CustomBtnProps {
    margin?: string;
    $marginRight?: string;
}

const PostCommentsInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
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

const CustomBtn = styled(Button)<CustomBtnProps>`
    background-color: ${({ theme }) => theme.colors.main};
    font-weight: 700;
    color: white;
    box-shadow: none;
    width: 7rem;
    height: 2.5rem;
    margin: ${(props) => `${props.margin}`};
    margin-right: ${(props) => `${props.$marginRight}`};
    :hover {
        box-shadow: none;
    }
`;

const CancleBtn = styled(CustomBtn)`
    background-color: white;
    color: #0098ee;
    width: 3.5rem;
`;

const CommentDiv = styled.div`
    border-bottom: 1px solid #eaeaea;
    &:last-child {
        border-bottom: none;
    }
`;

const CommentText = styled(Typography)`
    color: rgb(55 65 81);
    margin-bottom: 1rem;
    font-size: 1.125rem;
`;
