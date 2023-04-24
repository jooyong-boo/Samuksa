import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from 'api/post';
import { useNavigate } from 'react-router-dom';
import { notifySuccess } from 'utils/notify';

export const useDeletePost = (idx: string | number) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation(() => deletePost(idx), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] }).then(() => {
                navigate(-1);
                notifySuccess('삭제 완료');
            });
        },
    });
    return { mutate };
};
