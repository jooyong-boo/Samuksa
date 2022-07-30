import { List } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';
import React from 'react';
import styled from 'styled-components';

const Pagination = ({ total, limit, page, setPage }) => {
    const numPages = Math.ceil(total / limit);

    return (
        <nav>
            <List sx={{ display: 'flex' }}>
                <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    &lt;
                </Button>
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <Button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? 'page' : null}
                        >
                            {i + 1}
                        </Button>
                    ))}
                <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                    &gt;
                </Button>
            </List>
        </nav>
    );
};

const Button = styled.button`
    border: none;
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    background: #6ea5f8;
    color: white;
    font-size: 1rem;

    &:hover {
        background: #6ea5f8;
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        background: grey;
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background: #0098ee;
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
`;

export default Pagination;
