import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 100,
        },
    },
};

const totalBoard = ['리뷰게시판', 'TIP게시판'];

interface BoardSelectProps {
    board: string;
    setBoard: Dispatch<SetStateAction<string>>;
}

const BoardSelect = ({ board, setBoard }: BoardSelectProps) => {
    const handleChangeBoard = (e: SelectChangeEvent<unknown>) => {
        e.preventDefault();
        setBoard(String(e.target.value));
    };
    return (
        <StyledSelect
            labelId="board"
            // defaultValue="게시판을 선택해주세요"
            value={board}
            MenuProps={MenuProps}
            displayEmpty
            fullWidth
            renderValue={board !== '' ? undefined : () => '게시판을 선택해주세요'}
            onChange={handleChangeBoard}
        >
            {totalBoard.map((val) => (
                <MenuItem key={val} value={val}>
                    {val}
                </MenuItem>
            ))}
        </StyledSelect>
    );
};

export default BoardSelect;

const StyledSelect = styled(Select)`
    background-color: white;
    border-radius: 5px;
    opacity: 0.8;
    height: 3rem;
    margin: 0.3rem 0 1rem 0;
`;
