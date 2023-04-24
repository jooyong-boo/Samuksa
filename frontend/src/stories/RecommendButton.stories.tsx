import type { Meta, StoryObj } from '@storybook/react';

import { RecommendButton } from 'components/common';

const meta: Meta<typeof RecommendButton> = {
    title: 'Example/RecommendButton',
    component: RecommendButton,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecommendButton>;
let count = 0;
export const Primary: Story = {
    args: {
        recommendCount: count,
    },
};
