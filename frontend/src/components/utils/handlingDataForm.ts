import { changeUserImage } from '../../api/auth';

const handlingDataForm = async (dataURI: any) => {
    const byteString = atob(dataURI.split(',')[1]);
    console.log(byteString);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
        type: 'image/jpeg',
    });
    const file = new File([blob], 'image.jpg');
    console.log(blob, file);
    const formData: FormData = new FormData();
    formData.append('image', file);

    for (let entry of formData.entries()) {
        console.log(entry);
    }
    try {
        const changeAvatar = await changeUserImage(formData);
        console.log(changeAvatar);
    } catch (error: any) {
        console.log(error.response.data.errors);
    }
};

export default handlingDataForm;
