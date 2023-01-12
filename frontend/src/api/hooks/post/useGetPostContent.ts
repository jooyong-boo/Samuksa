import { useQuery } from '@tanstack/react-query';
import { getPostContent } from 'api/post';

const useGetPostContent = (index: number | string) => {
    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['post', index],
        queryFn: () => getPostContent(Number(index)).then((res) => res.data),
        // select: (data) => {
        //     console.log(data);
        //     return data;
        // },
    });
    return [data, isLoading, refetch];
};

export default useGetPostContent;
