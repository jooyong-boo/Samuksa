import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from 'api/post';
import { useNavigate } from 'react-router-dom';

export const useCreatePost = (content: string, title: string, type: number) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation(() => createPost(content, title, type), {
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['post', type] }).then(() => {
                if (type === 0) {
                    navigate(`/board/review/post/${res.data}`);
                }
                if (type === 1) {
                    navigate(`/board/tip/post/${res.data}`);
                }
            });
        },
    });
    return { mutate };
};
