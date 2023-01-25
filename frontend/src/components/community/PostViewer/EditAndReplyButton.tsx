import { Button, TextField } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

interface Iprops {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onClickCancel: () => void;
    onClickRegister: () => void;
    disable: string;
    placeholder: string;
}

const EditAndReplyButton = (props: Iprops) => {
    const { value, onChange, onClickCancel, onClickRegister, disable, placeholder } = props;
    return (
        <>
            <TextField
                fullWidth
                multiline
                inputProps={{ maxLength: 300 }}
                defaultValue={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            <ButtonArea>
                <CancleBtn variant="outlined" onClick={onClickCancel}>
                    취소
                </CancleBtn>
                <CustomBtn
                    variant="contained"
                    margin={'1rem 0 1rem 1rem'}
                    onClick={onClickRegister}
                    disabled={!disable}
                >
                    등록
                </CustomBtn>
            </ButtonArea>
        </>
    );
};

const ButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

interface CustomBtnProps {
    margin?: string;
    $marginRight?: string;
}

const CustomBtn = styled(Button)<CustomBtnProps>`
    background-color: ${({ theme }) => theme.colors.main};
    font-weight: 700;
    color: white;
    box-shadow: none;
    width: 7rem;
    height: 2.5rem;
    margin: ${(props) => `${props.margin}`};
    margin-right: ${(props) => `${props.$marginRight}`};
    :hover {
        box-shadow: none;
    }
`;

const CancleBtn = styled(CustomBtn)`
    background-color: white;
    color: #0098ee;
    width: 3.5rem;
`;

export default EditAndReplyButton;
