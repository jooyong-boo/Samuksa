import { Avatar } from '@mui/material';
import { useRef } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import { useRecoilState } from 'recoil';
import { userImageState, userInfoState } from 'store/user';
import { getUserInfo } from 'api/auth';
import handlingDataForm from 'utils/handlingDataForm';
import { notifySuccess } from 'utils/notify';
import { Button } from 'components/common';

interface userInfos {
    userId?: string;
    nickName?: string;
    email?: string;
    profileImage?: string;
}

const UserImage = () => {
    const [image, setImage] = useRecoilState<string>(userImageState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const { profileImage }: userInfos = userInfo;
    const fileInput = useRef<HTMLInputElement | null>(null);

    // 이미지 업로드
    const onChange = (e: any) => {
        const value = e?.target?.files[0];
        if (value) {
            setImage(() => value);
        } else {
            //업로드 취소할 시
            setImage('/broken-image.jpg');
            return;
        }
        //화면에 프로필 사진 표시
        const reader = new FileReader();
        actionImgCompress(value)
            .then((result: any) => {
                reader.readAsDataURL(result);
            })
            .then(() => {
                reader.onload = () => {
                    const base64data = reader.result;
                    if (reader.readyState === 2) {
                        setImage(base64data as any);
                    }
                };
            });
    };

    // 이미지 압축
    const actionImgCompress = async (fileSrc: any) => {
        const options = {
            maxSizeMb: 1,
            maxWidthOrHeight: 200,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(fileSrc, options);
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                // 변환 완료!
                const base64data = reader.result;

                // formData 만드는 함수
                handlingDataForm(base64data).then(() => {
                    getUserInfo().then((res: any) => {
                        if (res?.data?.userId) {
                            setUserInfo(res.data);
                            notifySuccess('이미지 변경 완료');
                        } else {
                            throw res;
                        }
                    });
                });
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
                    src={profileImage ? profileImage : String(image)}
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
                variant="text"
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
