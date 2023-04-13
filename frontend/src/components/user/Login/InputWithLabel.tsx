import { Typography } from '@mui/material';
import { TextField } from 'components/common';
import { useRecoilState } from 'recoil';
import { userLoginFormState } from 'store/user';
import styled from 'styled-components';

interface InputWithLabelProps {
    label: string;
    value: string;
    handleEnterLogin: (e: React.KeyboardEvent) => void;
    id: string;
    type: 'string' | 'password';
}

const InputWithLabel = ({ label, value, handleEnterLogin, id, type }: InputWithLabelProps) => {
    const [userForm, setUserForm] = useRecoilState(userLoginFormState);

    const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setUserForm({ ...userForm, [id]: value });
    };

    return (
        <>
            <CustomTypography>{label}</CustomTypography>
            <TextField
                id={id}
                placeholder={`${label} 입력`}
                size="small"
                type={type}
                value={value}
                onKeyPress={handleEnterLogin}
                onChange={handleChangeInput}
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
