export const authHeader = () => {
    const user = localStorage.getItem('jwtToken');

    if (user) {
        return { Authorization: 'Bearer ' + user };
    } else {
        return {};
    }
};
