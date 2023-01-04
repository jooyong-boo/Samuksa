import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from 'api/post';
import { useNavigate } from 'react-router-dom';

export const useDeletePost = (idx: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation(() => deletePost(idx), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] }).then(() => {
                navigate(-1);
            });
        },
    });
    return { mutate };
};
