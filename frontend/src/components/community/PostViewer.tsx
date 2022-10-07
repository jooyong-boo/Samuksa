import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
// import { getPostsId } from '../../api/post';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import CommentIcon from '@mui/icons-material/Comment';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { loginStatusState, userImageState, userInfoState } from '../../store/user';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getPostState } from '../../store/atom';
import timeForToday from '../utils/TimeForToday';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RandomNickname } from '../utils/RandomNickname';
import { getCommentById, getPostsById } from '../../api/post';

interface userInfos {
    userId?: string;
    userNickName?: string;
    userEmail?: string;
}

const PostViewer = () => {
    const notifySuccess = (text: string) => {
        dismissAll();
        toast.success(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    };
    const dismissAll = () => toast.dismiss();

    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [data, setData] = useState<any>('');
    const [comments, setComments] = useState<any[]>([]);
    // const userInfo = useRecoilValue<any>(userInfoState);
    const userInfo = useRecoilValue(userInfoState);
    const loginStatus = useRecoilValue(loginStatusState);
    const postList = useRecoilValue(getPostState);
    const userImage = useRecoilValue(userImageState);
    const { userId, userNickName, userEmail }: userInfos = userInfo;
    const [newComment, setNewComment] = useState('');
    const [commentModify, setCommentModify] = useState(false);

    const commentRef = useRef<null | HTMLDivElement>(null);

    async function searchPostsById(id: string | undefined) {
        const data = await getPostsById(id);
        setData(data);
    }

    async function searchUserComment(id: string | undefined) {
        const data = await getCommentById(id);
        setComments(data);
    }

    const moveComment = () => {
        commentRef.current?.scrollIntoView({ block: 'start' });
    };

    const handlePrevPost = () => {
        if (Number(params.id) - 1 > 0) {
            navigate(`/board/${location.pathname.split('/')[2]}/post/${Number(params.id) - 1}`);
        }
    };

    const handleNextPost = () => {
        if (Number(params.id) < postList.length) {
            navigate(`/board/${location.pathname.split('/')[2]}/post/${Number(params.id) + 1}`);
        }
    };

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const commentRegister = () => {
        if (userInfo) {
            setComments([
                ...comments,
                {
                    PostId: Number(id),
                    UserId: userNickName,
                    content: newComment,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    id: userId,
                },
            ]);
            setCommentModify(false);
            dismissAll();
            notifySuccess('등록 성공');
        } else {
            dismissAll();
            notifySuccess('로그인 해주세요');
        }
    };

    const commentDelete = (createdAt: string) => {
        setComments(comments.filter((item) => item.createdAt !== createdAt));
    };

    const changeCommentModify = () => {
        setCommentModify(!commentModify);
    };

    useEffect(() => {
        searchPostsById(id);
        searchUserComment(id);
    }, [id]);

    const goList = () => {
        if (location.pathname.includes('/tip')) {
            navigate('/board/tip');
        } else if (location.pathname.includes('/review')) {
            navigate('/board/review');
        }
    };

    return (
        <Background>
            <PostViewerPaper elevation={0}>
                <PostTitle>{data.title}</PostTitle>
                <PostInfoContainer>
                    <PostUserBox>
                        <UserAvatar src={`https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`} />
                        <UserInfoBox>
                            <UserInfoTypography fontSize={'1rem'} fontWeight={'700'}>
                                {RandomNickname()}
                            </UserInfoTypography>
                            <UserInfoTypography fontSize={'0.875rem'} color={'#979797'}>
                                {timeForToday(data.createdAt)}
                            </UserInfoTypography>
                        </UserInfoBox>
                    </PostUserBox>
                    <PostInfoBox onClick={moveComment}>
                        조회
                        <PostStrong>{comments.length}</PostStrong>
                        <CommentIcon sx={{ margin: '0 0.5rem', width: '1.125rem', height: '1.125rem' }} />
                        댓글
                        <PostStrong>{comments.length}</PostStrong>
                        <ThumbUpIcon sx={{ margin: '0 0.5rem', width: '1.125rem', height: '1.125rem' }} />
                        추천
                        <PostStrong>{comments.length}</PostStrong>
                    </PostInfoBox>
                </PostInfoContainer>
                {data !== '' ? (
                    <PostContentBox>
                        <PostContent>{parse(DOMPurify.sanitize(data.content))}</PostContent>
                    </PostContentBox>
                ) : null}

                <PostCommentBox ref={commentRef}>
                    <TotalCommentText>{comments.length}개의 댓글</TotalCommentText>
                    <UserCommentWrapper>
                        <CommentUserAvatarContainer>
                            {loginStatus ? <CommentUserAvatar src={userImage} /> : null}
                            <Typography>{loginStatus && userNickName}</Typography>
                        </CommentUserAvatarContainer>
                        <CommentBox>
                            <TextField
                                sx={{
                                    width: '100%',
                                }}
                                placeholder={loginStatus ? '댓글을 남겨보세요' : '댓글을 쓰려면 로그인이 필요합니다.'}
                                disabled={!loginStatus}
                                onChange={handleChangeComment}
                            />
                            <CustomBtn variant="contained" margin={'1rem'} onClick={commentRegister}>
                                등록
                            </CustomBtn>
                            <CustomBtn variant="contained" margin={'1rem 0'} onClick={commentRegister}>
                                등록 + 추천
                            </CustomBtn>
                        </CommentBox>
                    </UserCommentWrapper>
                    {comments &&
                        comments.map((comment, i) => {
                            const { UserId, id, createdAt } = comment;
                            return (
                                <CommentDiv key={id + i}>
                                    <PostCommentsInfo>
                                        <CommentAvatar
                                            src={`https://randomuser.me/api/portraits/men/${getRandomNumber(
                                                1,
                                                98,
                                            )}.jpg`}
                                        />
                                        <CommentUserInfoBox>
                                            <CommentUserInfoText color={'#4B5563'} fontWeight={'500'}>
                                                {typeof UserId === 'number' ? RandomNickname() : UserId}
                                            </CommentUserInfoText>
                                            <CommentUserInfoText color={'#979797'}>
                                                {timeForToday(createdAt)}
                                            </CommentUserInfoText>
                                        </CommentUserInfoBox>
                                        {userId === id ? (
                                            <div
                                                style={{
                                                    textAlign: 'end',
                                                    flexGrow: 1,
                                                    paddingRight: '1rem',
                                                }}
                                            >
                                                <span
                                                    style={{ marginRight: '0.5rem', fontSize: '0.85rem' }}
                                                    onClick={changeCommentModify}
                                                >
                                                    수정
                                                </span>
                                                <span
                                                    style={{ fontSize: '0.85rem' }}
                                                    onClick={() => {
                                                        commentDelete(createdAt);
                                                    }}
                                                >
                                                    삭제
                                                </span>
                                            </div>
                                        ) : null}
                                    </PostCommentsInfo>
                                    {userId === id && commentModify ? (
                                        <>
                                            <TextField
                                                sx={{
                                                    width: '100%',
                                                }}
                                                defaultValue={comment.content}
                                                // onChange={handleChangeComment}
                                            />
                                            <Button variant="outlined">취소</Button>
                                            <CustomBtn variant="contained" margin={'1rem'}>
                                                등록
                                            </CustomBtn>
                                        </>
                                    ) : (
                                        <CommentText>{comment.content}</CommentText>
                                    )}
                                </CommentDiv>
                            );
                        })}
                </PostCommentBox>
                <BottomCommentBox>
                    <CustomBtn variant="contained" margin={'1rem 0'} onClick={goList}>
                        목록
                    </CustomBtn>
                    <PageMoveBox>
                        <CustomBtn variant="contained" margin={'1rem'} onClick={handlePrevPost}>
                            이전글
                        </CustomBtn>
                        <CustomBtn variant="contained" margin={'1rem 0'} onClick={handleNextPost}>
                            다음글
                        </CustomBtn>
                    </PageMoveBox>
                </BottomCommentBox>
            </PostViewerPaper>
        </Background>
    );
};

export default PostViewer;

export const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (Number(max) - Number(min) + 2));
};

