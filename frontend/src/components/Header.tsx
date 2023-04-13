import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SetMealIcon from '@mui/icons-material/SetMeal';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Divider, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { getUserInfo, logout } from '../api/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginStatusState, userIdState, userImageState, userInfoState } from '../store/user';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';
import { reviewPostPageState, tipPostPageState } from '../store/atom';
import { notifyError, notifySuccess } from '../utils/notify';
import { Button } from 'components/common';

interface userInfoProps {
    userId?: string;
    nickName?: string;
    email?: string;
    profileImage?: string;
    userIdx?: number;
}

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
    const [userInfo, setUserInfo] = useRecoilState<userInfoProps>(userInfoState);
    const [image, setImage] = useRecoilState<string>(userImageState);
    const setUserIdState = useSetRecoilState(userIdState);
    const [reviewPostPage, setReviewPostPage] = useRecoilState<number>(reviewPostPageState);
    const [tioPostPage, setTipPostPage] = useRecoilState<number>(tipPostPageState);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    let loginConfirm = localStorage.getItem('jwtToken');

    const [NAV_ITEMS, SET_NAV_ITEMS] = useState([
        {
            id: 1,
            name: '수산물 계산기',
            path: '/calculator',
            active: false,
        },
        {
            id: 2,
            name: '게시판',
            path: '/board',
            active: false,
        },
    ]);

    const [USERS_ITEMS, SET_USER_ITEMS] = useState([
        {
            id: 1,
            name: '프로필',
            path: '/myinfo/profile',
            active: false,
        },
        {
            id: 2,
            name: '회원 정보',
            path: '/myinfo',
            active: false,
        },
        {
            id: 3,
            name: '즐겨찾기',
            path: '/bookmark',
            active: false,
        },
        {
            id: 4,
            name: '로그아웃',
            path: '/',
            active: false,
        },
    ]);

    // 햄버거 메뉴
    const [pages, SetPages] = useState([
        {
            id: 1,
            name: '수산물 계산기',
            path: '/calculator',
            active: false,
        },
        {
            id: 2,
            name: '게시판',
            path: '/board',
            active: false,
        },
        {
            id: 3,
            name: '로그인',
            path: '/login',
            active: false,
        },
        {
            id: 4,
            name: '회원가입',
            path: '/register',
            active: false,
        },
    ]);

    const goMain = () => {
        navigate('/');
        SET_NAV_ITEMS(NAV_ITEMS.map((item) => ({ ...item, active: false })));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = (name: string) => {
        if (name === '로그아웃') {
            const AToken = localStorage.getItem('jwtToken') || '';
            logout(AToken).then((res: any) => {
                if (res.status === 201) {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('kakaoAuth');
                    navigate('/');
                    setUserInfo({});
                    setUserIdState('');
                    setImage('/broken-image.jpg');
                    notifySuccess('다음에 또 만나요!');
                } else {
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('kakaoAuth');
                    navigate('/');
                    setUserInfo({});
                    setUserIdState('');
                    setImage('/broken-image.jpg');
                }
            });
        }
    };

    const goNavigate = (path: string) => {
        if (path === '/board') {
            setReviewPostPage(1);
            setTipPostPage(1);
            navigate(`${path}/review`);
        } else {
            navigate(`${path}`);
        }
    };

    useEffect(() => {
        SET_NAV_ITEMS(
            NAV_ITEMS.map((item) =>
                location.pathname === item.path || location.pathname.includes(`${item.path}`)
                    ? { ...item, active: true }
                    : { ...item, active: false },
            ),
        );
    }, [location]);

    useEffect(() => {
        if (loginConfirm) {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
            setUserInfo({});
        }
    }, [loginConfirm]);

    useEffect(() => {
        if (loginStatus) {
            getUserInfo()
                .then((res: any) => {
                    if (res?.data?.userId) {
                        setUserInfo(res.data);
                    } else {
                        throw res;
                    }
                })
                .catch((e) => {
                    if (e.code === 'ERR_NETWORK') {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('kakaoAuth');
                        setLoginStatus(false);
                        setUserInfo({});
                        setUserIdState('');
                        setImage('/broken-image.jpg');
                        return notifyError(
                            <p>
                                서버와의 연결이 원활하지 않습니다.
                                <br /> 새로고침을 하거나
                                <br /> 인터넷 연결을 확인해주세요.
                            </p>,
                        );
                    }
                    if (e.status === 401) {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('kakaoAuth');
                        setLoginStatus(false);
                        setUserInfo({});
                        setUserIdState('');
                        setImage('/broken-image.jpg');
                    }
                });
        }
    }, [location, loginStatus]);

    // 유저 메뉴
    const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // 모바일 메뉴
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // width에 따라 menu 보이는 유무 정하는 코드
    function getWindowDimensions() {
        const { innerWidth: width } = window;
        return {
            width,
        };
    }

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions]);

    useEffect(() => {
        if (windowDimensions.width <= 500) {
            setAnchorElUser(null);
        } else if (windowDimensions.width >= 500) {
            setAnchorElNav(null);
        }
    }, [windowDimensions]);
    //

    return (
        <Box>
            <AppBarContainer>
                <ToolBarWrapper disableGutters>
                    <LogoTitleBox onClick={goMain}>
                        <MainLogo />
                        <MainTitle>SAMUKSA</MainTitle>
                    </LogoTitleBox>
                    <MenuWrapper>
                        <MobileBox>
                            <IconButton
                                size="large"
                                aria-label="Mobilemenu"
                                aria-controls="Mobilemenu"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                            >
                                <StyledMenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                            >
                                {loginStatus
                                    ? NAV_ITEMS.map(({ id, name, path }) => (
                                          <StyledMobileMenuItem
                                              key={id}
                                              onClick={() => {
                                                  handleCloseNavMenu();
                                                  goNavigate(path);
                                              }}
                                          >
                                              <MenuItemList>{name}</MenuItemList>
                                          </StyledMobileMenuItem>
                                      ))
                                    : pages.map(({ id, name, path }) => (
                                          <StyledMobileMenuItem
                                              key={id}
                                              onClick={() => {
                                                  handleCloseNavMenu();
                                                  goNavigate(path);
                                              }}
                                          >
                                              <MenuItemList>{name}</MenuItemList>
                                          </StyledMobileMenuItem>
                                      ))}
                                {loginStatus && <Divider />}
                                {loginStatus && (
                                    <MobileUserBox>
                                        <UserAvatar src={String(image)} $loginStatus={loginStatus ? 'true' : ''} />
                                        <div>
                                            <UserNickNameText>{userInfo.nickName}</UserNickNameText>
                                            <UserEmailText>{userInfo.email}</UserEmailText>
                                        </div>
                                    </MobileUserBox>
                                )}
                                {loginStatus &&
                                    USERS_ITEMS.map(({ id, name, path }) => (
                                        <MenuItem
                                            key={id}
                                            onClick={() => {
                                                handleCloseNavMenu();
                                                goNavigate(path);
                                                handleLogout(name);
                                            }}
                                        >
                                            <MenuItemList>{name}</MenuItemList>
                                        </MenuItem>
                                    ))}
                            </Menu>
                        </MobileBox>
                        {NAV_ITEMS.map(({ id, name, path, active }) => {
                            return (
                                <MenuNav
                                    key={id}
                                    onClick={() => {
                                        goNavigate(path);
                                    }}
                                    active={active ? 'true' : ''}
                                >
                                    {name}
                                </MenuNav>
                            );
                        })}
                        {loginStatus ? (
                            <UserBox>
                                <Tooltip title="메뉴">
                                    <UserIconButton onClick={handleOpenUserMenu}>
                                        <UserAvatar
                                            src={userInfo.profileImage ? userInfo.profileImage : String(image)}
                                            $loginStatus={loginStatus ? 'true' : ''}
                                        />
                                    </UserIconButton>
                                </Tooltip>
                                {userInfo.nickName && <UserNickNameText>{userInfo.nickName}</UserNickNameText>}
                                <UserSelectMenu
                                    id="menu"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {USERS_ITEMS.map(({ id, name, path }) => (
                                        <StyledMenuitem
                                            key={id}
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                goNavigate(path);
                                                handleLogout(name);
                                            }}
                                        >
                                            <MenuItemList>{name}</MenuItemList>
                                        </StyledMenuitem>
                                    ))}
                                </UserSelectMenu>
                            </UserBox>
                        ) : (
                            <DesktopBox>
                                <StyledButton
                                    variant="outlined"
                                    rounded
                                    onClick={() => {
                                        goNavigate('/login');
                                    }}
                                >
                                    로그인
                                </StyledButton>
                                <StyledButton
                                    variant="contained"
                                    rounded
                                    onClick={() => {
                                        goNavigate('/register');
                                    }}
                                >
                                    회원가입
                                </StyledButton>
                            </DesktopBox>
                        )}
                    </MenuWrapper>
                </ToolBarWrapper>
            </AppBarContainer>
        </Box>
    );
};

