import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useCreateComment = (commentIdx: number, comment: string, titleIdx: number) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => createComment(commentIdx, comment, titleIdx), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post'] }).then(() => {
                notifySuccess('수정 완료');
            });
        },
    });
    return { mutate };
};
