
import './post.scss';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbDownRoundedIcon from '@mui/icons-material/ThumbDownRounded';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../Context/context';

export default function Post({ post }) {

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user:currentUser } = useContext(Context);
 
//Som&Sons@123
    const likeHandler = async () => {
        try {
            await axios.put('/posts/'+post._id+'/like',{userId: currentUser._id})
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    },[post.likes,currentUser._id]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        } 
        fetchUser();
    }, [post.userId]);

    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="top">
                    <div className="left">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "1.png"} alt="" />
                        </Link>
                        <span>{ user.username }</span>
                        <span style={{ fontSize: '12px', marginTop:'3px' }}>{format(post.createdAt)}</span>
                        </div>
                        <div className="right"> 
                            <MoreVertRoundedIcon />
                        </div>
               </div>
                <div className="center">
                    <span>{ post?.desc }</span>
                    <img src={PF+post.img} alt="" />
               </div>
                <div className="bottom">
                    <div className="left">
                        <ThumbUpRoundedIcon htmlColor='DodgerBlue' onClick={likeHandler}/>
                        <ThumbDownRoundedIcon htmlColor='Tomato' onClick={likeHandler}/>
                        <span>{ like }</span>
                    </div>
                    <div className="right">
                        <span>{ post.comment } Comments</span>
                    </div>
               </div>
            </div>
       </div>
    )
}