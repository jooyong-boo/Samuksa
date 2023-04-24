import { useMutation, useQueryClient } from '@tanstack/react-query';
import { recommendPost } from 'api/post';
import { notifySuccess } from 'utils/notify';

export const useRecommendPost = (titleIdx: number | string, recommend: boolean) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => recommendPost(titleIdx, recommend), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', titleIdx] }).then(() => {});
        },
    });
    return { mutate };
};
