import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components';
import { Paper } from '@mui/material';

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

const contents = '안녕하세요';
const PostViewer = ({ contents }) => {
    return (
        <Background>
            <Paper sx={{ height: '95%', width: '95rem', margin: 'auto', marginTop: '30px', padding: '20px' }}>
                <Viewer initialValue={contents || ''} />
            </Paper>
        </Background>
    );
};

export default PostViewer;
