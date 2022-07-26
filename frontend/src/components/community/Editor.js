import { FormControl, Input, InputLabel, Paper } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Background = styled.div`
    background-color: #ebecee;
    width: 100%;
    height: 100vh;
    padding-top: 70px;
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* flex-direction: column; */
    /* justify-content: center; */
    /* align-items: center; */
    overflow: hidden;
    margin: auto;
`;

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

const Writing = () => {
    const [value, setValue] = useState('');

    console.log(value);
    const onValueChange = useEffect(() => {
        setValue(value.normalize('NFC'));
    }, [value]);
    return (
        <Background>
            <Paper sx={{ height: '80%', width: '90%', margin: 'auto' }}>
                <AccountCircleIcon
                    sx={{
                        color: '#a2a5a9',
                        verticalAlign: 'middle',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                    }}
                />
                {/* <label htmlFor="">제목</label>
                <input type="text" /> */}
                <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                    <Input id="title" placeholder="제목" sx={{ width: '90%', fontSize: '2rem' }} />
                </FormControl>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onValueChange}
                    formats={formats}
                    modules={modules}
                    style={{ height: '90%', verticalAlign: 'center', overflow: 'auto' }}
                />
            </Paper>
        </Background>
    );
};

export default Writing;
