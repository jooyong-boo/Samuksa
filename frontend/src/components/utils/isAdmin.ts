const isAdmin = () => {
    return !!localStorage.getItem('jwtToken');
};

export default isAdmin;
