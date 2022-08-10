import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
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

const Background = styled.div`
    background-color: white;
    width: 95%;
    height: 90%;
    padding-top: 70px;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    overflow: auto;
    margin: auto;
`;

const PostViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [comments, setComments] = useState('');
    const userInfo = useRecoilValue(userInfoState);

    const commentRef = useRef();

    // console.log(id);

    const getPostsId = async (id) => {
        try {
            const { data } = await axios.get(`https://koreanjson.com/posts/${id}`);
            setData(data);
        } catch (err) {
            console.log(err.response);
        }
    };

    const getComment = async (id) => {
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

    useEffect(() => {
        getPostsId(id);
        getComment(id);
    }, [id]);
    // console.log(data);
    console.log(comments);

    const goList = () => {
        navigate(-1);
    };

    return (
        <Background>
            <Paper
                elevation={1}
                sx={{ height: '95%', width: '80%', margin: 'auto', padding: '2rem', overflow: 'auto' }}
            >
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
                            <CommentIcon sx={{ margin: '0 0.2rem' }} />
                            댓글
                            <strong style={{ marginLeft: '3px' }}>{comments.length}</strong>
                        </Typography>
                    </div>
                </div>
                <div style={{ borderBottom: '1px solid #EAEAEA' }} />
                {/* {data !== '' ? <Viewer initialValue={data.content} /> : null} */}
                {data !== '' ? (
                    <div style={{ padding: '1rem' }}>
                        <Typography>{parse(DOMPurify.sanitize(data.content))}</Typography>
                    </div>
                ) : null}
                <div style={{ borderBottom: '1px solid #EAEAEA' }} />
                <div style={{ margin: '1rem 0' }}>
                    <Typography fontSize={20}>댓글</Typography>
                    {comments !== ''
                        ? comments.map((comment) => {
                              return (
                                  <div key={comment.id} ref={commentRef}>
                                      <Typography>닉네임: {comment.UserId}</Typography>
                                      <Typography>{comment.content}</Typography>
                                  </div>
                              );
                          })
                        : null}
                </div>
                <div style={{ borderBottom: '1px solid #EAEAEA' }} />
                <div style={{ margin: '1rem 0', display: 'flex', width: '100%', flexWrap: 'wrap' }}>
                    <Typography>댓글 작성</Typography>
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
                    <TextField sx={{ width: '100%', marginTop: '1rem' }} />
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#6EA5F8',
                                fontWeight: 900,
                                color: 'white',
                                boxShadow: 'none',
                                width: '10%',
                                margin: '1rem',
                                ':hover': { boxShadow: 'none' },
                            }}
                            onClick={goList}
                        >
                            등록
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#6EA5F8',
                                fontWeight: 900,
                                color: 'white',
                                boxShadow: 'none',
                                width: '10%',
                                margin: '1rem 0',
                                ':hover': { boxShadow: 'none' },
                            }}
                            onClick={goList}
                        >
                            등록 + 추천
                        </Button>
                    </div>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#6EA5F8',
                            fontWeight: 900,
                            color: 'white',
                            boxShadow: 'none',
                            width: '10%',
                            margin: '1rem 0',
                            ':hover': { boxShadow: 'none' },
                        }}
                        onClick={goList}
                    >
                        목록
                    </Button>
                </div>
            </Paper>
            {/* <Paper sx={{ height: '75%', width: '80%', margin: 'auto', padding: '2rem', marginBottom: '1rem' }}> */}
            {/* </Paper> */}
        </Background>
    );
};

export default PostViewer;
