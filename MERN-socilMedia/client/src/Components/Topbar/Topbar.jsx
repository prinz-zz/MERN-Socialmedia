import './topBar.scss';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../Context/context';



export default function Topbar() {

    const { user } = useContext(Context);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    

    return (
        <div className="topbarContainer">
            <div className="topLeft">
                <Link to='/'>
                <span className="Logo"><sub>pg</sub>Social</span>
                </Link>
            </div>
            <div className="topCenter">
                <div className="searchBar">
                    <SearchRoundedIcon />
                    <input type="text" className="searchInput" placeholder='Search...'/>
                </div>
            </div>
            <div className="topRight">
                <div className="topRightLinks">
                <Link to='/'><span>Homepage</span></Link>
                    <span>Timeline</span>
                </div>
                <div className="topRightIcons">
                    <div className="topRightUser">
                        <PersonRoundedIcon />
                        <span className="counter">4</span>
                    </div>
                    <div className="topRightUser">
                        <ChatBubbleRoundedIcon />
                        <span className="counter">4</span>
                    </div>
                    <div className="topRightUser">
                        <NotificationsRoundedIcon />
                        <span className="counter">4</span>
                    </div>
                    <Link to={`/profile/${user?.username}`}>
                    <img src={user?.profilePic ?
                        PF + user?.profilePic :
                            PF + '1.png'} alt="" className="proPic" />
                    </Link>
                </div>
            </div>
        </div>
    )
}