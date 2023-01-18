import './share.scss';
import PermMediaRoundedIcon from '@mui/icons-material/PermMediaRounded';
import TurnedInRoundedIcon from '@mui/icons-material/TurnedInRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import EmojiEmotionsRoundedIcon from '@mui/icons-material/EmojiEmotionsRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext, useRef, useState } from 'react';
import { Context } from '../../Context/context';
import axios from 'axios';

 
export default function Share() {

    const { user } = useContext(Context);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc:desc.current.value
        }
        if (file) {
            const data = new FormData();
            const fileName = file.name;
            data.append('file', file);
            data.append("name", fileName);
            newPost.img = fileName;

            try {
                await axios.post('/upload', data);
            } catch (err) {
                console.log("errors");
            }
        }

        console.log(newPost);
        try {
            await axios.post('/posts', newPost);
            window.location.reload();
        }catch(err) {}
    }

    return (  
        <div className="shareContainer">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePic ? PF + user.profilePic : PF + "1.png"} alt="" />
                    <input ref={desc} placeholder={"What's in your mind Mr" + user.username + '?'} />
                </div>
                {file && (
                    <div className="shareImageContainer">
                        <img className="shareImage" src={URL.createObjectURL(file)} alt="" />
                        <CancelIcon className="cancel" onClick={()=> setFile(null)} />
                    </div>
                )}
            <form className="shareButton" onSubmit={handleSubmit}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaRoundedIcon htmlColor='Crimson'/>
                            <span>Photo / Video</span>
                            <input style={{display: 'none'}} type='file' id='file' accept='.png, .jpeg, .jpg' onChange={(e)=> setFile(e.target.files[0]) } />
                        </label>
                        <div className="shareOption">
                            <TurnedInRoundedIcon htmlColor='LimeGreen'/>
                            <span>Tag</span>
                        </div>
                        <div className="shareOption">
                            <LocationOnRoundedIcon htmlColor='SlateBlue'/>
                            <span>Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsRoundedIcon htmlColor='Gold'/>
                            <span>Feelings</span>
                        </div>
                    </div>
                    <button type="submit">Share</button>
                </form>
                
            </div>
       </div>
    )
}