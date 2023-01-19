import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchReply } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useEditReply = (
    commentIdx: number | string,
    comment: string,
    titleIdx: number | string,
    commandIdx: number,
) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => patchReply(commentIdx, comment, titleIdx, commandIdx), {
        onSuccess: (res) => {
            queryClient.setQueryData(['comment'], res.data);
            notifySuccess('답글 수정 완료');
        },
    });
    return { mutate };
};
