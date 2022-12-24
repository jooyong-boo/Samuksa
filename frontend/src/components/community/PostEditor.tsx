import { Button, FormControl, Paper, Typography } from '@mui/material';
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
import { useRecoilState, useRecoilValue } from 'recoil';
import { userImageState, userInfoSelector, userInfoState } from '../../store/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getRandomNumber } from './PostViewer';
import { getPostState } from '../../store/atom';
import UserInfo from './PostEditor/UserInfo';
import BoardSelect from './PostEditor/BoardSelect';
import { notifySuccess } from 'utils/notify';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
}

const PostEditor = () => {
    const navigate = useNavigate();
    const editorRef: any = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState(0);
    const [board, setBoard] = useState('');

    const postsRecoil = useRecoilValue<any[]>(getPostState);
    const userInfo = useRecoilValue(userInfoState);

    const { nickName }: userInfos = userInfo;
    const userImage = useRecoilValue(userImageState);

    const [transientStorage, setTransientStorage] = useState<any>([]);

    const location = useLocation();
    const prevLocation = location.state;

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
        const date = new Date().toISOString();
        let avatar = `https://randomuser.me/api/portraits/women/${getRandomNumber(1, 98)}.jpg`;
        let read = false;
        let id = postsRecoil.length + 1;
        const data = {
            createdAt: date,
            updatedAt: date,
            title,
            content,
            avatar,
            nickName,
            read,
            userId: id,
        };
        console.log(data);
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
                <EditorTypography>글작성</EditorTypography>
                <UserInfo />
                <FormControl fullWidth>
                    <Typography>게시판</Typography>
                    <BoardSelect board={board} setBoard={setBoard} />
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

export default PostEditor;

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
    box-shadow: none;
    font-weight: 600;
    &:hover {
        box-shadow: none;
    }
`;
