import { Avatar, Button } from '@mui/material';
import React, { useRef } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import { useRecoilState } from 'recoil';
import { userImageState, userInfoState } from 'store/user';
import { changeUserImage } from 'api/auth';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
    profileImage?: string;
}

const UserImage = () => {
    const [image, setImage] = useRecoilState<string | ArrayBuffer | null>(userImageState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { userId, nickName, email, profileImage }: userInfos = userInfo;
    const fileInput = useRef<HTMLInputElement | null>(null);

    // 이미지 업로드
    const onChange = (e: any) => {
        const value = e?.target?.files[0];
        console.log(e.target.files);
        console.log(value);
        if (value) {
            setImage(() => value);
        } else {
            //업로드 취소할 시
            setImage('/broken-image.jpg');
            return;
        }
        const formData = new FormData();
        formData.append('image', value);

        changeUserImage(formData);
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        actionImgCompress(value)
            .then((result: File) => {
                reader.readAsDataURL(result);
            })
            .then(() => {
                reader.onload = () => {
                    const base64data = reader.result;
                    if (reader.readyState === 2) {
                        setImage(base64data);
                        // console.log(base64data);
                    }
                };
            });
    };

    // 이미지 압축
    const actionImgCompress = async (fileSrc: any) => {
        console.log('압축 시작');

        const options = {
            maxSizeMb: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(fileSrc, options);
            console.log(compressedFile);
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                // 변환 완료!
                const base64data = reader.result;
                console.log(reader);

                // formData 만드는 함수
                // handlingDataForm(base64data);
            };
            return compressedFile;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <ProfileAvatar
                    src={String(image)}
                    onClick={() => {
                        fileInput.current?.click();
                    }}
                />
                <ImageInput
                    type="file"
                    accept="image/jpg,image/png,image/jpeg"
                    name="profile_img"
                    onChange={onChange}
                    ref={fileInput}
                />
            </div>
            <Button
                onClick={() => {
                    fileInput.current?.click();
                }}
            >
                이미지 변경
            </Button>
        </>
    );
};

export default UserImage;

const ProfileAvatar = styled(Avatar)`
    width: 6rem;
    height: 6rem;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
        opacity: 0.8;
        transition: all 0.3s;
    }
`;

const ImageInput = styled.input`
    display: none;
`;
