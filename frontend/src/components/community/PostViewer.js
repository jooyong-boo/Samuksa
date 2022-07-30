import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components';
import { Paper } from '@mui/material';
// import { getPostsId } from '../../api/post';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const [data, setData] = useState('');

    const { id } = useParams();
    console.log(id);

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
    console.log(data);

    return (
        <Background>
            <Paper sx={{ height: '95%', width: '95rem', margin: 'auto', marginTop: '30px', padding: '20px' }}>
                <Viewer initiasValue={data.title} />
                <div>{data.title}</div>
                <div>{data.content}</div>
                <div>{data.createdAt}</div>
            </Paper>
        </Background>
    );
};

export default PostViewer;
