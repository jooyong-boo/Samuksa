import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components';
import { Button, Paper, Typography } from '@mui/material';
// import { getPostsId } from '../../api/post';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
            <Paper sx={{ height: '75%', width: '80%', margin: 'auto', marginTop: 'auto' }}>
                <Typography>제목: {data.title}</Typography>
                {data !== '' ? <Viewer initialValue={data.content} /> : null}
                <Typography>날짜: {data.createdAt}</Typography>
                <Button variant="contained" onClick={goList}>
                    목록
                </Button>
            </Paper>
            <Paper sx={{ height: '75%', width: '80%', margin: 'auto', marginTop: 'auto' }}>
                <Typography fontSize={30}>댓글</Typography>
                {comments !== ''
                    ? comments.map((comment) => {
                          return (
                              <div key={comment.id}>
                                  <Typography>닉네임: {comment.UserId}</Typography>
                                  <Typography>{comment.content}</Typography>
                              </div>
                          );
                      })
                    : null}
            </Paper>
        </Background>
    );
};

export default PostViewer;
