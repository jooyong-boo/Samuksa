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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Tooltip } from '@mui/material';
import { useEffect } from 'react';
import { getUserInfo } from '../api/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userIdState, userImageState, userInfoSelector, userInfoState } from '../store/user';
import { ReactElement } from 'react';

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

    const [loginStatus, setLoginStatus] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState<any>(userInfoState);
    const [image, setImage] = useRecoilState<any>(userImageState);
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
        // {
        //     id: 2,
        //     name: '회원가입',
        //     path: '/register',
        // },
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

    const logout = (name: string) => {
        if (name === '로그아웃') {
            localStorage.removeItem('jwtToken');
            navigate('/');
            setUserInfo('');
            setUserIdState('');
            setImage('/broken-image.jpg');
            notify('다음에 또 만나요!');
        }
    };

    const goNavigate = (path: string) => {
        navigate(`${path}`);
    };

    useEffect(() => {
        if (location.pathname === '/board') {
            navigate('/board/review');
        }
    }, [location]);

    useEffect(() => {
        loginConfirm
            ? setNAV_ITEMS(
                  NAV_ITEMS.map((item) =>
                      location.pathname === item.path || location.pathname.includes(`${item.path}`)
                          ? { ...item, active: true }
                          : { ...item, active: false },
                  ),
              )
            : setNON_USER_NAV_ITEMS(
                  NON_USER_NAV_ITEMS.map((item) =>
                      location.pathname === item.path || location.pathname.includes(`${item.path}`)
                          ? { ...item, active: true }
                          : { ...item, active: false },
                  ),
              );
    }, [location]);

    useEffect(() => {
        if (!!loginConfirm) {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
            setUserInfo('');
        }
    }, [loginConfirm]);

    useEffect(() => {
        if (loginStatus) {
            getUserInfo()
                .then((res) => {
                    if (res.userId) {
                        setUserInfo(res);
                    } else {
                        throw res;
                    }
                })
                .catch((e) => {
                    localStorage.removeItem('jwtToken');
                    setLoginStatus(false);
                    setUserInfo('');
                    setUserIdState('');
                    setImage('/broken-image.jpg');
                    if (e.code === 'ERR_NETWORK') {
                        notifyError(
                            <p>
                                서버와 연결이 끊겼습니다.
                                <br /> 새로고침을 하거나
                                <br /> 인터넷 연결을 확인해주세요.
                            </p>,
                        );
                    }
                    if (e.code === 500) {
                        notifyError(
                            <p>
                                아이디 인증시간이 만료되었습니다.
                                <br /> 재로그인 해주세요
                            </p>,
                        );
                    }
                });
        }
    }, [location]);

    useEffect(() => {
        if (Object.keys(userInfo).length === 0) {
            getUserInfo().then((res) => {
                if (res.userId) {
                    setUserInfo(res);
                }
            });
        }
    }, []);

    const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="fixed"
                sx={{ backgroundColor: '#FFFFFF', boxShadow: 'none', width: '100vw', height: '4.2rem' }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', margin: 'auto', width: '95vw' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SetMealIcon
                            onClick={goMain}
                            sx={{
                                display: { xs: 'flex' },
                                mr: 1,
                                color: '#6EA5F8',
                                fontSize: '2.875rem',
                                cursor: 'pointer',
                            }}
                        />
                        <Typography
                            variant="h6"
                            component="a"
                            onClick={goMain}
                            sx={{
                                color: '#6EA5F8',
                                fontWeight: '900',
                                fontSize: '1.875rem',
                                cursor: 'pointer',
                                fontFamily: 'sans-serif',
                            }}
                        >
                            SAMUKSA
                        </Typography>
                    </div>
                    <div>
                        {loginConfirm
                            ? NAV_ITEMS.map(({ id, name, path, active }) => {
                                  return (
                                      <Typography
                                          key={id}
                                          variant="button"
                                          sx={{
                                              mr: 2,
                                              ':hover': {
                                                  color: '#7A7A7A',
                                                  fontWeight: 'bold',
                                                  borderBottom: '1px solid #A7A7A7',
                                                  fontSize: '0.875rem',
                                              },
                                          }}
                                      >
                                          <NavLink
                                              to={`${path}`}
                                              // onClick={() => {
                                              //     onClick(id);
                                              // }}
                                              style={{
                                                  textDecoration: 'none',
                                                  color: '#7A7A7A',
                                                  fontWeight: active ? 'bold' : '',
                                                  fontSize: '0.9rem',
                                              }}
                                          >
                                              {name}
                                          </NavLink>
                                      </Typography>
                                  );
                              })
                            : NON_USER_NAV_ITEMS.map(({ id, name, path, active }) => {
                                  return (
                                      <Typography
                                          key={id}
                                          variant="button"
                                          sx={{
                                              mr: 2,
                                              ':hover': {
                                                  color: '#7A7A7A',
                                                  fontWeight: 'bold',
                                                  borderBottom: '1px solid #A7A7A7',
                                              },
                                          }}
                                      >
                                          <NavLink
                                              to={`${path}`}
                                              // onClick={() => {
                                              //     onClick(id);
                                              // }}
                                              style={{
                                                  textDecoration: 'none',
                                                  color: '#7A7A7A',
                                                  fontWeight: active ? 'bold' : '',
                                                  fontSize: '0.875rem',
                                              }}
                                          >
                                              {name}
                                          </NavLink>
                                      </Typography>
                                  );
                              })}
                        <>
                            <Tooltip title="User">
                                <IconButton onClick={handleOpenUserMenu} onMouseOver={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar
                                        src={image}
                                        sx={{
                                            bgcolor: loginStatus ? '#6EA5F8' : '#a2a5a9',
                                            color: 'white',
                                            verticalAlign: 'middle',
                                            width: '2.5rem',
                                            height: '2.5rem',
                                            cursor: 'pointer',
                                            marginRight: '0.3rem',
                                        }}
                                    />
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {loginStatus ? `${userInfo.userNikName}님` : null}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
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
                                {(loginStatus ? USERS_ITEMS : NON_USERS_ITEMS).map(({ id, name, path }) => (
                                    <MenuItem
                                        key={id}
                                        onClick={() => {
                                            handleCloseUserMenu();
                                            goNavigate(path);
                                            logout(name);
                                        }}
                                    >
                                        <Typography textAlign="center" variant="button" color="#7A7A7A">
                                            {name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default React.memo(Header);
