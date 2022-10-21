import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styled from 'styled-components';

const PostRecommendBtn = () => {
    return (
        <Container>
            <RecommendBox>
                <RecommendBtn>
                    <AiOutlineDown />
                </RecommendBtn>
                <RecommendNumberSpan>0</RecommendNumberSpan>
                <RecommendBtn>
                    <AiOutlineUp />
                </RecommendBtn>
            </RecommendBox>
        </Container>
    );
};

export default PostRecommendBtn;

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const RecommendBox = styled.div`
    border: 1px solid #eaeaea;
    display: flex;
    border-radius: 5px;
    margin: 1rem 0;
    width: 8rem;
    justify-content: center;
`;

const RecommendBtn = styled.button`
    flex-grow: 1;
    border: none;
    background-color: white;
    margin: 5px;
`;

const RecommendNumberSpan = styled.span`
    border-left: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
    padding: 0.5rem 1rem;
`;
