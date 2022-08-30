export const authHeader = () => {
    const user = localStorage.getItem('jwtToken');

    if (user) {
        return { Authorization: 'Bearer ' + user };
    } else {
        return {};
    }
};

// export const authHeader = () => {
//     const user = JSON.parse(localStorage.getItem('jwtToken'));

//     if (user && user.accessToken) {
//         return { Authorization: 'Bearer ' + user };
//     } else {
//         return {};
//     }
// };
