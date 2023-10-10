import getUserById from "../actions/getUserById";

const LogName = async() => {

    const user = await getUserById({ userId: '65210dc6eba42e052ca114d3' });
    return user?.name;
}
 
export default LogName;