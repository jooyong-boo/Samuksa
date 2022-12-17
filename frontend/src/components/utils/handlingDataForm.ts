import { changeUserImage } from '../../api/auth';

const handlingDataForm = async (dataURI: any) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
        type: 'image/jpeg',
    });
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
    const formData: FormData = new FormData();
    formData.append('image', file);

    try {
        const changeAvatar = await changeUserImage(formData);
        return changeAvatar;
    } catch (error: any) {
        console.log(error.response.data.errors);
    }
};

export default handlingDataForm;
