import './profile.scss';
import Topbar from '../../Components/Topbar/Topbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProfileRightBar from '../../Components/Pofilerightbar/ProfileRightBar';

export default function Profile({post}) {

    const [userId, setUserId] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    
    
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUserId(res.data);
        } 
        fetchUser();
    }, [username]);



    return (
        <div>
            <Topbar />
            <div className="profileContainer">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={userId.coverPic ? PF+userId.coverPic : PF+'profile.jpg'} className='proCover' alt=''/>
                            <img src={userId.profilePic ? PF+userId.profilePic : PF+"1.png"} className='proPic' alt='' />
                        </div>
                        <div className="profileInfo">
                            <h4>{userId.username}</h4>
                            <p>{userId.desc}</p>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                    <Feed username={username}/>
                        <ProfileRightBar userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    )
}