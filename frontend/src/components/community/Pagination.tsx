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

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [reactionBtn, setReactionBtn] = useState(10);

    let pageArray: number[] = [];
    useEffect(() => {
        for (let i = 1; i <= numPages; i++) {
            pageArray.push(i);
        }
        setTotalPage([...pageArray]);
    }, [numPages]);

    let pageArr: number[] = [];
    const pagination = () => {
        for (let i = 0; i < totalPage.length; i += reactionBtn) {
            pageArr.push(totalPage.slice(i, i + reactionBtn));
        }
        return pageArr;
    };

    function getWindowDimensions() {
        const { innerWidth: width } = window;
        return {
            width,
        };
    }

    useEffect(() => {
        setCurrentGroup(pagination()[Math.floor((postPage - 1) / reactionBtn)]);
    }, [totalPage, postPage, reactionBtn]);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions]);

    useEffect(() => {
        if (windowDimensions.width < 501) {
            setReactionBtn(8);
        } else {
            setReactionBtn(10);
        }
    }, [windowDimensions]);

    return (
        <>
            <List sx={{ display: 'flex', justifyContent: 'center', width: '80%' }}>
                <div>
                    <Button onClick={() => setPostPage(1)} disabled={postPage === 1}>
                        &lt;&lt;
                    </Button>
                    <Button onClick={() => setPostPage(postPage - 1)} disabled={postPage === 1}>
                        &lt;
                    </Button>
                </div>
                <div style={{ margin: '0 1rem' }}>
                    {currentGroup &&
                        currentGroup.map((btn: number) => (
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
    /* padding: 0px 0.4rem; */
    margin: 0 0.4rem;
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
