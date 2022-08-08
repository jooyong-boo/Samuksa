import { Button, ButtonGroup, FormControl, Input, MenuItem, Paper, Select, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [board, setBoard] = useState('');

    const userInfo = useRecoilValue(userInfoState);

    const goBack = () => {
        navigate(-1);
    };

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setContent(data);
    };
    console.log(title, content, board);

    // 임시저장 테스트중
    const transientStorage = () => {
        let data = {
            title,
            content,
            board,
        };
        if (localStorage.getItem('transientStorage')) {
            if (window.confirm('이미 임시저장한 글이 있습니다, 새로 저장할까요?')) {
                localStorage.setItem('transientStorage', JSON.stringify(data));
            } else {
                return;
            }
        }
        localStorage.setItem('transientStorage', JSON.stringify(data));
    };

    const onSave = ({ title, content }) => {
        const date = new Date();
        const data = {
            date: date,
            title: title,
            content: content,
        };
    };
    const editorRef = useRef(content);

    useEffect(() => {
        if (localStorage.getItem('transientStorage')) {
            const { title, content, board } = JSON.parse(localStorage.getItem('transientStorage'));
            if (window.confirm('임시저장된 글을 불러올까요?')) {
                setTitle(title);
                setContent(content);
                editorRef.current.getInstance().setHTML(content);
                setBoard(board);
            } else {
                return;
            }
        }
    }, []);

    return (
        <Background>
            <Paper
                sx={{
                    width: '80%',
                    height: '95%',
                    margin: 'auto',
                    marginTop: '30px',
                    padding: '20px',
                    overflow: 'auto',
                }}
            >
                <Typography
                    sx={{
                        color: '#575757',
                        padding: '0px 0px 13px 19px',
                        borderBottom: '1px solid #EAEAEA',
                        fontSize: '2rem',
                    }}
                >
                    글작성
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1rem' }}>
                    {userInfo ? (
                        <AccountCircleIcon
                            sx={{
                                color: '#6EA5F8',
                                verticalAlign: 'middle',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                    ) : (
                        <AccountCircleIcon
                            sx={{
                                color: '#a2a5a9',
                                verticalAlign: 'middle',
                                width: '40px',
                                height: '40px',
                            }}
                        />
                    )}
                    <Typography>{userInfo ? userInfo.userNikName : '비회원'}</Typography>
                </div>
                <FormControl fullWidth>
                    <Select
                        labelId="board"
                        // defaultValue="게시판을 선택해주세요"
                        value={board}
                        MenuProps={MenuProps}
                        displayEmpty
                        renderValue={board !== '' ? undefined : () => '게시판을 선택해주세요'}
                        onChange={(e) => {
                            setBoard(e.target.value);
                        }}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '5px',
                            opacity: '0.8',
                            width: '13rem',
                            margin: '0.5rem 0',
                        }}
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
                        value={title}
                        fullWidth
                        sx={{ width: '70rem', fontSize: '1.5rem', marginBottom: '0.5rem' }}
                        onChange={onTitleChange}
                    />
                </FormControl>
                <Editor
                    ref={editorRef}
                    onChange={onChange}
                    placeholder="내용을 입력하세요."
                    previewStyle="vertical" // 미리보기 스타일 지정
                    height="450px" // 에디터 창 높이
                    initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                    useCommandShortcut={false}
                    hideModeSwitch="true"
                    initialValue={content ? content : ''}
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
                    <Button
                        variant="contained"
                        sx={{
                            width: '7rem',
                            height: '3rem',
                            boxShadow: 'none',
                            backgroundColor: '#6EA5F8',
                            fontWeight: 900,
                            ':hover': { boxShadow: 'none' },
                        }}
                    >
                        등록
                    </Button>
                    <ButtonGroup variant="outlined" sx={{ width: '8rem', height: '3rem', margin: '0 1rem' }}>
                        <Button onClick={transientStorage}>임시저장</Button>
                        <Button>
                            {localStorage.getItem('transientStorage') &&
                                localStorage.getItem('transientStorage').length}
                        </Button>
                    </ButtonGroup>
                    <Button variant="outlined" sx={{ width: '7rem', height: '3rem' }} onClick={goBack}>
                        뒤로가기
                    </Button>
                </div>
            </Paper>
        </Background>
    );
};

export default Writing;
