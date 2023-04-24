import { useQuery } from '@tanstack/react-query';
import { getRealPosts } from 'api/post';

const useGetPost = (page: number, size: number, type: number) => {
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['posts', type],
        queryFn: () => getRealPosts(page, size, type),
        keepPreviousData: true,
        select: (data) => data.data,
    });
    return [data, isLoading, refetch];
};

export default useGetPost;
