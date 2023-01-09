import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReply } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useCreateReply = (commentIdx: number, comment: string, titleIdx: number | string) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => createReply(commentIdx, comment, titleIdx), {
        onSuccess: (res) => {
            queryClient.setQueryData(['comment'], () => res.data);
            notifySuccess('답글 등록 완료');
        },
    });
    return { mutate };
};
