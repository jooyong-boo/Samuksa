import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useCreateComment = (commentIdx: number, comment: string, titleIdx: number | string) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => createComment(commentIdx, comment, titleIdx), {
        onSuccess: (res) => {
            queryClient.setQueryData(['comment'], () => res.data);
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            notifySuccess('댓글 등록 완료');
        },
    });
    return { mutate };
};
