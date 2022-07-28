import axios from 'axios';

export const getPosts = async () => {
    try {
        const { data } = await axios.get('https://koreanjson.com/posts');
        // console.log(data);
        return data;
    } catch (err) {
        console.log(err.response);
    }
};
