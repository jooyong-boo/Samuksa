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
                {usePosts?.slice(offset, offset + limit).map((item: any) => {
                    const {
                        idx,
                        title,
                        nickName,
                        profileImage,
                        createdAt,
                        modifiedAt,
                        viewCount,
                        commentCount,
                        recommendCount,
                        read,
                    } = item;
                    const newCreateAt = new Date(createdAt);
                    const year = newCreateAt.getFullYear();
                    const month = newCreateAt.getMonth();
                    const date = newCreateAt.getDate();

                    return (
                        <div key={idx}>
                            <MobileLi>
                                <div>
                                    <MobileWriterWrapper>
                                        <StyledAvatar src={profileImage} />
                                        <NickNameInfo>{nickName}</NickNameInfo>
                                    </MobileWriterWrapper>
                                    <TitleInfo>
                                        <TitleNavLink
                                            to={`post/${idx}`}
                                            read={read ? 'true' : ''}
                                            onClick={() => {
                                                AddReadPost(idx);
                                            }}
                                        >
                                            {title}
                                        </TitleNavLink>
                                    </TitleInfo>
                                </div>
                                <MobilePostAdditionalInfoWrapper>
                                    <MobilePostAddInfoLeft>
                                        <MobilePostAddInfoText>조회: {viewCount}</MobilePostAddInfoText>
                                        <MobilePostAddInfoText>댓글: {commentCount}</MobilePostAddInfoText>
                                        <MobilePostAddInfoText>추천: {recommendCount}</MobilePostAddInfoText>
                                    </MobilePostAddInfoLeft>
                                    <MobilePostAddInfoRightText>
                                        {`${year}년 ${month + 1}월 ${date}일`}
                                        {modifiedAt ? ` (수정됨)` : null}
                                    </MobilePostAddInfoRightText>
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
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;

const MobileLi = styled.li`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
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
    color: ${(props) => (props.read ? '#770088' : '#101827')};
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    :hover {
        color: ${(props) => props.theme.colors.main};
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
