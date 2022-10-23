import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoState } from 'store/user';

interface userInfos {
    userId?: string;
}

const WithDrawalButton = () => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { userId }: userInfos = userInfo;
    const navigate = useNavigate();

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
        <Button variant="outlined" onClick={withdrawal}>
            회원 탈퇴
        </Button>
    );
};

export default WithDrawalButton;
