import styled from 'styled-components';

const BookmarkPage = () => {
    return <Background>즐겨찾기</Background>;
};

export default BookmarkPage;

const Background = styled.div`
    background-color: #ebecee;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 60px;
    overflow: hidden;
`;
