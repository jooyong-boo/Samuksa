import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from 'components/common';

const meta: Meta<typeof TextField> = {
    title: 'Example/TextField',
    component: TextField,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Primary: Story = {
    args: {},
};
