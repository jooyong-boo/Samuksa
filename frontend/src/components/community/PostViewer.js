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
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    padding-top: 70px;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    overflow: hidden;
    margin: auto;
`;

const PostViewer = () => {
    const navigate = useNavigate();
    const [data, setData] = useState('');

    const { id } = useParams();
    // console.log(id);

    const getPostsId = async (id) => {
        try {
            const { data } = await axios.get(`https://koreanjson.com/posts/${id}`);
            setData(data);
        } catch (err) {
            console.log(err.response);
        }
    };

    useEffect(() => {
        getPostsId(id);
    }, []);
    // console.log(data);

    const goList = () => {
        navigate(-1);
    };

    const html = '<h3> html 헤더 <span style="color:blue;">파란색</span></h3>';

    return (
        <Background>
            <Paper sx={{ height: '95%', width: '50rem', margin: 'auto', marginTop: '30px', padding: '20px' }}>
                <Typography>제목: {data.title}</Typography>
                {data !== '' ? <Viewer initialValue={data.content} /> : null}
                <Typography>날짜: {data.createdAt}</Typography>
                <Button variant="contained" onClick={goList}>
                    목록
                </Button>
            </Paper>
        </Background>
    );
};

export default PostViewer;
