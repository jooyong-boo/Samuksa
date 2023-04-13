import { Typography } from '@mui/material';
import Button from 'components/common/Button';
import React, { useState } from 'react';
import styled from 'styled-components';

interface ModalProps {
    setOpen: (x: boolean) => void;
    withdrawal: (userId: string, password: string) => void;
}

const Modal = ({ setOpen, withdrawal }: ModalProps) => {
    const [userInfo, setUserInfo] = useState({
        userId: '',
        password: '',
    });
    const { userId, password } = userInfo;

    const closeModal = () => {
        setOpen(false);
    };

    const onCloseModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleChangeUserInfo = (e: React.ChangeEvent) => {
        let target = e.target.id;
        let newValue = (e.target as HTMLInputElement).value;
        setUserInfo({ ...userInfo, [target]: newValue });
    };

    return (
        <Container onClick={onCloseModal}>
            <ModalBox>
                <Typography sx={{ textAlign: 'center' }}>회원탈퇴</Typography>
                <ButtonBox>
                    <StyledInput
                        id="userId"
                        type="text"
                        placeholder="아이디를 입력해주세요"
                        autoComplete="off"
                        onChange={handleChangeUserInfo}
                    />
                    <StyledInput
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        autoComplete="off"
                        onChange={handleChangeUserInfo}
                    />
                    <StyledButton variant="outlined" onClick={closeModal}>
                        닫기
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        onClick={() => {
                            withdrawal(userId, password);
                        }}
                    >
                        회원탈퇴
                    </StyledButton>
                </ButtonBox>
            </ModalBox>
        </Container>
    );
};

export default Modal;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: rgba(128, 128, 128, 0.5);
    position: fixed;
`;

const ModalBox = styled.div`
    width: 300px;
    height: 300px;
    z-index: 999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    align-items: center;
`;

const StyledButton = styled(Button)`
    width: 7rem;
    margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
`;
