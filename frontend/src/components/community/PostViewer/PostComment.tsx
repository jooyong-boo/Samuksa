import { Typography } from '@mui/material';
import { useCreateReply } from 'api/hooks/post/useCreateReply';
import { useDeleteComment } from 'api/hooks/post/useDeleteComment';
import { useEditComment } from 'api/hooks/post/useEditComment';
import { useRecommendComment } from 'api/hooks/post/useRecommendComment';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentMenu from './CommentMenu';
import EditAndReplyButton from './EditAndReplyButton';
import RecommendBtn from '../../common/RecommendBtn';
import Reply from './Reply';
import UserInfo from '../../common/UserInfo';

interface CommentProps {
    idx: number;
    avatarUrl: string;
    nickName: string;
    content: string;
    createdAt: string;
    modifiedAt: string;
    recommendCount: number;
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
    userInfo: UserInfoProps;
    titleIdx: string;
}

const PostComment = ({ comment, comments, userInfo, titleIdx }: CommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const [commentModify, setCommentModify] = useState(false);
    const [newReply, setNewReply] = useState('');
    const [commentReply, setCommentReply] = useState(false);
    const { nickName: infoNickname } = userInfo;
    const { idx, avatarUrl, nickName, content, createdAt, command, recommendCount } = comment;
    const { mutate: deleteComment } = useDeleteComment(idx);
    const { mutate: modifyComment } = useEditComment(newComment, idx);
    const { mutate: createReply } = useCreateReply(idx, newReply, titleIdx, nickName, userInfo);
    const { mutate: recommendComment } = useRecommendComment(titleIdx, idx, true);
    const { mutate: notRecommendComment } = useRecommendComment(titleIdx, idx, false);

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
            setNewComment('');
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

    useEffect(() => {
        setCommentModify(false);
    }, [comments]);

    return (
        <CommentDiv>
            <PostCommentsInfo>
                <UserInfo profileImage={avatarUrl} nickName={nickName} createdAt={createdAt} />
                <FlexBox>
                    <RecommendBtn recommendCount={recommendCount} up={recommendComment} down={notRecommendComment} />
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
                        value={newComment}
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
                      const { idx: commandIdx } = item;
                      return (
                          <Reply
                              userInfo={userInfo}
                              item={item}
                              key={commandIdx}
                              titleIdx={titleIdx}
                              commentIdx={idx}
                          />
                      );
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
