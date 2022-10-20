import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Dispatch, SetStateAction, useState } from 'react';

interface SearchMenuProps {
    posts: any[];
    notifyError: (text: string) => void;
    setUsePosts: Dispatch<SetStateAction<any>>;
}

const SearchMenu = ({ posts, notifyError, setUsePosts }: SearchMenuProps) => {
    const [searchOption, setSearchOption] = useState('제목');
    const [searchPosts, setSearchPosts] = useState('');

    const handleChangeSearchOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchOption(e.target.value);
    };

    const handleSearch = (e: React.KeyboardEvent | React.MouseEvent): void => {
        if (e.type === 'click' || (e as React.KeyboardEvent).key === 'Enter') {
            if (searchOption === '제목') {
                let result = posts.filter((post: any) => post.title.includes(searchPosts));
                if (result.length === 0) {
                    return notifyError('일치하는 글이 없습니다.');
                }
                let writedResult = result.map((post) => {
                    let readPost: any = localStorage.getItem('reviewReadPost');
                    if (readPost?.includes(post.id)) {
                        return { ...post, read: true };
                    } else {
                        return post;
                    }
                });
                setUsePosts(writedResult);
            }
            if (searchOption === '글쓴이') {
                let result = posts.filter((post: any) => post.nickName.includes(searchPosts));
                if (result.length === 0) {
                    return notifyError('일치하는 글이 없습니다.');
                }
                let writedResult = result.map((post) => {
                    let readPost: any = localStorage.getItem('reviewReadPost');
                    if (readPost?.includes(post.id)) {
                        return { ...post, read: true };
                    } else {
                        return post;
                    }
                });
                setUsePosts(writedResult);
            }
        }
    };

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        let searchTitle = e.target.value;
        setSearchPosts(searchTitle);
    };

    return (
        <SearchContainer>
            <SelectBox
                onChange={(e) => {
                    handleChangeSearchOption(e);
                }}
            >
                <option value="제목">제목</option>
                <option value="글쓴이">글쓴이</option>
            </SelectBox>
            <SearchBox>
                <StyledSearchIcon
                    onClick={(e) => {
                        handleSearch(e);
                    }}
                />
                <SearchInput
                    placeholder={`${searchOption} 검색`}
                    onChange={onSearch}
                    onKeyPress={(e) => handleSearch(e)}
                />
            </SearchBox>
        </SearchContainer>
    );
};

export default SearchMenu;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    border-top: 1px solid #a7a7a7;
`;

const SelectBox = styled.select`
    border: none;
    font-size: 1rem;
    padding: 10px 0;
    text-align: center;
    :focus {
        outline: none;
    }
`;

const SearchBox = styled.div`
    display: flex;
    width: 90%;
    border: 1px solid #939393;
    border-radius: 10px;
    margin: 0.5rem 1rem;
    padding: 5px;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    width: 100%;
`;

const StyledSearchIcon = styled(SearchIcon)`
    color: #a7a7a7;
    cursor: pointer;
    margin-right: 0.3rem;
`;
