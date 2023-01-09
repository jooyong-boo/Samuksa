import { useQuery } from '@tanstack/react-query';
import { getPostComment } from 'api/post';
import { useState } from 'react';

const useGetComments = (boardTitleIdx: number | string, page: number, size: number) => {
    const [total, setTotal] = useState(0);
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
            return data.data;
        },
        onSuccess: (data) => {
            setTotal(data.data.totalCommentCount);
        },
    });
    return [data, total, isLoading, refetch];
};

export default useGetComments;
