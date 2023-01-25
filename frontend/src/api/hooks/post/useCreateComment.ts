import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment } from 'api/post';
import { notifySuccess } from 'utils/notify';

interface UserInfo {
    userId: string;
    email: string;
    nickName: string;
    profileImage: string;
}

export const useCreateComment = (
    commentIdx: number,
    comment: string,
    titleIdx: number | string,
    userInfo: UserInfo,
) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => createComment(commentIdx, comment, titleIdx, userInfo), {
        onSuccess: (res) => {
            queryClient.setQueryData(['comment'], () => res.data);
            queryClient.invalidateQueries({ queryKey: ['post'] });
            notifySuccess('댓글 등록 완료');
        },
    });
    return { mutate };
};
