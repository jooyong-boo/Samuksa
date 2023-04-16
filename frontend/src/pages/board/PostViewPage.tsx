import styled, { ThemeContext } from 'styled-components';
import { Avatar, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import CommentIcon from '@mui/icons-material/Comment';
import { useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginStatusState, userImageState, userInfoState } from '../../store/user';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getPostState } from '../../store/atom';
import timeForToday from '../../utils/TimeForToday';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { getPostComment } from '../../api/post';
import PostComment from 'components/community/PostViewer/PostComment';
import RecommendBtn from 'components/common/RecommendBtn';
import CommentRegister from 'components/community/PostViewer/CommentRegister';
import PostMenu from 'components/community/PostViewer/PostMenu';
import { useDeletePost } from 'api/hooks/post/useDeletePost';
import useGetComments from 'api/hooks/post/useGetComments';
import useGetPostContent from 'api/hooks/post/useGetPostContent';
import { postEditState } from 'store/post';
import { useRecommendPost } from 'api/hooks/post/useRecommendPost';
import { Button } from 'components/common';
import UserInfo from 'components/common/UserInfo';

const PostViewPage = () => {
    const theme = useContext(ThemeContext);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [comments1, setComments] = useState<any>([]);
    const userInfo = useRecoilValue<any>(userInfoState);
    const loginStatus = useRecoilValue(loginStatusState);
    const postList = useRecoilValue(getPostState);
    const userImage = useRecoilValue(userImageState);
    const [editPost, setEditPost] = useRecoilState(postEditState);
    const { mutate: deletePost } = useDeletePost(id!);
    const [comments, isLoadingComments, refetchComments] = useGetComments(id!, 0, 0);
    const [content, isLoadingContent, refetchContent] = useGetPostContent(id!);
    const { mutate: recommend } = useRecommendPost(id!, true);
    const { mutate: notRecommend } = useRecommendPost(id!, false);

    const handleRecommend = () => {
        recommend();
    };

    const handleNotRecommend = () => {
        notRecommend();
    };

    const commentRef = useRef<null | HTMLDivElement>(null);

    async function searchUserComment(id: number, page: number, size: number) {
        const data = await getPostComment(id, 0, 0);
        setComments(data);
    }

    const handleDeletePost = (idx: number | string): void => {
        deletePost();
    };

    const handleEditPost = () => {
        const type = location.pathname.split('/').includes('review') ? 0 : 1;
        setEditPost({
            content: content.data.content,
            title: content.data.title,
            idx: content.data.idx,
            type,
        });
        navigate('/edit', { state: `/${location.pathname.split('/')[2]}` });
    };

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

    const goList = () => {
        const page = location.pathname.split('/')[2];
        navigate(`/board/${page}`);
    };

    useEffect(() => {
        if (id) {
            searchUserComment(Number(id), 0, 0);
        }
    }, [id]);

    return (
        <Background>
            {content ? (
                <PostViewerPaper elevation={0}>
                    <PostTopBox>
                        <PostTitle>{content?.data?.title}</PostTitle>
                        <PostMenu delete={handleDeletePost} edit={handleEditPost} />
                    </PostTopBox>
                    <PostInfoContainer>
                        <UserInfo
                            profileImage={content?.data?.profileImage}
                            nickName={content?.data?.nickName}
                            createdAt={content?.data.modifiedAt ? content.data.modifiedAt : content.data.createdAt}
                        />
                        {content.data && (
                            <PostInfoBox>
                                <FlexBox>
                                    <span>조회</span>
                                    <PostStrong>{content.data.viewCount}</PostStrong>
                                </FlexBox>
                                <FlexBox onClick={moveComment}>
                                    <CommentIcon sx={{ margin: '0 0.5rem', width: '1.125rem', height: '1.125rem' }} />
                                    <span>댓글</span>
                                    <PostStrong>{content.data.commentCount}</PostStrong>
                                </FlexBox>
                                <FlexBox>
                                    <ThumbUpIcon sx={{ margin: '0 0.5rem', width: '1.125rem', height: '1.125rem' }} />
                                    <span>추천</span>
                                    <PostStrong>{content.data.recommendCount}</PostStrong>
                                </FlexBox>
                            </PostInfoBox>
                        )}
                    </PostInfoContainer>
                    {content.data ? (
                        <PostContentBox>
                            <PostContent>{parse(DOMPurify.sanitize(content.data.content))}</PostContent>
                            {content.data ? (
                                <RecommendBox>
                                    <RecommendBtn
                                        up={handleRecommend}
                                        down={handleNotRecommend}
                                        recommendCount={content.data.recommendCount}
                                    />
                                </RecommendBox>
                            ) : null}
                        </PostContentBox>
                    ) : null}

                    <PostCommentBox ref={commentRef}>
                        <TotalCommentText>{comments.totalCommentCount}개의 댓글</TotalCommentText>
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
                                    comments={comments.data}
                                    userInfo={userInfo}
                                    loginStatus={loginStatus}
                                    titleIdx={id!}
                                />
                            </CommentBox>
                        </UserCommentWrapper>
                        {comments.data.length
                            ? comments.data.map((comment: any) => {
                                  const { idx } = comment;
                                  return (
                                      <PostComment
                                          key={idx}
                                          setComments={setComments}
                                          comment={comment}
                                          comments={comments.data}
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
                                disabled={content.prev}
                            >
                                이전글
                            </CustomBtn>
                            <CustomBtn
                                variant="contained"
                                onClick={() => {
                                    handleMovePost('next');
                                }}
                                disabled={content.next}
                            >
                                다음글
                            </CustomBtn>
                        </PageMoveBox>
                    </BottomCommentBox>
                </PostViewerPaper>
            ) : null}
        </Background>
    );
};

const Background = styled.div`
    background-color: white;
    width: 95vw;
    height: 90%;
    padding-top: 1rem;
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
    @media all and (max-width: 1000px) {
        width: 100%;
    }
`;

const PostTopBox = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PostTitle = styled(Typography)`
    color: #101827;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0 1rem;
`;

const PostInfoContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0.5rem;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const PostInfoBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 0;
    font-size: 0.775rem;
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const PostStrong = styled.strong`
    margin-left: 3px;
`;

const PostContentBox = styled.div`
    padding: 1rem;
    min-height: 10rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

const PostContent = styled.div`
    line-height: 170%;
    font-size: 1.5rem;
`;

const RecommendBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 1rem 0;
`;

const PostCommentBox = styled.div`
    margin: 1rem 0;
`;

const BottomCommentBox = styled.div`
    margin: 1rem 0;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
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
}

const CustomBtn = styled(Button)<CustomBtnProps>`
    font-weight: 700;
    width: 7rem;
    height: 2.5rem;
    margin: ${(props) => `${props.margin}`};
`;

const PageMoveBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin: 1rem;
`;

export default PostViewPage;
