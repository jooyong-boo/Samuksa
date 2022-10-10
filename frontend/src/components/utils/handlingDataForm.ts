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
    const file = new File([blob], 'image.jpg');

    // 위 과정을 통해 만든 image폼을 FormData에 넣어줍니다.
    // 서버에서는 이미지를 받을 때, FormData가 아니면 받지 않도록 세팅해야합니다.
    const formData: FormData = new FormData();
    formData.append('representative_avatar', file);
    console.log(blob, file);

    // 필요시 더 추가합니다.
    formData.append('name', 'nkh');
    formData.append('email', 'noh5524@gmail.com');
    for (let entry of formData.entries()) {
        console.log(entry);
    }
    // try {
    //     const changeAvatar = await apis.auth.changeUserAccount(formData);
    //     alert(changeAvatar.status);
    // } catch (error) {
    //     alert(error.response.data.errors);
    // }
};

export default handlingDataForm;
