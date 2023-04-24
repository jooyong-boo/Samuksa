import { InputAdornment, TextField as MuiTextField } from '@mui/material';

interface IProps {
    id?: string;
    label?: string;
    type?: 'text' | 'password' | 'string';
    placeholder?: string;
    size?: 'medium' | 'small';
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    endadornment?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    color?: 'primary' | 'error';
    multiline?: boolean;
}

const TextField = (props: IProps) => {
    const { endadornment = '', color = 'primary', type = 'text', multiline = false } = props;
    return (
        <MuiTextField
            type={type}
            variant="outlined"
            autoComplete="off"
            fullWidth
            InputProps={{
                endAdornment: endadornment && <InputAdornment position="end">{endadornment}</InputAdornment>,
            }}
            multiline={multiline}
            color={color}
            {...props}
        />
    );
};

export default TextField;
