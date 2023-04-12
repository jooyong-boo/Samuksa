import { Button as MuiButton } from '@mui/material';
import styled, { css } from 'styled-components';

interface IProps {
    rounded: boolean;
    variant: 'text' | 'outlined' | 'contained';
    children: React.ReactNode;
}

const Button = ({ children, ...props }: IProps) => {
    const { rounded, variant = 'contained' } = props;
    return (
        <StyledButton variant={variant} rounded={rounded ? 'true' : 'false'}>
            {children}
        </StyledButton>
    );
};

export default Button;

interface StyledButtonProps {
    rounded: string;
    variant: string;
}

const StyledButton = styled(MuiButton)<StyledButtonProps>`
    width: 100%;
    height: 2.5rem;
    :hover {
        box-shadow: none;
    }
    ${(props) => {
        switch (props.variant) {
            case 'outlined':
                return css`
                    border: 0.5px solid ${({ theme }) => theme.colors.main};
                    color: ${({ theme }) => theme.colors.main};
                    :hover {
                        background-color: rgb(229, 231, 235);
                    }
                `;
            case 'contained':
                return css`
                    background-color: ${({ theme }) => theme.colors.main};
                    box-shadow: none;
                `;
        }
        switch (props.rounded) {
            case 'true':
                return css`
                    border-radius: 20px;
                `;
            default:
        }
    }}/* width: 6rem;
    height: 2.5rem;
    border-radius: 20px;
    :hover {
        box-shadow: none;
    } */
`;
