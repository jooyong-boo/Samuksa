import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from 'api/post';

export const useCreatePost = (content: string, title: string, type: number) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => createPost(content, title, type), {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['null'] });
        },
    });
    return { mutate };
};
