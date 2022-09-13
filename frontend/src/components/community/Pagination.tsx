import { List } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

interface pagination {
    total: number;
    limit: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    postPage: number;
    setPostPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ total, limit, page, setPage, postPage, setPostPage }: pagination) => {
    const numPages = Math.ceil(total / limit);
    const [totalPage, setTotalPage] = useState<any>([]);
    const [currentGroup, setCurrentGroup] = useState<any>([]);

    let pageArray: number[] = [];
    useEffect(() => {
        for (let i = 1; i <= numPages; i++) {
            pageArray.push(i);
        }
        setTotalPage([...pageArray]);
    }, [numPages]);

    let pageArr: number[] = [];
    const pagination = () => {
        for (let i = 0; i < totalPage.length; i += 10) {
            pageArr.push(totalPage.slice(i, i + 10));
        }
        return pageArr;
    };

    useEffect(() => {
        setCurrentGroup(pagination()[Math.floor((postPage - 1) / 10)]);
    }, [totalPage, postPage]);

    return (
        <>
            <List sx={{ display: 'flex', justifyContent: 'center' }}>
                <div>
                    <Button onClick={() => setPostPage(1)} disabled={postPage === 1}>
                        &lt;&lt;
                    </Button>
                    <Button onClick={() => setPostPage(postPage - 1)} disabled={postPage === 1}>
                        &lt;
                    </Button>
                </div>
                <div style={{ width: '20rem' }}>
                    {currentGroup &&
                        currentGroup.map((btn: number, i: number) => (
                            <Button
                                key={btn}
                                onClick={() => setPostPage(btn)}
                                aria-current={postPage === btn ? 'page' : undefined}
                            >
                                {btn}
                            </Button>
                        ))}
                </div>
                <div>
                    <Button onClick={() => setPostPage(postPage + 1)} disabled={postPage === numPages}>
                        &gt;
                    </Button>
                    <Button onClick={() => setPostPage(numPages)} disabled={postPage === numPages}>
                        &gt;&gt;
                    </Button>
                </div>
            </List>
        </>
    );
};

const Button = styled.button`
    border: none;
    padding: 0px 5px;
    margin: 0;
    background: white;
    color: #5a5a5a;
    font-size: 1rem;

    &:hover {
        color: #0098ee;
        font-weight: bold;
        cursor: pointer;
        transform: translateY(-1px);
    }

    &[disabled] {
        color: #0098ee;
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        color: #0098ee;
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
`;

export default Pagination;
