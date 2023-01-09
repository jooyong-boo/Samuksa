import { Button, TextField, Typography } from '@mui/material';
import { useCreateReply } from 'api/hooks/post/useCreateReply';
import { useDeleteComment } from 'api/hooks/post/useDeleteComment';
import { useEditComment } from 'api/hooks/post/useEditComment';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { TiEdit } from 'react-icons/ti';
import styled from 'styled-components';
import { notifyError } from 'utils/notify';
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
                {infoNickname === nickName ? (
                    <CommentUserEditBox>
                        <CommentEditBtn onClick={handleChangeCommentModify}>
                            <TiEdit />
                            수정하기
                        </CommentEditBtn>
                        <CommentEditBtn
                            onClick={() => {
                                handleCommentDelete();
                            }}
                        >
                            <HiOutlineTrash />
                            삭제하기
                        </CommentEditBtn>
                        <CommentEditBtn onClick={handleOpenReply}>
                            <TiEdit />
                            답글달기
                        </CommentEditBtn>
                    </CommentUserEditBox>
                ) : (
                    <CommentUserEditBox>
                        <CommentEditBtn onClick={handleOpenReply}>
                            <TiEdit />
                            답글달기
                        </CommentEditBtn>
                    </CommentUserEditBox>
                )}
            </PostCommentsInfo>
            {infoNickname === nickName && commentModify ? (
                <CommentUserEditTextareaBox>
                    <TextField
                        fullWidth
                        multiline
                        inputProps={{ maxLength: 300 }}
                        defaultValue={content}
                        onChange={handleChangeComment}
                        placeholder="댓글을 적어주세요"
                    />
                    <CancleBtn variant="outlined" onClick={handleChangeCommentModify}>
                        취소
                    </CancleBtn>
                    <CustomBtn
                        variant="contained"
                        margin={'1rem 0 1rem 1rem'}
                        onClick={handleCommentModify}
                        disabled={!newComment}
                    >
                        등록
                    </CustomBtn>
                </CommentUserEditTextareaBox>
            ) : (
                <CommentText>{content}</CommentText>
            )}
            {commentReply ? (
                <CommentReplyBox>
                    <TextField
                        fullWidth
                        multiline
                        inputProps={{ maxLength: 300 }}
                        defaultValue={newReply}
                        onChange={handleChangeReply}
                        placeholder="답글을 적어주세요"
                    />
                    <CancleBtn variant="outlined" onClick={handleOpenReply}>
                        취소
                    </CancleBtn>
                    <CustomBtn
                        variant="contained"
                        margin={'1rem 0 1rem 1rem'}
                        onClick={handleCreateReply}
                        disabled={!newReply}
                    >
                        등록
                    </CustomBtn>
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

const CommentUserEditBox = styled.div`
    padding-right: 1rem;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
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

const CommentEditBtn = styled.button`
    font-size: 1rem;
    background-color: white;
    color: #6b7280;
    border-radius: 5px;
    height: 2rem;
    border: none;
    cursor: pointer;
    :hover {
        color: #374151;
    }
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
`;
