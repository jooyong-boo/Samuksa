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
    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        console.log(data);
    };
    const editorRef = useRef();
    console.log(editorRef);
    return (
        <Background>
            <Paper sx={{ height: '40rem', width: '95rem', margin: 'auto' }}>
                <AccountCircleIcon
                    sx={{
                        color: '#a2a5a9',
                        verticalAlign: 'middle',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                    }}
                />
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <Input id="title" placeholder="제목" sx={{ width: '40rem', fontSize: '2rem' }} />
                </FormControl>
                <Editor
                    ref={editorRef}
                    onChange={onChange}
                    placeholder="내용을 입력해주세요."
                    previewStyle="vertical" // 미리보기 스타일 지정
                    height="600px" // 에디터 창 높이
                    initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                    useCommandShortcut={false}
                    hideModeSwitch="true"
                    toolbarItems={[
                        // 툴바 옵션 설정
                        ['heading', 'bold', 'italic', 'strike'],
                        ['hr', 'quote'],
                        ['ul', 'ol', 'task', 'indent', 'outdent'],
                        ['table', 'image', 'link'],
                    ]}
                    plugins={[colorSyntax]}
                    // language="ko-KR"
                />
                <Button variant="contained">작성</Button>
            </Paper>
        </Background>
    );
};

export default Writing;
