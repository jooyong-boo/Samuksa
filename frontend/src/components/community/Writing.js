import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';

const Background = styled.div`
    background-color: #ebecee;
    width: 100%;
    height: 100vh;
    padding-top: 70px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    margin: auto;
`;

const Writing = () => {
    const [value, setValue] = useState('');
    return (
        <Background>
            <ReactQuill theme="snow" value={value} onChange={setValue} />;
        </Background>
    );
};

export default Writing;
