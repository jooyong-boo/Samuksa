import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SetMealIcon from '@mui/icons-material/SetMeal';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { getTokenReissuance, getUserInfo, logout } from '../api/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { loginStatusState, userIdState, userImageState, userInfoState } from '../store/user';
import { ReactElement } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import styled from 'styled-components';

interface userInfoProps {
    passWd?: null;
    userEmail?: string;
    userId?: string;
    userIdx?: number;
    userNickName?: string;
}

const Header = () => {
    const notify = (text: ReactElement | string) => {
        dismissAll();
        toast.success(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    };
    const notifyError = (text: ReactElement | string) => {
        dismissAll();
        toast.error(text, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: true,
        });
    };
    const dismissAll = () => toast.dismiss();

    const navigate = useNavigate();
    const location = useLocation();

    const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
    const [userInfo, setUserInfo] = useRecoilState<userInfoProps>(userInfoState);
    const [image, setImage] = useRecoilState<string | null>(userImageState);
    const setUserIdState = useSetRecoilState(userIdState);
    let loginConfirm = localStorage.getItem('jwtToken');

    const [NAV_ITEMS, setNAV_ITEMS] = useState([
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

    const [NON_USER_NAV_ITEMS, setNON_USER_NAV_ITEMS] = useState([
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
        // {
        //     id: 3,
        //     name: '로그인',
        //     path: '/login',
        //     active: false,
        // },
        // {
        //     id: 4,
        //     name: '회원가입',
        //     path: '/register',
        //     active: false,
        // },
    ]);

    const USERS_ITEMS = [
        {
            id: 1,
            name: '로그아웃',
            path: '/',
        },
        {
            id: 2,
            name: '프로필',
            path: '/myinfo/profile',
        },
        {
            id: 3,
            name: '회원 정보',
            path: '/myinfo',
        },
        {
            id: 4,
            name: '즐겨찾기',
            path: '/',
        },
    ];

    const NON_USERS_ITEMS = [
        {
            id: 1,
            name: '로그인',
            path: '/login',
        },
        {
            id: 2,
            name: '회원가입',
            path: '/register',
        },
    ];

    const goMain = () => {
        navigate('/');
        setNAV_ITEMS(NAV_ITEMS.map((item) => ({ ...item, active: false })));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLogout = (name: string) => {
        if (name === '로그아웃') {
            const AToken = localStorage.getItem('jwtToken') || '';
            logout({ AToken });
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('kakaoAuth');
            navigate('/');
            setUserInfo({});
            setUserIdState('');
            setImage('/broken-image.jpg');
            notify('다음에 또 만나요!');
        }
    };

    const goNavigate = (path: string) => {
        if (path === '/board') {
            navigate(`${path}/review`);
        } else {
            navigate(`${path}`);
        }
    };

    useEffect(() => {
        setNAV_ITEMS(
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
                .then((res) => {
                    if (res?.data?.userId) {
                        setUserInfo(res.data);
                    } else {
                        throw res;
                    }
                })
                .catch((e) => {
                    if (e.code === 'ERR_NETWORK') {
                        localStorage.removeItem('jwtToken');
                        localStorage.removeItem('refreshToken');
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
                    } else {
                        const AToken = localStorage.getItem('jwtToken') || '';
                        const RToken = localStorage.getItem('refreshToken') || '';
                        getTokenReissuance({ AToken, RToken })
                            .then((res) => {
                                if (res?.data?.accessToken && res.data.refreshToken) {
                                    localStorage.setItem('jwtToken', res.data.accessToken);
                                    localStorage.setItem('refreshToken', res.data.refreshToken);
                                }
                            })
                            .then(() => {
                                getUserInfo()
                                    .then((res) => {
                                        if (res?.data?.userId) {
                                            setUserInfo(res.data);
                                        } else {
                                            throw res;
                                        }
                                    })
                                    .catch((e) => {
                                        if (e.code === 'ERR_NETWORK') {
                                            localStorage.removeItem('jwtToken');
                                            localStorage.removeItem('refreshToken');
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
                                    });
                            })
                            .catch((e) => {
                                console.log(e);
                                if (e.response.data.code === 401 && e.response.data.message === 'INVALID_TOKEN') {
                                    localStorage.removeItem('jwtToken');
                                    localStorage.removeItem('refreshToken');
                                    localStorage.removeItem('kakaoAuth');
                                    setLoginStatus(false);
                                    setUserInfo({});
                                    setUserIdState('');
                                    setImage('/broken-image.jpg');
                                    return notifyError(
                                        <p>
                                            아이디 인증시간이 만료되었습니다.
                                            <br /> 재로그인 해주세요
                                        </p>,
                                    );
                                } else if (e.code === 'ERR_NETWORK') {
                                    localStorage.removeItem('jwtToken');
                                    localStorage.removeItem('refreshToken');
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
                            });
                    }
                });
        }
    }, [location, loginStatus]);

    // useEffect(() => {
    //     if (Object.keys(userInfo).length === 0) {
    //         getUserInfo()
    //             .then((res) => {
    //                 if (res?.data?.userId) {
    //                     setUserInfo(res.data);
    //                 } else {
    //                     throw res;
    //                 }
    //             })
    //             .catch((e) => {
    //                 if (e.code === 'ERR_NETWORK') {
    //                     localStorage.removeItem('jwtToken');
    //                     localStorage.removeItem('refreshToken');
    //                     localStorage.removeItem('kakaoAuth');
    //                     setLoginStatus(false);
    //                     setUserInfo({});
    //                     setUserIdState('');
    //                     setImage('/broken-image.jpg');
    //                 } else {
    //                     const AToken = localStorage.getItem('jwtToken') || '';
    //                     const RToken = localStorage.getItem('refreshToken') || '';
    //                     getTokenReissuance({ AToken, RToken })
    //                         .then((res) => {
    //                             if (res?.data?.accessToken && res.data.refreshToken) {
    //                                 localStorage.setItem('jwtToken', res.data.accessToken);
    //                                 localStorage.setItem('refreshToken', res.data.refreshToken);
    //                             }
    //                         })
    //                         .then(() => {
    //                             getUserInfo()
    //                                 .then((res) => {
    //                                     if (res.data.userId) {
    //                                         setUserInfo(res.data);
    //                                     }
    //                                 })
    //                                 .catch((e) => {
    //                                     if (e.code === 'ERR_NETWORK') {
    //                                         localStorage.removeItem('jwtToken');
    //                                         localStorage.removeItem('refreshToken');
    //                                         localStorage.removeItem('kakaoAuth');
    //                                         setLoginStatus(false);
    //                                         setUserInfo({});
    //                                         setUserIdState('');
    //                                         setImage('/broken-image.jpg');
    //                                         return notifyError(
    //                                             <p>
    //                                                 서버와의 연결이 원활하지 않습니다.
    //                                                 <br /> 새로고침을 하거나
    //                                                 <br /> 인터넷 연결을 확인해주세요.
    //                                             </p>,
    //                                         );
    //                                     }
    //                                 });
    //                         })
    //                         .catch((e) => {
    //                             if (e.response?.data?.code === 401 && e.response?.data?.message === 'INVALID_TOKEN') {
    //                                 localStorage.removeItem('jwtToken');
    //                                 localStorage.removeItem('refreshToken');
    //                                 localStorage.removeItem('kakaoAuth');
    //                                 setLoginStatus(false);
    //                                 setUserInfo({});
    //                                 setUserIdState('');
    //                                 setImage('/broken-image.jpg');
    //                                 return notifyError(
    //                                     <p>
    //                                         아이디 인증시간이 만료되었습니다.
    //                                         <br /> 재로그인 해주세요
    //                                     </p>,
    //                                 );
    //                             }
    //                         });
    //                 }
    //             });
    //     }
    // }, []);

    // 유저 메뉴
    const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // 햄버거 메뉴
    const pages = [
        {
            id: 1,
            name: '수산물 계산기',
            path: '/calculator',
        },
        {
            id: 2,
            name: '게시판',
            path: '/board',
        },
    ];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <Box>
            <AppBarContainer>
                <ToolBarWrapper disableGutters>
                    <LogoTitleBox onClick={goMain}>
                        <MainLogo />
                        <MainTitle>SAMUKSA</MainTitle>
                    </LogoTitleBox>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <MobileBox>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon sx={{ color: 'black' }} fontSize="large" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map(({ id, name, path }) => (
                                    <MenuItem
                                        key={id}
                                        onClick={() => {
                                            handleCloseNavMenu();
                                            goNavigate(path);
                                        }}
                                    >
                                        <Typography textAlign="center">{name}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </MobileBox>
                        {NAV_ITEMS.map(({ id, name, path, active }) => {
                            return (
                                <MenuNavLink
                                    key={id}
                                    to={path === '/board' ? `${path}/review` : `${path}`}
                                    active={active ? 'true' : ''}
                                >
                                    {name}
                                </MenuNavLink>
                            );
                        })}
                        {loginStatus ? (
                            <>
                                <Tooltip title="User">
                                    <UserIconButton onClick={handleOpenUserMenu}>
                                        <UserAvatar src={String(image)} $loginStatus={loginStatus ? 'true' : ''} />
                                        <UserNickNameText>
                                            {/* {loginStatus ? `${userInfo?.userNickName} 님` : ''} */}
                                            {userInfo.userNickName ? `${userInfo.userNickName} 님` : ''}
                                        </UserNickNameText>
                                    </UserIconButton>
                                </Tooltip>
                                <UserSelectMenu
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {USERS_ITEMS.map(({ id, name, path }) => (
                                        <MenuItem
                                            key={id}
                                            onClick={() => {
                                                handleCloseUserMenu();
                                                goNavigate(path);
                                                handleLogout(name);
                                            }}
                                        >
                                            <MenuItemList>{name}</MenuItemList>
                                        </MenuItem>
                                    ))}
                                </UserSelectMenu>
                            </>
                        ) : (
                            <>
                                <LoginBtn
                                    variant="outlined"
                                    onClick={() => {
                                        goNavigate('/login');
                                    }}
                                >
                                    로그인
                                </LoginBtn>
                                <RegisterBtn
                                    variant="contained"
                                    onClick={() => {
                                        goNavigate('/register');
                                    }}
                                >
                                    회원가입
                                </RegisterBtn>
                            </>
                        )}
                    </div>
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
    /* width: 100%; */
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
    color: #0098ee;
    font-size: 2.875rem;
    cursor: pointer;
`;

const MainTitle = styled(Typography)`
    color: #0098ee;
    font-weight: 700;
    font-size: 1.875rem;
    cursor: pointer;
`;

const MobileBox = styled(Box)`
    display: flex;
    flex-grow: 1;
    align-items: center;
    @media screen and (min-width: 501px) {
        display: none;
    }
`;

interface MenuNavLinkProps {
    active: string;
}

const MenuNavLink = styled(NavLink)<MenuNavLinkProps>`
    margin-right: 1.2rem;
    text-decoration: none;
    color: ${(props) => (props.active ? '#0098ee' : '#7A7A7A')};
    font-weight: ${(props) => (props.active ? '600' : '500')};
    font-size: 0.9rem;
    :hover {
        font-weight: bold;
    }
    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const UserIconButton = styled(IconButton)`
    padding: 0;
`;

interface UserAvatarProps {
    $loginStatus: string;
}
const UserAvatar = styled(Avatar)<UserAvatarProps>`
    background-color: ${(props) => (props.$loginStatus ? '#0098ee' : '#A2A5A9')};
    color: white;
    vertical-align: middle;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    margin-right: 0.3rem;
    :hover {
        transform: scale(1.1);
    }
`;

const UserNickNameText = styled(Typography)`
    font-weight: bold;
`;

const UserSelectMenu = styled(Menu)`
    margin-top: 45px;
`;

const MenuItemList = styled(Typography)`
    text-align: center;
    color: #7a7a7a;
    font-size: 0.9rem;
    font-weight: 500;
`;

const LoginBtn = styled(Button)`
    width: 6rem;
    height: 2.5rem;
    border-radius: 20px;
    border: 0.5px solid #0098ee;
    color: #0098ee;
    margin-right: 0.5rem;
    :hover {
        box-shadow: none;
        background-color: rgb(229, 231, 235);
    }
`;

const RegisterBtn = styled(Button)`
    width: 6rem;
    height: 2.5rem;
    border-radius: 20px;
    background-color: #0098ee;
    box-shadow: none;
    :hover {
        box-shadow: none;
    }
`;
