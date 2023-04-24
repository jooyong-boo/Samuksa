import styled from 'styled-components';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { Button } from 'components/common';

interface IProps {
    up: () => void;
    down: () => void;
    recommendCount: number;
}

const RecommendBtn = ({ recommendCount, up, down }: IProps) => {
    return (
        <Box>
            <Button onClick={down}>
                <AiOutlineDown />
            </Button>
            <NumberSpan>{recommendCount}</NumberSpan>
            <Button onClick={up}>
                <AiOutlineUp />
            </Button>
        </Box>
    );
};

export default RecommendBtn;

const Box = styled.div`
    display: inline-flex;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 5px;
`;

const NumberSpan = styled.span`
    padding: 0.5rem 1rem;
    border-left: 1px solid ${({ theme }) => theme.colors.gray};
    border-right: 1px solid ${({ theme }) => theme.colors.gray};
`;
