import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useDeleteComment = (idx: string | number) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => deleteComment(idx), {
        onSuccess: (res) => {
            queryClient.setQueryData(['comment'], res.data);
            notifySuccess('댓글 삭제 완료');
        },
    });
    return { mutate };
};
