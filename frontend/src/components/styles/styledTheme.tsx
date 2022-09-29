const colors = {
    main: '#0098ee',
};

const size = {
    mobile: '500px',
    tablet: '768px',
    desktop: '1440px',
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
    mobile: `@media screen and (max-width: ${size.mobile})`,
    tablet: `@media screen and (max-width: ${size.tablet})`,
    desktopL: `@media screen and (max-width: ${size.desktop})`,
};

export const styledTheme = {
    colors,
    size,
    device,
};
