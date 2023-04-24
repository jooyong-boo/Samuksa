import { getWithdrawal } from 'api/auth';
import Modal from 'components/common/Modal';
import { notifySuccess } from 'utils/notify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'components/common';

const WithDrawalButton = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setOpen(true);
    };

    const withdrawal = (userId: string, password: string): void => {
        let confirmWithdrawal = window.confirm('정말 탈퇴하시겠어요?');
        if (confirmWithdrawal) {
            getWithdrawal(userId, password).then((res) => {
                console.log(res);

                notifySuccess('탈퇴 완료');
                navigate('/');
            });
        }
    };
    return (
        <>
            <Button variant="outlined" onClick={showModal}>
                회원 탈퇴
            </Button>
            {open && <Modal setOpen={setOpen} withdrawal={withdrawal} />}
        </>
    );
};

export default WithDrawalButton;
