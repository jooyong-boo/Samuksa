import { Avatar, Button, TextField, Typography } from '@mui/material';
import { RandomNickname } from 'utils/RandomNickname';
import timeForToday from 'utils/TimeForToday';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { TiEdit } from 'react-icons/ti';
import { useRecoilValue } from 'recoil';
import { userImageState } from 'store/user';
import styled from 'styled-components';
import { getRandomNumber } from '../PostViewer';

interface CommentProps {
    nickName: string;
    id: string;
    createdAt: string;
    postId: number;
    content: string;
}

interface CommentsProps {
    createdAt?: string;
}

interface UserInfoProps {
    userId?: string;
    nickName?: string;
    email?: string;
}

interface CommentsProps {
    comment: CommentProps;
    comments: CommentsProps[];
    setComments: Dispatch<SetStateAction<any>>;
    userInfo: UserInfoProps;
}

const PostComment = ({ setComments, comment, comments, userInfo }: CommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const [commentModify, setCommentModify] = useState(false);
    const userImage = useRecoilValue(userImageState);
    const { userId } = userInfo;
    const { nickName, id, createdAt, postId, content } = comment;

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const commentDelete = (createdAt: string) => {
        setComments(comments.filter((item) => item.createdAt !== createdAt));
    };

    const changeCommentModify = () => {
        setCommentModify(!commentModify);
    };

    const handleCommentModify = (id: number) => {
        console.log(id);
        changeCommentModify();
    };

    useEffect(() => {
        setCommentModify(false);
    }, [comments]);

    return (
        <CommentDiv>
            <PostCommentsInfo>
                <CommentUserInfoDiv>
                    {userId === id ? (
                        <CommentAvatar src={userImage} />
                    ) : (
                        <CommentAvatar src={`https://randomuser.me/api/portraits/men/${getRandomNumber(1, 98)}.jpg`} />
                    )}
                    <CommentUserInfoBox>
                        <CommentUserInfoText color={'#4B5563'} fontWeight={'500'}>
                            {nickName ? nickName : RandomNickname()}
                        </CommentUserInfoText>
                        <CommentUserInfoText color={'#979797'}>{timeForToday(createdAt)}</CommentUserInfoText>
                    </CommentUserInfoBox>
                </CommentUserInfoDiv>
                {userId === id ? (
                    <CommentUserEditBox>
                        <CommentEditBtn onClick={changeCommentModify}>
                            <TiEdit />
                            수정하기
                        </CommentEditBtn>
                        <CommentEditBtn
                            onClick={() => {
                                commentDelete(createdAt);
                            }}
                        >
                            <HiOutlineTrash />
                            삭제하기
                        </CommentEditBtn>
                    </CommentUserEditBox>
                ) : null}
            </PostCommentsInfo>
            {userId === id && commentModify ? (
                <CommentUserEditTextareaBox>
                    <TextField
                        sx={{
                            width: '100%',
                        }}
                        multiline
                        inputProps={{ maxLength: 300 }}
                        defaultValue={content}
                        onChange={handleChangeComment}
                    />
                    <CancleBtn variant="outlined" onClick={changeCommentModify}>
                        취소
                    </CancleBtn>
                    <CustomBtn
                        variant="contained"
                        margin={'1rem 0 1rem 1rem'}
                        onClick={() => {
                            handleCommentModify(postId);
                        }}
                    >
                        등록
                    </CustomBtn>
                </CommentUserEditTextareaBox>
            ) : (
                <CommentText>{content}</CommentText>
            )}
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

interface CommentUserInfoTextProps {
    color: string;
    fontWeight?: string;
}

const CommentUserInfoText = styled(Typography)<CommentUserInfoTextProps>`
    color: ${(props) => `${props.color}`};
    font-weight: ${(props) => `${props.fontWeight}`};
`;

const CommentText = styled(Typography)`
    color: rgb(55 65 81);
    margin-bottom: 1rem;
`;
