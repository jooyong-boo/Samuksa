import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchPost } from 'api/post';
import { useNavigate } from 'react-router-dom';
import { notifySuccess } from 'utils/notify';

export const useEditPost = (text: string, title: string, titleIdx: number, type: number) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { mutate } = useMutation(() => patchPost(text, title, titleIdx, type), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', titleIdx] }).then(() => {
                // navigate(-1);
                // notifySuccess('수정 완료');
            });
        },
    });
    return { mutate };
};
