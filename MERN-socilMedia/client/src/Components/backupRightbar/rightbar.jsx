import './rightBar.scss';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
//import AddIcon from '@mui/icons-material/Add';
import { Users } from '../../dummyData';
import Online from '../Online/Online';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Rightbar({ user }) {
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    
    useEffect(() => {
        const getFriends = async (user) => {
          try {
            const friendsList = await axios.get("/users/friends/" + user._id);
              setFriends(friendsList.data);
              
          } catch (err) {
            console.log(err);
          }
        };
        getFriends();
  
      }, [user])
    

           
        const HomeRightBar = () => {
            return (
                <>
                    <div className="birthday">
                <CakeRoundedIcon/>
                    <span><strong>Mary Jane</strong> and <strong>5 other friends</strong> have their birthdat today</span>
                </div>
                <div className="rightBarAd">
                    <img src='../assets/ad.png' alt='' />     
                </div>

                <h4>Online Friends</h4>
                    <ul>
                    {Users.map((u) => (
                          <Online key={u.id} user={u}/>
                      ))}                   
                    </ul>
                </>
            )
        }
        
    const ProfileRightBar = () => {
            
        
            return (
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
               
                    
                        <h4>User friends</h4>
                      
                        {friends.map((friend) => (
                            <Link to={"/profile/"+friend.username}>
                         <div className="rightbarFollowings">
                          <div>
                             <img src={friend.profilePic ? PF+friend.profilePic : PF+"../assets/1.png" }   alt="" />
                                <span>{friend.username}</span>
                                </div>
                                </div>
                                </Link>
                        ))}
 
                    </div>
               </div>
            )
        }
    

   return (
       
        <div className="rightBarContainer">
            <div className="rightBarWrapper">
               {user ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
            
        </div>
        
    )
}