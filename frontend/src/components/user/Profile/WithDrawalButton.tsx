import { Button } from '@mui/material';
import Modal from 'components/common/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'store/user';
import styled from 'styled-components';

interface userInfos {
    userId?: string;
}

const WithDrawalButton = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [open, setOpen] = useState(false);
    const { userId }: userInfos = userInfo;
    const navigate = useNavigate();

    const showModal = () => {
        setOpen(true);
    };

    const withdrawal = () => {
        let confirmWithdrawal = window.confirm('정말 탈퇴하시겠어요?');
        if (confirmWithdrawal) {
            // getWithdrawal(userId , password);
            alert('탈퇴 완료');
            navigate('/');
        } else {
            return;
        }
    };
    return (
        <>
            <Button variant="outlined" onClick={showModal}>
                회원 탈퇴
            </Button>
            {open && <Modal setOpen={setOpen} />}
        </>
    );
};

export default WithDrawalButton;
