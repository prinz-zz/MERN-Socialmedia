import Post from '../Post/Post';
import Share from '../Share/Share';
import './feed.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { Context } from '../../Context/context';


export default function Feed({username}) {

    const [posts, setPosts] = useState([]);
    const { user } = useContext(Context);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username ? await axios.get('/posts/profile/'+ username)
                                 : await axios.get('/posts/timeline/'+ user?._id) ;
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt); 
            }));
        }
        fetchPosts();
    }, [username, user?._id]);
    
    return (
        <div className="feedContainer">
            
            <div className="feedWrapper">
            {(!username || username === user.username )&& <Share />}
                {posts.map((p) => (
                    <Post key={p._id} post={p}/>
                ))}
                
            </div>
       </div>
    )
}