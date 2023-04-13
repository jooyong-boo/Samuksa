import { Button as MuiButton } from '@mui/material';
import { ReactNode, MouseEvent } from 'react';
import styled, { css } from 'styled-components';

interface IProps {
    rounded?: boolean;
    variant?: 'text' | 'outlined' | 'contained';
    children: ReactNode;
    onClick: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const Button = ({ ...props }: IProps) => {
    const { children, rounded = false, variant = 'text', type = 'button', ...rest } = props;
    return (
        <StyledButton variant={variant} rounded={rounded ? 1 : 0} type={type} {...rest}>
            {children}
        </StyledButton>
    );
};

export default Button;

interface StyledButtonProps {
    rounded: number;
    variant: string;
}

const StyledButton = styled(MuiButton)<StyledButtonProps>`
    :hover {
        box-shadow: none;
    }
    &:disabled {
        background-color: rgba(0, 152, 238, 0.3);
        color: #ffffff;
    }
    ${({ rounded }) =>
        rounded &&
        css`
            border-radius: 20px;
        `}
    ${({ variant }) => {
        switch (variant) {
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
    }}
`;
