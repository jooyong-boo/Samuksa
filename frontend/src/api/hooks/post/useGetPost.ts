import { useQuery } from '@tanstack/react-query';
import { getRealPosts } from 'api/post';

const useGetPost = (page: number, size: number, type: number) => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['post', page],
        queryFn: () => getRealPosts(page, size, type),
        keepPreviousData: true,
        select: (data) => data.data,
    });
    return [data, isLoading];
};

export default useGetPost;
