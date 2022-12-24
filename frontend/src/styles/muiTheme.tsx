import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
    typography: {
        fontFamily: ['Pretendard', 'sans-serif', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Oxygen'].join(','),
        fontSize: 14,
    },
    mixins: {
        toolbar: {
            minHeight: '4rem',
        },
    },
    palette: {
        primary: {
            main: '#0098ee',
        },
    },
});
