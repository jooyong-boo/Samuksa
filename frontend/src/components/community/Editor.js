import { Button, FormControl, Input, InputLabel, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

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

const Writing = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setContent(data);
    };
    console.log(content);
    const onSave = ({ title, content }) => {
        const date = new Date();
        const a = {
            date: date,
            title: title,
            content: content,
        };
    };
    const editorRef = useRef();
    // console.log(editorRef);
    return (
        <Background>
            <Paper sx={{ height: '95%', width: '95rem', margin: 'auto', marginTop: '30px', padding: '20px' }}>
                <AccountCircleIcon
                    sx={{
                        color: '#a2a5a9',
                        verticalAlign: 'middle',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                    }}
                />{' '}
                ???????????? ????????????
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <Input
                        id="title"
                        placeholder="????????? ????????? ?????????"
                        sx={{ width: '40rem', fontSize: '2rem' }}
                        onChange={onTitleChange}
                    />
                </FormControl>
                <Editor
                    ref={editorRef}
                    onChange={onChange}
                    placeholder="????????? ????????? ?????????."
                    previewStyle="vertical" // ???????????? ????????? ??????
                    height="550px" // ????????? ??? ??????
                    initialEditType="wysiwyg" // ?????? ???????????? ??????(????????? markdown)
                    useCommandShortcut={false}
                    hideModeSwitch="true"
                    toolbarItems={[
                        // ?????? ?????? ??????
                        ['heading', 'bold', 'italic', 'strike'],
                        ['hr', 'quote'],
                        ['ul', 'ol', 'task', 'indent', 'outdent'],
                        ['table', 'image', 'link'],
                    ]}
                    plugins={[colorSyntax]}
                    language="ko-KR"
                />
                <div style={{ width: '99%', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button variant="contained" sx={{ width: '7rem', height: '3rem', marginRight: '1rem' }}>
                        ??????
                    </Button>
                    <Button variant="outlined" sx={{ width: '7rem', height: '3rem' }}>
                        ????????????
                    </Button>
                </div>
            </Paper>
        </Background>
    );
};

export default Writing;
