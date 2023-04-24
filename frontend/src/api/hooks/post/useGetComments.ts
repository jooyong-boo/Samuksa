import { useQuery } from '@tanstack/react-query';
import { getPostComment } from 'api/post';

const useGetComments = (boardTitleIdx: number | string, page: number, size: number) => {
    const {
        isLoading,
        isError,
        data = [],
        error,
        refetch,
    } = useQuery({
        queryKey: ['comment'],
        queryFn: () => getPostComment(boardTitleIdx, page, size).then((res) => res.data),
        select: (data) => {
            return data;
        },
    });
    return [data, isLoading, refetch];
};

export default useGetComments;
