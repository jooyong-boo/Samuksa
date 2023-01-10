import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams } from 'react-router-dom';

interface IProps {
    delete: (idx: number | string) => void;
}

const PostMenu = ({ ...props }: IProps) => {
    const { id } = useParams<{ id: string }>();
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
                id="basic-button"
                aria-controls={open ? 'post-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon sx={{ color: '#0098ee' }} />
            </Button>
            <Menu
                id="post-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'post-button',
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleClose();
                    }}
                >
                    수정하기
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        props.delete(id!);
                    }}
                >
                    삭제하기
                </MenuItem>
            </Menu>
        </div>
    );
};

export default PostMenu;
