import { Avatar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface PostListProps {
    usePosts: any[];
    offset: number;
    limit: number;
}

const MobileBoard = ({ usePosts, offset, limit }: PostListProps) => {
    const AddReadPost = (id: number) => {
        let readPost: any = localStorage.getItem('reviewReadPost');
        if (readPost?.length) {
            let newReadPost: any = [...JSON.parse(readPost), id];
            localStorage.setItem('reviewReadPost', JSON.stringify(newReadPost));
        } else {
            localStorage.setItem('reviewReadPost', JSON.stringify([id]));
        }
    };

    return (
        <MobileBoardContainer>
            <StyledUl>
                {usePosts.slice(offset, offset + limit).map((item: any) => {
                    const { id, title, UserId, createdAt, read, nickName, avatar } = item;
                    const newCreateAt = new Date(createdAt);
                    const year = newCreateAt.getFullYear();
                    const month = newCreateAt.getMonth();
                    const date = newCreateAt.getDate();

                    return (
                        <div key={id}>
                            <MobileLi>
                                <div>
                                    <MobileWriterWrapper>
                                        <StyledAvatar src={avatar} />
                                        <NickNameInfo>{nickName}</NickNameInfo>
                                    </MobileWriterWrapper>
                                    <TitleInfo>
                                        <TitleNavLink
                                            to={`post/${id}`}
                                            read={read ? 'true' : ''}
                                            onClick={() => {
                                                AddReadPost(id);
                                            }}
                                        >
                                            {title}
                                        </TitleNavLink>
                                    </TitleInfo>
                                </div>
                                <MobilePostAdditionalInfoWrapper>
                                    <MobilePostAddInfoLeft>
                                        <MobilePostAddInfoText>조회: {id}</MobilePostAddInfoText>
                                        <MobilePostAddInfoText>댓글: {id}</MobilePostAddInfoText>
                                        <MobilePostAddInfoText>추천: {UserId}</MobilePostAddInfoText>
                                    </MobilePostAddInfoLeft>
                                    <MobilePostAddInfoRightText>{`${year}년 ${month}월 ${date}일`}</MobilePostAddInfoRightText>
                                </MobilePostAdditionalInfoWrapper>
                            </MobileLi>
                        </div>
                    );
                })}
            </StyledUl>
        </MobileBoardContainer>
    );
};

export default MobileBoard;

const MobileBoardContainer = styled.div`
    display: none;
    ${({ theme }) => theme.device.tablet} {
        display: block;
        width: 100%;
    }
`;

const StyledUl = styled.ul`
    list-style: none;
    padding-left: 0px;
    border-top: 1px solid #eaeaea;
`;

const MobileLi = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaea;
    padding: 0.5rem 0;
`;

const MobileWriterWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const StyledAvatar = styled(Avatar)`
    width: 2rem;
    height: 2rem;
`;

const NickNameInfo = styled(Typography)`
    display: flex;
    margin-left: 0.5rem;
    font-size: 0.8rem;
`;

const TitleInfo = styled(Typography)`
    text-align: start;
    max-width: 300px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 10px 0;
    :hover {
        font-weight: bold;
    }
`;

interface TitleNavLinkProps {
    read: string;
}

const TitleNavLink = styled(NavLink)<TitleNavLinkProps>`
    color: ${(props) => (props.read ? '#770088' : '#374151')};
    text-decoration: none;
    font-size: 0.875rem;
    ${({ theme }) => theme.device.tablet} {
        font-size: 0.95rem;
    }
    ${({ theme }) => theme.device.mobile} {
        font-size: 0.95rem;
    }
`;

const MobilePostAdditionalInfoWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const MobilePostAddInfoLeft = styled.div`
    display: flex;
`;

const MobilePostAddInfoText = styled(Typography)`
    font-size: 0.95rem;
    margin-left: 0.3rem;
`;

const MobilePostAddInfoRightText = styled(Typography)`
    color: #5a5a5a;
    font-size: 0.95rem;
    text-align: end;
`;