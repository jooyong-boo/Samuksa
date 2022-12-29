import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from 'api/post';
import { useNavigate } from 'react-router-dom';

export const useCreatePost = (content: string, title: string, type: number) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation(() => createPost(content, title, type), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', type] }).then(() => {
                if (type === 0) {
                    navigate('/board/review');
                }
                if (type === 1) {
                    navigate('/board/tip');
                }
            });
        },
    });
    return { mutate };
};
