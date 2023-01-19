import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styled from 'styled-components';
import { HiOutlineTrash } from 'react-icons/hi';
import { TiEdit } from 'react-icons/ti';

interface Iprops {
    infoNickname: string;
    nickName: string;
    handleEdit: () => void;
    handleDelete: () => void;
    handleReply: () => void;
}

const CommentMenu = (props: Iprops) => {
    const { infoNickname, nickName, handleEdit, handleDelete, handleReply } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="comment-button"
                aria-controls={open ? 'comment-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </Button>
            {infoNickname === nickName ? (
                <Menu
                    id="comment-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'comment-button',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            handleEdit();
                            handleClose();
                        }}
                    >
                        <TiEdit />
                        <Text>수정하기</Text>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleDelete();
                            handleClose();
                        }}
                    >
                        <HiOutlineTrash />
                        <Text>삭제하기</Text>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleReply();
                            handleClose();
                        }}
                    >
                        <TiEdit />
                        <Text>답글달기</Text>
                    </MenuItem>
                </Menu>
            ) : (
                <Menu
                    id="comment-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'comment-button',
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            handleReply();
                            handleClose();
                        }}
                    >
                        <TiEdit />
                        <Text>답글달기</Text>
                    </MenuItem>
                </Menu>
            )}
        </div>
    );
};

const Text = styled.span`
    margin-left: 0.3rem;
`;

export default CommentMenu;
