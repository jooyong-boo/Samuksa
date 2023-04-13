import { InputAdornment, TextField as MuiTextField } from '@mui/material';
import styled, { css } from 'styled-components';

interface IProps {
    id?: string;
    label?: string;
    type?: 'text' | 'password' | 'string';
    placeholder?: string;
    size?: 'medium' | 'small';
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    endAdornment?: string;
    opacity?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    color?: 'primary' | 'error';
    multiline?: boolean;
}

const TextField = (props: IProps) => {
    const { endAdornment = '', opacity = false, color = 'primary', type = 'text', multiline = false } = props;
    return (
        <StyledTextField
            type={type}
            variant="outlined"
            autoComplete="off"
            fullWidth
            InputProps={{
                endAdornment: endAdornment && <InputAdornment position="end">{endAdornment}</InputAdornment>,
            }}
            multiline={multiline}
            color={color}
            {...props}
            opacity={opacity ? 1 : 0}
        />
    );
};

export default TextField;

interface StyledTextFieldProps {
    opacity: number;
}

const StyledTextField = styled(MuiTextField)<StyledTextFieldProps>`
    border-radius: 5px;
    ${({ opacity }) =>
        opacity &&
        css`
            background-color: white;
            opacity: 0.8;
        `}
`;
