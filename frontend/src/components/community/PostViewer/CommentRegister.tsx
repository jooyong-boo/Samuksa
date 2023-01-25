import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { notifyError, notifySuccess } from 'utils/notify';
import { useCreateComment } from 'api/hooks/post/useCreateComment';

interface UserInfoProps {
    userId: string;
    nickName: string;
    email: string;
    profileImage: string;
}

interface CommentProps {
    comments: any[];
    setComments: Dispatch<SetStateAction<any>>;
    userInfo: UserInfoProps;
    loginStatus: boolean;
    titleIdx: string;
}

const CommentRegister = ({ comments, setComments, userInfo, loginStatus, titleIdx }: CommentProps) => {
    const [newComment, setNewComment] = useState('');
    const { mutate: createComment } = useCreateComment(comments.length, newComment, titleIdx, userInfo);

    const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(e.target.value);
    };

    const commentRegister = (e: React.KeyboardEvent | React.MouseEvent) => {
        if ((e as React.KeyboardEvent).key === 'Enter' || (e as React.MouseEvent).type === 'click') {
            e.preventDefault();
            if (!newComment.length) {
                return;
            }
            if (userInfo && newComment) {
                createComment();
                setNewComment('');
            } else if (!userInfo) {
                notifyError('로그인 해주세요');
            } else if (!newComment) {
                notifyError('댓글을 작성해주세요');
            }
        }
    };
    return (
        <Container>
            <div>
                <TextField
                    sx={{ width: '100%' }}
                    multiline
                    inputProps={{ maxLength: 300 }}
                    value={newComment}
                    placeholder={loginStatus ? '댓글을 남겨보세요' : ''}
                    disabled={!loginStatus}
                    onChange={handleChangeComment}
                    onKeyPress={commentRegister}
                />
                {!loginStatus ? (
                    <StyledPlaceholder>
                        댓글을 쓰려면 <CustomNavLink to="/login">로그인</CustomNavLink>이 필요합니다.
                    </StyledPlaceholder>
                ) : null}
            </div>
            <RegisterBtnBox>
                <CustomBtn variant="contained" margin={'1rem 0'} onClick={commentRegister} disabled={!newComment}>
                    등록
                </CustomBtn>
            </RegisterBtnBox>
        </Container>
    );
};

export default CommentRegister;

const Container = styled.div`
    flex-grow: 1;
`;

const StyledPlaceholder = styled.span`
    position: relative;
    bottom: 3rem;
    margin-left: 1rem;
    color: #6b7280;
    font-size: 0.95rem;
`;

const CustomNavLink = styled(NavLink)`
    text-decoration: none;
    color: #0098ee;
`;

const RegisterBtnBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

interface CustomBtnProps {
    margin?: string;
    $marginRight?: string;
}

const CustomBtn = styled(Button)<CustomBtnProps>`
    background-color: ${({ theme }) => theme.colors.main};
    font-weight: 700;
    color: white;
    box-shadow: none;
    width: 7rem;
    height: 2.5rem;
    margin: ${(props) => `${props.margin}`};
    margin-right: ${(props) => `${props.$marginRight}`};
    :hover {
        box-shadow: none;
    }
`;
