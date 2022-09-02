import React from 'react';
import NicknameDate from './NicknameDate.json';

export const RandomNickname = () => {
    return NicknameDate.words[Math.floor(Math.random() * NicknameDate.words.length)];
};
