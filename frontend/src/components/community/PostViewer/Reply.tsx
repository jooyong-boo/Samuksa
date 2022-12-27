import UserInfo from './UserInfo';

interface UserInfoProps {
    userId: string;
    nickName: string;
    email: string;
    profileImage: string;
}

const Reply = ({ userInfo }: { userInfo: UserInfoProps }) => {
    const { userId, profileImage, nickName } = userInfo;
    return (
        <>
            <div style={{ marginLeft: '2rem', paddingLeft: '2rem', borderLeft: '2px solid #A7A7A7' }}>
                {/* <UserInfo
                    userId={userId}
                    id={id}
                    profileImage={profileImage}
                    nickName={nickName}
                    createdAt={createdAt}
                /> */}
            </div>
        </>
    );
};

export default Reply;