export default React.memo(Header);

const AppBarContainer = styled(AppBar)`
    position: fixed;
    background-color: #ffffff;
    box-shadow: none;
`;

const ToolBarWrapper = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 94vw;
`;

const LogoTitleBox = styled.div`
    display: flex;
    align-items: center;
`;

const MainLogo = styled(SetMealIcon)`
    display: flex;
    margin-right: 0.5rem;
    color: ${({ theme }) => theme.colors.main};
    font-size: 2.875rem;
    cursor: pointer;
`;

const MainTitle = styled(Typography)`
    color: ${({ theme }) => theme.colors.main};
    font-weight: 700;
    font-size: 1.875rem;
    cursor: pointer;
`;

const MenuWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const MobileBox = styled(Box)`
    display: flex;
    flex-grow: 1;
    align-items: center;
    display: none;
    ${({ theme }) => theme.device.mobile} {
        display: block;
    }
`;

const StyledMenuIcon = styled(MenuIcon)`
    color: ${({ theme }) => theme.colors.main};
    font-size: 2.5rem;
`;

const StyledMobileMenuItem = styled(MenuItem)`
    width: 100vw;
`;

const UserBox = styled.div`
    display: flex;
    align-items: center;
    ${({ theme }) => theme.device.mobile} {
        display: none;
    }
