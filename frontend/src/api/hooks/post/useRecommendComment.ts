import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recommendComment } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useRecommendComment = (titleIdx: number | string, commentIdx: number | string, recommend: boolean) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(() => recommendComment(titleIdx, commentIdx, recommend), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comment'] }).then(() => {});
        },
    });
    return { mutate };
};