const Background = styled.div`
    background-color: white;
    width: 95vw;
    height: 90%;
    padding-top: 1rem;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    overflow: auto;
    margin: auto;
`;

const PostViewerPaper = styled(Paper)`
    width: 80%;
    height: 95%;
    margin: auto;
    padding: 2rem;
    overflow: overlay;
    border: 1px solid rgb(225, 225, 225);
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
`;

const PostTitle = styled(Typography)`
    font-size: 1.125rem;
    font-weight: 500;
    padding: 0 1rem;
`;

const PostInfoContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
`;

const PostUserBox = styled.div`
    display: inline-flex;
    align-items: center;
`;

const UserAvatar = styled(Avatar)`
    color: #a2a5a9;
    vertical-align: middle;
    width: 3rem;
    height: 3rem;
`;

const UserInfoBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-left: 0.5rem;
`;

interface UserInfoTypographyProps {
    fontSize: string;
    fontWeight?: string;
    color?: string;
}

const UserInfoTypography = styled(Typography)<UserInfoTypographyProps>`
    font-size: ${(props) => `${props.fontSize}`};
    font-weight: ${(props) => `${props.fontWeight}`};
    color: ${(props) => `${props.color}`};
`;
const PostInfoBox = styled(Typography)`
    margin: auto 0;
    cursor: pointer;
    font-size: 0.775rem;
`;

const PostStrong = styled.strong`
    margin-left: 3px;
`;

const PostContentBox = styled.div`
    padding: 1rem;
    min-height: 10rem;
    border-bottom: 1px solid #eaeaea;
`;

const PostContent = styled(Typography)`
    line-height: 170%;
`;

const PostCommentBox = styled.div`
    margin: 1rem 0;
`;

const CommentDiv = styled.div`
    border-bottom: 1px solid #eaeaea;
    &:last-child {
        border-bottom: none;
    }
`;

const PostCommentsInfo = styled.div`
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

const CommentText = styled(Typography)`
    color: rgb(55 65 81);
    margin-bottom: 1rem;
`;

const BottomCommentBox = styled.div`
    margin: 1rem 0;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    border-top: 1px solid #eaeaea;
    padding-top: 1rem;
`;

const UserCommentWrapper = styled.div`
    width: 100%;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const CommentUserAvatarContainer = styled.div`
    display: flex;
    align-items: center;
`;

const CommentUserAvatar = styled(Avatar)`
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
`;

const CommentBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 1rem;
    margin-top: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
`;

const TotalCommentText = styled(Typography)`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

interface CustomBtnProps {
    margin?: string;
}

const CustomBtn = styled(Button)<CustomBtnProps>`
    background-color: ${({ theme }) => theme.colors.main};
    font-weight: 700;
    color: white;
    box-shadow: none;
    width: 7rem;
    height: 2.5rem;
    margin: ${(props) => `${props.margin}`};
    :hover {
        box-shadow: none;
    }
`;

const PageMoveBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;
