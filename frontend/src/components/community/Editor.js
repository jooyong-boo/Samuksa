import { Button, FormControl, Input, InputLabel, MenuItem, Paper, Select } from '@mui/material';
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

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};
const totalBoard = ['리뷰게시판', '꿀팁게시판'];

const Writing = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [board, setBoard] = useState('리뷰게시판');
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
            <Paper
                sx={{
                    height: '95%',
                    width: '95rem',
                    margin: 'auto',
                    marginTop: '30px',
                    padding: '20px',
                    overflow: 'auto',
                }}
            >
                <AccountCircleIcon
                    sx={{
                        color: '#a2a5a9',
                        verticalAlign: 'middle',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                    }}
                />{' '}
                유저정보 보이는곳
                <FormControl fullWidth>
                    <Select
                        labelId="local"
                        // label="지역"
                        defaultValue={'리뷰게시판'}
                        value={board}
                        MenuProps={MenuProps}
                        placeholder="게시판 선택"
                        // fullWidth
                        onChange={(e) => {
                            setBoard(e.target.value);
                        }}
                        sx={{ backgroundColor: 'white', borderRadius: '5px', opacity: '0.8', width: '10rem' }}
                    >
                        {totalBoard.map((val) => (
                            <MenuItem key={val} value={val}>
                                {val}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <Input
                        id="title"
                        placeholder="제목을 입력해 주세요"
                        sx={{ width: '40rem', fontSize: '2rem' }}
                        onChange={onTitleChange}
                    />
                </FormControl>
                <Editor
                    ref={editorRef}
                    onChange={onChange}
                    placeholder="내용을 입력해 주세요."
                    previewStyle="vertical" // 미리보기 스타일 지정
                    height="450px" // 에디터 창 높이
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
                    language="ko-KR"
                />
                <div style={{ width: '99%', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <Button variant="contained" sx={{ width: '7rem', height: '3rem', marginRight: '1rem' }}>
                        작성
                    </Button>
                    <Button variant="outlined" sx={{ width: '7rem', height: '3rem' }}>
                        임시저장
                    </Button>
                </div>
            </Paper>
        </Background>
    );
};

export default Writing;
