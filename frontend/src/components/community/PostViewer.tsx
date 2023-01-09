import styled from 'styled-components';
import { Avatar, Button, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import CommentIcon from '@mui/icons-material/Comment';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { loginStatusState, userImageState, userInfoState } from '../../store/user';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getPostState } from '../../store/atom';
import timeForToday from '../../utils/TimeForToday';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { getCommentById, getPostComment, getPostContent, getPostsById } from '../../api/post';
import PostComment from './PostViewer/PostComment';
import PostRecommendBtn from './PostViewer/PostRecommendBtn';
import CommentRegister from './PostViewer/CommentRegister';
import UserInfo from './PostViewer/UserInfo';
import PostMenu from './PostViewer/PostMenu';
import { useDeletePost } from 'api/hooks/post/useDeletePost';
import useGetComments from 'api/hooks/post/useGetComments';

interface userInfos {
    userId: string;
    nickName: string;
    email: string;
    profileImage: string;
}

interface PostData {
    idx: number;
    profileImage: string;
    nickName: string;
    createdAt: string;
    modifiedAt: string;
    title: string;
    content: string;
    viewCount: number;
    commentCount: number;
    recommendCount: number;
}

const PostViewer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [data, setData] = useState<PostData>();
    const [comments1, setComments] = useState<any>([]);
    const userInfo = useRecoilValue<any>(userInfoState);
    const loginStatus = useRecoilValue(loginStatusState);
    const postList = useRecoilValue(getPostState);
    const userImage = useRecoilValue(userImageState);
    const { mutate: deletePost } = useDeletePost(id!);
    const [comments, total, isLoading, refetch] = useGetComments(id!, 0, 0);

    const { userId, nickName, email, profileImage } = userInfo;

    const commentRef = useRef<null | HTMLDivElement>(null);

    async function searchPostsById(id: number) {
        const data = await getPostContent(id);
        setData(data.data);
    }

    async function searchUserComment(id: number, page: number, size: number) {
        const data = await getPostComment(id, 0, 0);
        setComments(data);
    }

    const handleDeletePost = (idx: number | string): void => {
        deletePost();
    };

    const handleEditPost = () => {};

    const moveComment = () => {
        commentRef.current?.scrollIntoView({ block: 'start' });
    };

    const handleMovePost = (direction: string) => {
        switch (direction) {
            case 'prev':
                if (Number(params.id) - 1 > 0) {
                    navigate(`/board/${location.pathname.split('/')[2]}/post/${Number(params.id) - 1}`);
                }
                break;
            case 'next':
                if (Number(params.id) < postList.length) {
                    navigate(`/board/${location.pathname.split('/')[2]}/post/${Number(params.id) + 1}`);
                }
                break;
        }
    };

    useEffect(() => {
        if (id) {
            searchPostsById(Number(id));
            searchUserComment(Number(id), 0, 0);
        }
    }, [id]);

    const goList = () => {
        const page = location.pathname.split('/')[2];
        navigate(`/board/${page}`);
    };

    return (
        <Background>
            <PostViewerPaper elevation={0}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <PostTitle>{data?.title}</PostTitle>
                    <PostMenu delete={handleDeletePost} />
                </div>
                <PostInfoContainer>
                    <PostUserBox>
                        <UserAvatar src={data?.profileImage} />
                        <UserInfoBox>
                            <UserInfoTypography fontSize={'1rem'} fontWeight={'700'}>
                                {data?.nickName}
                            </UserInfoTypography>
                            <UserInfoTypography fontSize={'0.875rem'} color={'#979797'}>
                                {data && timeForToday(data.createdAt)}
                            </UserInfoTypography>
                        </UserInfoBox>
                    </PostUserBox>
                    {data && (
                        <PostInfoBox onClick={moveComment}>
                            <span>조회</span>
                            <PostStrong>{data.viewCount}</PostStrong>
                            <CommentIcon sx={{ margin: '0 0.5rem', width: '1.125rem', height: '1.125rem' }} />
                            <span>댓글</span>
                            <PostStrong>{data.commentCount}</PostStrong>
                            <ThumbUpIcon sx={{ margin: '0 0.5rem', width: '1.125rem', height: '1.125rem' }} />
                            <span>추천</span>
                            <PostStrong>{data.recommendCount}</PostStrong>
                        </PostInfoBox>
                    )}
                </PostInfoContainer>
                {data ? (
                    <PostContentBox>
                        <PostContent>{parse(DOMPurify.sanitize(data.content))}</PostContent>
                    </PostContentBox>
                ) : null}
                <PostRecommendBtn />

                <PostCommentBox ref={commentRef}>
                    <TotalCommentText>{comments.length}개의 댓글</TotalCommentText>
                    <UserCommentWrapper>
                        <CommentBox>
                            <CommentUserAvatarContainer>
                                {loginStatus ? (
                                    <CommentUserAvatar
                                        src={userInfo.profileImage ? userInfo.profileImage : userImage}
                                    />
                                ) : null}
                            </CommentUserAvatarContainer>
                            <CommentRegister
                                setComments={setComments}
                                comments={comments}
                                userInfo={userInfo}
                                loginStatus={loginStatus}
                                titleIdx={id!}
                            />
                        </CommentBox>
                    </UserCommentWrapper>
                    {comments.length
                        ? comments.map((comment: any) => {
                              const { idx } = comment;
                              return (
                                  <PostComment
                                      key={idx}
                                      setComments={setComments}
                                      comment={comment}
                                      comments={comments}
                                      userInfo={userInfo}
                                      titleIdx={id!}
                                  />
                              );
                          })
                        : null}
                </PostCommentBox>
                <BottomCommentBox>
                    <CustomBtn variant="contained" onClick={goList}>
                        목록
                    </CustomBtn>
                    <PageMoveBox>
                        <CustomBtn
                            variant="contained"
                            margin={'0 1rem'}
                            onClick={() => {
                                handleMovePost('prev');
                            }}
                        >
                            이전글
                        </CustomBtn>
                        <CustomBtn
                            variant="contained"
                            onClick={() => {
                                handleMovePost('next');
                            }}
                        >
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
    font-size: 1.25rem;
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

const PostContent = styled.div`
    line-height: 170%;
    font-size: 1.5rem;
`;

const PostCommentBox = styled.div`
    margin: 1rem 0;
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
    margin-bottom: 1rem;
`;

const CommentUserAvatarContainer = styled.div`
    display: flex;
    align-items: flex-start;
`;

const CommentUserAvatar = styled(Avatar)`
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    vertical-align: middle;
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
`;

const CommentBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 1rem;
    margin-top: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    position: relative;
`;

const TotalCommentText = styled(Typography)`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;

interface CustomBtnProps {
    margin?: string;
    $marginRight?: string;
}

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

const PageMoveBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 1rem;
`;
