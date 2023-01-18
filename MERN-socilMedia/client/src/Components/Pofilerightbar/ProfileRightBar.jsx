import './profileRight.scss';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../Context/context';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ProfileRightBar(userId){
    const [friends, setFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(Context);
    const otherUser = useParams().username;
    const [followed, setFollowed] = useState(false);
    console.log(userId)
    //setFollowed(user.following.includes(userId?._id));

    useEffect(() => {
      const followers = async () => {
        const res = await axios.get("/users/friends/" + user._id);
        setFollowed(user.following.includes(res.data));
        // const data = res.data;
       
        //   for (let i = 0; i < data.length; ++i) {
        //   console.log(data[i]._id);
        //   }
        // data.forEach((item)=>console.log(item._id) );
        
      }
      followers();
    }, [user, user._id])
  
  

    const handleFollow = async(e) => {
    try {
      if(followed){
        await axios.put("/user/"+user._id)
      }
    } catch (err) {
      console.log(err);
    }
    }
   
    useEffect(() => {
        const getFriends = async () => {
          try {
            const friendsList = await axios.get("/users/friends/" + user._id);
            setFriends(friendsList.data);
            //console.log(friendsList);
          } catch (err) {
            console.log(err);
          }
        };
      getFriends();
    }, [user._id])
    
        
  return (
    <div className="rightBarContainer">
    <div className="rightBarWrapper">
        <div className="profileRightbar">
            <h4>User information</h4>
            <div className="rightbarInfo">
            <div>
                    <span>City: </span>
                    <span>{user.city}</span>
            </div>
            <div>
                    <span>From: </span>
                    <span>{user.from}</span>
            </div>
                <div >
                    <span>Relationship: </span>
                    <span>{ user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Complicated"}</span>
            </div>
            
            {user.username !== otherUser && <button onClick={handleFollow}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <RemoveIcon /> : <AddIcon />}  
            </button>} 
                     
                <h4>User friends</h4>
              
                {friends.map((friend) => (
                    <Link to={"/profile/"+friend.username} key={friend._id}>
                 <div className="rightbarFollowings">
                  <div>
                     <img src={friend.profilePic ? PF+friend.profilePic : PF+"../assets/1.png"  }    alt="" />
                        <span>{friend.username}</span>
                        </div>
                        </div>
                        </Link>
                ))}

            </div>
        </div>
        </div>
       </div>
    )
}