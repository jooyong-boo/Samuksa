import { FormControl, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import UserInfo from 'components/community/PostEditor/UserInfo';
import BoardSelect from 'components/community/PostEditor/BoardSelect';
import { notifyError, notifySuccess } from 'utils/notify';
import { useCreatePost } from 'api/hooks/post/useCreatePost';
import { Button } from 'components/common';

const WritingPage = () => {
    const navigate = useNavigate();
    const editorRef: any = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState(0);
    const [board, setBoard] = useState('');

    const [transientStorage, setTransientStorage] = useState<any>([]);

    const location = useLocation();
    const prevLocation = location.state;

    const { mutate: createPost } = useCreatePost(content, title, type);

    const goBack = () => {
        navigate(-1);
    };

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onChangeContent = () => {
        const data = editorRef.current?.getInstance().getHTML();
        setContent(data);
    };

    // 임시저장 테스트중
    const handleTransientStorage = () => {
        let data = [
            {
                title,
                content,
                board,
                type,
            },
        ];
        if (localStorage.getItem('transientStorage')) {
            if (window.confirm('이미 임시저장한 글이 있습니다, 새로 저장할까요?')) {
                setTransientStorage(data);
                localStorage.setItem('transientStorage', JSON.stringify(data));
                notifySuccess('임시저장 완료');
                return;
            } else {
                return;
            }
        } else {
            localStorage.setItem('transientStorage', JSON.stringify(data));
            setTransientStorage(data);
            notifySuccess('임시저장 완료');
        }
    };

    const handleDeleteTransientStorage = () => {
        if (localStorage.getItem('transientStorage')) {
            if (window.confirm('임시저장 글을 삭제할까요?')) {
                localStorage.removeItem('transientStorage');
                setTransientStorage([]);
                notifySuccess('삭제완료');
            }
        }
    };

    const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!title.length) {
            notifyError('제목을 작성해주세요');
            return;
        }
        if (!content.length) {
            notifyError('내용을 작성해주세요');
            return;
        }
        createPost();
    };

    useEffect(() => {
        if (localStorage.getItem('transientStorage')) {
            const { title, content, board } = JSON.parse(localStorage.getItem('transientStorage') || '{}')[0];
            if (window.confirm('임시저장된 글이 있습니다. 불러올까요?')) {
                setTransientStorage(JSON.parse(localStorage.getItem('transientStorage') || '{}'));
                setTitle(title);
                setContent(content);
                editorRef.current.getInstance().setHTML(content);
                setBoard(board);
            } else {
                return;
            }
        }
    }, []);

    useEffect(() => {
        if (prevLocation === '/review' && !localStorage.getItem('transientStorage')) {
            setBoard('리뷰게시판');
            setType(0);
        }
        if (prevLocation === '/tip' && !localStorage.getItem('transientStorage')) {
            setBoard('TIP게시판');
            setType(1);
        }
    }, []);

    return (
        <Background>
            <EditorPaper elevation={0}>
                <EditorTypography>글 작성</EditorTypography>
                <UserInfo />
                <FormControl fullWidth>
                    <Typography>게시판</Typography>
                    <BoardSelect board={board} setBoard={setBoard} setType={setType} />
                    <Typography>제목</Typography>
                    <BoardTitle placeholder="제목을 입력해 주세요" value={title} onChange={onChangeTitle} />
                </FormControl>
                <Editor
                    ref={editorRef}
                    onChange={onChangeContent}
                    placeholder="내용을 입력해주세요."
                    previewStyle="vertical" // 미리보기 스타일 지정
                    height="450px" // 에디터 창 높이
                    initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                    useCommandShortcut={false}
                    hideModeSwitch={true}
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
                <ButtonBox>
                    {transientStorage.length ? (
                        <CuntomBtn variant="outlined" margin={'0 0.5rem'} onClick={handleDeleteTransientStorage}>
                            임시저장 삭제
                        </CuntomBtn>
                    ) : (
                        <CuntomBtn variant="outlined" margin={'0 0.5rem'} onClick={handleTransientStorage}>
                            임시저장
                        </CuntomBtn>
                    )}
                    <CuntomBtn variant="outlined" margin={'0 0.5rem 0 0'} onClick={goBack}>
                        취소
                    </CuntomBtn>
                    <CuntomBtn variant="contained" onClick={onSave}>
                        등록
                    </CuntomBtn>
                </ButtonBox>
            </EditorPaper>
        </Background>
    );
};

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    padding-top: 70px;
    overflow: hidden;
    margin: auto;
`;

const EditorPaper = styled(Paper)`
    width: 80%;
    height: 95%;
    margin: auto;
    margin-top: 20px;
    padding: 20px;
    overflow: overlay;
    overflow-x: hidden;
    border: 1px solid rgb(225, 225, 225);
    &::-webkit-scrollbar {
        width: 5px;
        border-radius: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
    }
`;

const EditorTypography = styled(Typography)`
    color: #575757;
    padding: 0px 0px 13px 0px;
    border-bottom: 1px solid #eaeaea;
    font-size: 1.4rem;
    font-weight: 600;
`;

const BoardTitle = styled.input`
    height: 3rem;
    border-radius: 5px;
    border: 1px solid #d1d5d8;
    padding: 0 1rem;
    margin: 0.3rem 0 1rem 0;
`;

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

interface CustomBtnProps {
    margin?: string;
}

const CuntomBtn = styled(Button)<CustomBtnProps>`
    width: 7rem;
    height: 3rem;
    margin: ${(props) => `${props.margin}`};
    font-weight: 600;
`;

export default WritingPage;
