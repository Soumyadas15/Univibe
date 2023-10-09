import getUserById from './getUserById';

interface userIdProps{
    userId: string;
}
async function getUserInfo(props: userIdProps) {
  const user = await getUserById({ userId: props.userId });

  return user;
};