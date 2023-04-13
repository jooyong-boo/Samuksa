import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 70px;
    overflow: hidden;
`;

const Card = styled.div`
    background-color: white;
    width: 25rem;
    height: 35rem;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const UserInfo = () => {
    return (
        <Background>
            <Card>회원정보</Card>
        </Background>
    );
};

export default UserInfo;
