
export default function Friends({user}) {
    return (
        <li>
        <img src={user.profilePicture} alt=''/>
        <span>{user.username}</span>
    </li>
    )
}