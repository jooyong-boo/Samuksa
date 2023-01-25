import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReply } from 'api/post';
import { notifySuccess } from 'utils/notify';

interface UserInfo {
    userId: string;
    email: string;
    nickName: string;
    profileImage: string;
}

export const useCreateReply = (
    commentIdx: number,
    comment: string,
    titleIdx: number | string,
    nickName: string,
    userInfo: UserInfo,
) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => createReply(commentIdx, comment, titleIdx, nickName, userInfo), {
        onSuccess: (res) => {
            queryClient.setQueryData(['comment'], () => res.data);
            notifySuccess('답글 등록 완료');
        },
    });
    return { mutate };
};
