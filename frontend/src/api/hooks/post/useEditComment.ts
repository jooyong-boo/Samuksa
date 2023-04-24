import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchComment } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useEditComment = (comment: string, commentIdx: number | string) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => patchComment(comment, commentIdx), {
        onSuccess: (res) => {
            queryClient.setQueryData(['comment'], res.data);
            notifySuccess('수정 완료');
        },
    });
    return { mutate };
};
