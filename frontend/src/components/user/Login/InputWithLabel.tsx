import { TextField, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import { userLoginFormState } from 'store/user';
import styled from 'styled-components';

interface InputWithLabelProps {
    label: string;
    value: string;
    handleEnterLogin: (e: React.KeyboardEvent) => void;
    id: string;
    type: string;
}

const InputWithLabel = ({ label, value, handleEnterLogin, id, type }: InputWithLabelProps) => {
    const [userForm, setUserForm] = useRecoilState(userLoginFormState);

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUserForm({ ...userForm, [id]: value });
    };

    return (
        <>
            <CustomTypography>{label}</CustomTypography>
            <TextField
                id={id}
                variant="outlined"
                size="small"
                placeholder={`${label} 입력`}
                type={type}
                fullWidth
                onChange={handleChangeInput}
                value={value}
                onKeyPress={handleEnterLogin}
            />
        </>
    );
};

export default InputWithLabel;

const CustomTypography = styled(Typography)`
    font-size: ${(props) => (props.fontSize ? `${props.fontSize}` : '1rem')};
    color: ${(props) => (props.color ? `${props.color}` : 'black')};
    font-weight: bold;
    margin-bottom: 0.3rem;
    text-align: left;
`;
