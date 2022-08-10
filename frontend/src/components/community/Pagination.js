import { List } from '@mui/material';
import usePagination from '@mui/material/usePagination/usePagination';
import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const Pagination = ({ total, limit, page, setPage, postPage, setPostPage }) => {
    const numPages = Math.ceil(total / limit);
    const [totalPage, setTotalPage] = useState([]);
    const [currentGroup, setCurrentGroup] = useState([]);

    let pageArray = [];
    useEffect(() => {
        for (let i = 1; i <= numPages; i++) {
            pageArray.push(i);
        }
        setTotalPage([...pageArray]);
    }, [numPages]);

    let pageArr = [];
    const pagination = () => {
        for (let i = 0; i < totalPage.length; i += 10) {
            pageArr.push(totalPage.slice(i, i + 10));
        }
        return pageArr;
    };

    useEffect(() => {
        setCurrentGroup(pagination(pageArr)[Math.floor((postPage - 1) / 10)]);
    }, [totalPage, postPage]);

    // console.log(currentGroup);

    return (
        <nav>
            <List sx={{ display: 'flex' }}>
                <Button onClick={() => setPostPage(1)} disabled={postPage === 1}>
                    &lt;&lt;
                </Button>
                <Button onClick={() => setPostPage(postPage - 1)} disabled={postPage === 1}>
                    &lt;
                </Button>
                {currentGroup &&
                    currentGroup.map((btn, i) => (
                        <Button
                            key={btn}
                            onClick={() => setPostPage(btn)}
                            aria-current={postPage === btn ? 'page' : null}
                        >
                            {btn}
                        </Button>
                    ))}
                <Button onClick={() => setPostPage(postPage + 1)} disabled={postPage === numPages}>
                    &gt;
                </Button>
                <Button onClick={() => setPostPage(numPages)} disabled={postPage === numPages}>
                    &gt;&gt;
                </Button>
            </List>
        </nav>
    );
};

const Button = styled.button`
    border: none;
    border-radius: 10px;
    padding: 8px;
    margin: 0;
    background: #6ea5f8;
    color: white;
    font-size: 1rem;
    margin: 0 1px;

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
