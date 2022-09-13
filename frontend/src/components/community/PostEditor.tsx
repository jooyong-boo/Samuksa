import { Avatar, Button, ButtonGroup, FormControl, Input, MenuItem, Paper, Select, Typography } from '@mui/material';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserInfo } from '../../api/auth';

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

interface userInfos {
    userId?: string;
    userNickName?: string;
    userEmail?: string;
}

const PostEditor = () => {
    const notify = (text: string) => {
        dismissAll();
        toast.success(text, {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: true,
        });
    };
    const dismissAll = () => toast.dismiss();

    const navigate = useNavigate();
    const editorRef: any = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [board, setBoard] = useState('');

    const userInfo = useRecoilValue(userInfoState);

    const { userNickName }: userInfos = userInfo;
    const userImage = useRecoilValue(userImageState);

    const [transientStorage, setTransientStorage] = useState<any>([]);

    const location = useLocation();
    const prevLocation = location.state;

    const goBack = () => {
        navigate(-1);
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onChange = () => {
        const data = editorRef.current?.getInstance().getHTML();
        setContent(data);
    };
    // console.log(title, content, board);

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
                notify('임시저장 완료');
                return;
            } else {
                return;
            }
        } else {
            localStorage.setItem('transientStorage', JSON.stringify(data));
            setTransientStorage(data);
            notify('임시저장 완료');
        }
    };

    const handleDeleteTransientStorage = () => {
        if (localStorage.getItem('transientStorage')) {
            if (window.confirm('임시저장 글을 삭제할까요?')) {
                localStorage.removeItem('transientStorage');
                setTransientStorage([]);
                notify('삭제완료');
            }
        }
    };

    const onSave = (e: React.MouseEvent<HTMLButtonElement>) => {
        const date = new Date();
        const data = {
            date,
            title,
            content,
        };
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
        }
        if (prevLocation === '/tip' && !localStorage.getItem('transientStorage')) {
            setBoard('꿀팁게시판');
        }
    }, []);

    return (
        <Background>
            <EditorPaper elevation={0}>
                <EditorTypography>글작성</EditorTypography>
                <EditorUserInfoBox>
                    {userInfo && (
                        <>
                            <UserAvatar src={userImage} />
                            <UserTypography>{userNickName}</UserTypography>
                        </>
                    )}
                </EditorUserInfoBox>
                <FormControl fullWidth>
                    <Typography>게시판</Typography>
                    <BoardSelect
                        labelId="board"
                        // defaultValue="게시판을 선택해주세요"
                        value={board}
                        MenuProps={MenuProps}
                        displayEmpty
                        fullWidth
                        renderValue={board !== '' ? undefined : () => '게시판을 선택해주세요'}
                        onChange={(e) => {
                            setBoard(String(e.target.value));
                        }}
                    >
                        {totalBoard.map((val) => (
                            <MenuItem key={val} value={val}>
                                {val}
                            </MenuItem>
                        ))}
                    </BoardSelect>
                    <Typography>제목</Typography>
                    <BoardTitle placeholder="제목을 입력해 주세요" value={title} onChange={onTitleChange} />
                </FormControl>
                <Editor
                    ref={editorRef}
                    onChange={onChange}
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
                    <SubmitBtn variant="contained" onClick={onSave}>
                        등록
                    </SubmitBtn>
                    {transientStorage.length ? (
                        // <ButtonGroup variant="outlined" sx={{ width: '10rem', height: '3rem', marginLeft: '1rem' }}>
                        //     <Button onClick={transientStorage}>임시저장</Button>
                        // </ButtonGroup>
                        <CuntomBtn variant="outlined" margin={'0 0.5rem'} onClick={handleDeleteTransientStorage}>
                            임시저장 삭제
                        </CuntomBtn>
                    ) : (
                        <CuntomBtn variant="outlined" margin={'0 0.5rem'} onClick={handleTransientStorage}>
                            임시저장
                        </CuntomBtn>
                    )}
                    <CuntomBtn variant="outlined" onClick={goBack}>
                        취소
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
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
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
    padding: 0px 0px 13px 19px;
    border-bottom: 1px solid #eaeaea;
    font-size: 1.4rem;
    font-weight: 600;
`;

const EditorUserInfoBox = styled.div`
    display: flex;
    align-items: center;
    padding-top: 1rem;
    margin-bottom: 0.5rem;
`;

const UserAvatar = styled(Avatar)`
    background-color: #0098ee;
    color: white;
    vertical-align: middle;
    width: 40px;
    height: 40px;
    margin-right: 0.3rem;
`;

const UserTypography = styled(Typography)`
    font-size: 1.2rem;
    font-weight: medium;
`;

const BoardSelect = styled(Select)`
    background-color: white;
    border-radius: 5px;
    opacity: 0.8;
    height: 3rem;
    margin: 0.3rem 0 1rem 0;
`;

const BoardTitle = styled.input`
    height: 3rem;
    border-radius: 5px;
    border: 1px solid #d1d5d8;
    padding: 0 1rem;
    margin: 0.3rem 0 1rem 0;
`;

const ButtonBox = styled.div`
    width: 99%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
`;

const SubmitBtn = styled(Button)`
    width: 7rem;
    height: 3rem;
    box-shadow: none;
    background-color: #0098ee;
    font-weight: 700;
    &:hover {
        box-shadow: none;
    }
`;

interface CustomBtnProps {
    margin?: string;
}

const CuntomBtn = styled(Button)<CustomBtnProps>`
    width: 7rem;
    height: 3rem;
    margin: ${(props) => `${props.margin}`};
`;