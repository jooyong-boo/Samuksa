import { Button, TextField } from 'components/common';
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
            <TextField multiline value={value} onChange={onChange} placeholder={placeholder} />
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
    font-weight: 700;
    width: 7rem;
    height: 2.5rem;
    margin: ${(props) => `${props.margin}`};
    margin-right: ${(props) => `${props.$marginRight}`};
`;

const CancleBtn = styled(CustomBtn)`
    background-color: white;
    color: ${({ theme }) => theme.colors.main};
    width: 3.5rem;
`;

export default EditAndReplyButton;
