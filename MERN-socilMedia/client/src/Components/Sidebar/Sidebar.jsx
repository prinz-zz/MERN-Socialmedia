import './sideBar.scss';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import WorkRoundedIcon from '@mui/icons-material/WorkRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Friends from '../Friends/Friends';
import { Users } from '../../dummyData';

export default function Sidebar() {
    return (
        <div className="sideBarContainer">
            <div className="sideBarWrapper">
                <ul className="sideBarLinks">
                    <li><RssFeedRoundedIcon/> Feed</li>
                    <li><ChatRoundedIcon/> Chat</li>
                    <li><OndemandVideoRoundedIcon/> Video</li>
                    <li><Groups2RoundedIcon/> Groups</li>
                    <li><BookmarksRoundedIcon/> Bookmarks</li>
                    <li><HelpRoundedIcon/> Questions</li>
                    <li><WorkRoundedIcon/> Jobs</li>
                    <li><EventNoteRoundedIcon/> Events</li>
                    <li><SchoolRoundedIcon/> Courses</li>
                </ul>
                <button className="friendList">Show more</button>
                <ul className="friendLinks">
                    {Users.map((u) => (
                        <Friends key={u.id} user={u} />
                    ))}
                   
                </ul>
            </div>
       </div>
    )
}