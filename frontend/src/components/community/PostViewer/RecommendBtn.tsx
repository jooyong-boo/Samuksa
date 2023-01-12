import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import styled from 'styled-components';

const RecommendBtn = () => {
    return (
        <Container>
            <RecommendBox>
                <Button>
                    <AiOutlineDown />
                </Button>
                <RecommendNumberSpan>0</RecommendNumberSpan>
                <Button>
                    <AiOutlineUp />
                </Button>
            </RecommendBox>
        </Container>
    );
};

export default RecommendBtn;

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

const Button = styled.button`
    flex-grow: 1;
    border: none;
    background-color: white;
    margin: 5px;
    cursor: pointer;
    :hover {
        color: ${(props) => props.theme.colors.main};
    }
`;

const RecommendNumberSpan = styled.span`
    border-left: 1px solid #eaeaea;
    border-right: 1px solid #eaeaea;
    padding: 0.5rem 1rem;
`;