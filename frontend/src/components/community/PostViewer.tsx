import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components';
import { Button, Paper, TextField, Typography } from '@mui/material';
// import { getPostsId } from '../../api/post';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AccountCircle from '@mui/icons-material/AccountCircle';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import CommentIcon from '@mui/icons-material/Comment';
import { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../store/user';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { getPostState } from '../../store/atom';

const PostViewer = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState<any>('');
    const [comments, setComments] = useState<any[]>([]);
    const userInfo = useRecoilValue<any>(userInfoState);
    const postList = useRecoilValue(getPostState);

    const commentRef = useRef<null | HTMLDivElement>(null);

    const getPostsId = async (id: string | undefined) => {
        try {
            const { data } = await axios.get(`https://koreanjson.com/posts/${id}`);
            setData(data);
        } catch (err) {
            console.log(err.response);
        }
    };

    const getComment = async (id: string | undefined) => {
        try {
            const { data } = await axios.get(`https://koreanjson.com/comments?postId=${id}`);
            setComments(data);
        } catch (err) {
            console.log(err.response);
        }
    };

    const moveComment = () => {
        commentRef.current?.scrollIntoView({ block: 'start' });
    };

    const handlePrevPost = () => {
        if (Number(params.id) - 1 > 0) {
            navigate(`/board/review/post/${Number(params.id) - 1}`);
        }
    };

    const handleNextPost = () => {
        if (Number(params.id) < postList.length) {
            navigate(`/board/review/post/${Number(params.id) + 1}`);
        }
    };

    useEffect(() => {
        getPostsId(id);
        getComment(id);
    }, [id]);
    // console.log(data);
    // console.log(comments);

    const goList = () => {
        navigate('/board/review');
    };

    return (
        <Background>
            <PostViewerPaper elevation={0}>
                <Typography sx={{ fontSize: '1.3rem', fontWeight: 'medium' }}>{data.title}</Typography>
                <div style={{ display: 'flex', width: '100%', padding: '0.5rem', justifyContent: 'space-between' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <AccountCircle
                            sx={{
                                color: '#a2a5a9',
                                verticalAlign: 'middle',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                        <div style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: '0.5rem' }}>
                            <Typography sx={{ fontSize: '15px', fontWeight: '700' }}>{data.UserId}</Typography>
                            <Typography sx={{ fontSize: '14px', color: '#979797' }}>{data.createdAt}</Typography>
                        </div>
                    </div>
                    <div>
                        <Typography sx={{ cursor: 'pointer' }} onClick={moveComment}>
                            조회
                            <strong style={{ marginLeft: '3px' }}>{comments.length}</strong>
                            <CommentIcon sx={{ margin: '0 0.5rem' }} />
                            댓글
                            <strong style={{ marginLeft: '3px' }}>{comments.length}</strong>
                            <ThumbUpIcon sx={{ margin: '0 0.5rem' }} />
                            추천
                            <strong style={{ marginLeft: '3px' }}>{comments.length}</strong>
                        </Typography>
                    </div>
                </div>
                <div style={{ borderBottom: '1px solid #EAEAEA' }} />
                {data !== '' ? (
                    <div style={{ padding: '1rem', minHeight: '10rem' }}>
                        <Typography sx={{ lineHeight: '170%' }}>{parse(DOMPurify.sanitize(data.content))}</Typography>
                    </div>
                ) : null}
                <div style={{ borderBottom: '1px solid #EAEAEA' }} />
                <div style={{ margin: '1rem 0' }}>
                    <Typography fontSize={20}>댓글 {comments.length}</Typography>
                    {comments &&
                        comments.map((comment) => {
                            return (
                                <div key={comment.id} ref={commentRef} style={{ margin: '1rem 0' }}>
                                    <Typography>닉네임: {comment.id}</Typography>
                                    <Typography fontSize={14} color="#979797">
                                        {comment.createdAt}
                                    </Typography>
                                    <Typography>{comment.content}</Typography>
                                </div>
                            );
                        })}
                </div>
                <div style={{ borderBottom: '1px solid #EAEAEA' }} />
                <div style={{ margin: '1rem 0', display: 'flex', width: '100%', flexWrap: 'wrap' }}>
                    {/* <Typography>댓글 작성</Typography> */}
                    {userInfo && (
                        <AccountCircleIcon
                            sx={{
                                color: '#6EA5F8',
                                verticalAlign: 'middle',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                    )}
                    <Typography>{userInfo && userInfo.userNikName}</Typography>
                    <CommentBox>
                        <TextField sx={{ width: '100%' }} placeholder="댓글을 남겨보세요" />
                        <CustomBtn
                            variant="contained"
                            sx={{
                                margin: '1rem',
                            }}
                            onClick={goList}
                        >
                            등록
                        </CustomBtn>
                        <CustomBtn
                            variant="contained"
                            sx={{
                                margin: '1rem 0',
                            }}
                            onClick={goList}
                        >
                            등록 + 추천
                        </CustomBtn>
                    </CommentBox>
                    <div style={{ display: 'flex', width: '63%', justifyContent: 'space-between' }}>
                        <CustomBtn
                            variant="contained"
                            sx={{
                                margin: '1rem 0',
                            }}
                            onClick={goList}
                        >
                            목록
                        </CustomBtn>
                        <div>
                            <CustomBtn
                                variant="contained"
                                sx={{
                                    margin: '1rem',
                                }}
                                onClick={handlePrevPost}
                            >
                                이전글
                            </CustomBtn>
                            <CustomBtn
                                variant="contained"
                                sx={{
                                    margin: '1rem 0',
                                }}
                                onClick={handleNextPost}
                            >
                                다음글
                            </CustomBtn>
                        </div>
                    </div>
                </div>
            </PostViewerPaper>
            {/* <Paper sx={{ height: '75%', width: '80%', margin: 'auto', padding: '2rem', marginBottom: '1rem' }}> */}
            {/* </Paper> */}
        </Background>
    );
};

export default PostViewer;

const Background = styled.div`
    background-color: white;
    width: 95vw;
    height: 90%;
    /* padding-top: 30px; */
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
    overflow: auto;
    border: 1px solid rgb(225, 225, 225);
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

const CustomBtn = styled(Button)`
    background-color: #6ea5f8;
    font-weight: 900;
    color: white;
    box-shadow: none;
    width: 7rem;
    height: 2.5rem;
    :hover {
        box-shadow: none;
    }
`;
