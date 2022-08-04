export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('jwtToken'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user };
    } else {
        return {};
    }
};