`;

const DesktopBox = styled(Box)`
    display: flex;
    flex-grow: 1;
    align-items: center;
    ${({ theme }) => theme.device.mobile} {
        display: none;
    }
    Button:first-child {
        margin-right: 0.5rem;
    }
`;

interface MenuNavProps {
    active: string;
}

const MenuNav = styled(Typography)<MenuNavProps>`
    margin-right: 1.2rem;
    text-decoration: none;
    color: ${(props) => (props.active ? props.theme.colors.main : '#7A7A7A')};
    font-weight: ${(props) => (props.active ? '600' : '500')};
    font-size: 0.9rem;
    :hover {
        font-weight: bold;
        cursor: pointer;
    }
    ${({ theme }) => theme.device.mobile} {
        display: none;
    }
`;

const UserIconButton = styled(IconButton)`
    padding: 0;
`;

const MobileUserBox = styled.div`
    display: flex;
    padding: 5px 10px;
`;

interface UserAvatarProps {
    $loginStatus: string;
}
const UserAvatar = styled(Avatar)<UserAvatarProps>`
    background-color: ${({ theme }) => theme.colors.main};
    color: white;
    vertical-align: middle;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    margin-right: 0.3rem;
    :hover {
        transform: scale(1.1);
    }
    ${({ theme }) => theme.device.mobile} {
        width: 35px;
        height: 35px;
        margin-right: 0.5rem;
        cursor: default;
        :hover {
            transform: none;
        }
    }
`;

const UserNickNameText = styled(Typography)`
    font-weight: 500;
    color: #111827;
    font-size: 1rem;
    ${({ theme }) => theme.device.mobile} {
        font-size: 1.125rem;
    }
`;

const UserEmailText = styled(Typography)`
    color: #6b7280;
    font-weight: 500;
    font-size: 1.1rem;
`;

const UserSelectMenu = styled(Menu)`
    margin-top: 45px;
`;

const StyledMenuitem = styled(MenuItem)`
    width: 10rem;
    text-align: center;
    &:last-child {
        border-top: 1px solid ${({ theme }) => theme.colors.gray};
    }
`;

const MenuItemList = styled(Typography)`
    text-align: center;
    color: #111827;
    font-size: 1rem;
    font-weight: 500;
    ${({ theme }) => theme.device.mobile} {
        font-size: 1.125rem;
    }
`;

const StyledButton = styled(Button)`
    width: 6rem;
    height: 2.5rem;
`;
