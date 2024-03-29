import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from 'store/user';
import { notifyError } from 'utils/notify';
import { Button } from 'components/common';

const WriteBtn = () => {
    const userInfo = useRecoilValue<any>(userInfoState);
    let navigate = useNavigate();

    const goWriting = () => {
        if (Object.keys(userInfo).length) {
            navigate('/write', { state: '/review' });
        } else {
            navigate('/login');
            notifyError('글작성을 하려면 로그인해야합니다.');
        }
    };
    return (
        <StyledBtn variant="contained" onClick={goWriting}>
            <StyleCreateIcon />
            글쓰기
        </StyledBtn>
    );
};

export default WriteBtn;

const StyledBtn = styled(Button)`
    font-weight: 700;
    width: 6rem;
    height: 2.5rem;
    padding: 6px 1rem 6px 0.9rem;
    border-radius: 7px;
`;

const StyleCreateIcon = styled(CreateIcon)`
    margin-right: 0.4rem;
    width: 1.3rem;
`;
