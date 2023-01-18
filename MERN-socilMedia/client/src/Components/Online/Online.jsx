

export default function Online({user}) {
    return (
        <li>
          <div>
               <img src={user.profilePicture} alt='' />
               <span></span>
          </div>
            <span>{user.username}</span>
        </li>
    )
}