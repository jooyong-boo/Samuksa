import {
    Avatar,
    createTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider,
    Typography,
} from '@mui/material';
import timeForToday from 'components/utils/TimeForToday';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const reviewBoardHead = ['No', '제목', '글쓴이', '작성시간', '추천수', '조회수'];

interface TalbeBoardProps {
    usePosts: any[];
    offset: number;
    limit: number;
}

const TableBoard = ({ usePosts, offset, limit }: TalbeBoardProps) => {
    const AddReadPost = (id: number) => {
        let readPost: any = localStorage.getItem('reviewReadPost');
        if (readPost?.length) {
            let newReadPost: any = [...JSON.parse(readPost), id];
            localStorage.setItem('reviewReadPost', JSON.stringify(newReadPost));
        } else {
            localStorage.setItem('reviewReadPost', JSON.stringify([id]));
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <CustomTableContainer>
                <Table aria-label="review table">
                    <TableHead>
                        <TableRow>
                            {reviewBoardHead.map((item) => (
                                <TableCell key={item} sx={tableTopTextStyle}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usePosts.slice(offset, offset + limit).map((item: any) => {
                            const { id, title, UserId, createdAt, read, nickName, avatar } = item;
                            const newCreateAt = new Date(createdAt);
                            const year = newCreateAt.getFullYear();
                            const month = newCreateAt.getMonth();
                            const date = newCreateAt.getDate();

                            return (
                                <TableRow
                                    key={id}
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        ':hover': {
                                            backgroundColor: '#F4F4F4',
                                        },
                                    }}
                                >
                                    <TableCell sx={tableTextStyle}>{id}</TableCell>
                                    <TableCell component="th" scope="row" sx={titleTextStyle}>
                                        <TitleNavLink
                                            to={`post/${id}`}
                                            read={read ? 'true' : ''}
                                            onClick={() => {
                                                AddReadPost(id);
                                            }}
                                        >
                                            {title}
                                            {/* <Typography>
                                            {postComment.length > 0 ? postComment[id - 1].length : ''}
                                        </Typography> */}
                                        </TitleNavLink>
                                    </TableCell>
                                    <TableCell sx={tableTextStyle}>
                                        <PostUserInfoDiv>
                                            <StyledAvatar src={avatar} />
                                            <NickNameInfo>{nickName}</NickNameInfo>
                                        </PostUserInfoDiv>
                                    </TableCell>
                                    <TableCell sx={tableTextStyle}>{timeForToday(createdAt)}</TableCell>
                                    <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                    <TableCell sx={tableTextStyle}>{UserId}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CustomTableContainer>
        </ThemeProvider>
    );
};

export default TableBoard;

const CustomTableContainer = styled(TableContainer)`
    border-top: 1px solid #a7a7a7;
    border-bottom: 1px solid #a7a7a7;
    border-radius: 0;
    max-height: 600px;
    ${({ theme }) => theme.device.tablet} {
        display: none;
    }
`;

interface TitleNavLinkProps {
    read: string;
}

const TitleNavLink = styled(NavLink)<TitleNavLinkProps>`
    color: ${(props) => (props.read ? '#770088' : '#374151')};
    text-decoration: none;
    font-size: 0.875rem;
    ${({ theme }) => theme.device.tablet} {
        font-size: 0.95rem;
    }
    ${({ theme }) => theme.device.mobile} {
        font-size: 0.95rem;
    }
`;

const PostUserInfoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: auto;
`;

const StyledAvatar = styled(Avatar)`
    width: 2rem;
    height: 2rem;
`;

const NickNameInfo = styled(Typography)`
    display: flex;
    margin-left: 0.5rem;
    font-size: 0.8rem;
`;

const theme = createTheme({
    typography: {
        fontSize: 10,
        fontFamily: 'Pretendard',
    },
    palette: {
        primary: {
            main: '#374151',
        },
    },
});

const tableTopTextStyle = {
    color: '#374151',
    textAlign: 'center',
    fontSize: '0.875rem',
    padding: '12px 0px',
};

const tableTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#374151',
    textAlign: 'center',
    fontSize: '0.875rem',
    maxWidth: '130px',
};

const titleTextStyle = {
    padding: '8px 16px 8px 16px',
    color: '#374151',
    textAlign: 'center',
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    ':hover': {
        fontWeight: 'bold',
    },
};