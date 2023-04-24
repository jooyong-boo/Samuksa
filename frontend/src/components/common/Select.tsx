import { InputLabel, MenuItem, Select as MuiSelect, SelectChangeEvent } from '@mui/material';

interface SelectProps {
    label?: string;
    title?: string;
    datas: string[];
    onChange: (e: SelectChangeEvent<unknown>) => void;
    data: string;
    disabled?: boolean;
}

const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

const Select = (props: SelectProps) => {
    const { label, title, datas, onChange, data, disabled } = props;
    return (
        <>
            {label && <InputLabel id={label}>{label}</InputLabel>}
            <MuiSelect
                labelId={label}
                label={label}
                title={title ?? label}
                value={datas ? data : ''}
                onChange={onChange}
                MenuProps={MenuProps}
                fullWidth
                disabled={disabled ? true : false}
            >
                {datas &&
                    datas.map((data) => (
                        <MenuItem key={data} value={data}>
                            {data}
                        </MenuItem>
                    ))}
            </MuiSelect>
        </>
    );
};

export default Select;
