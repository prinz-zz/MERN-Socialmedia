import './home.scss';
//import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Topbar from '../../Components/Topbar/Topbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import Feed from '../../Components/Feed/Feed';



export default function Home() {
    return (
        <div>
            <Topbar />
            <div className="homeContainer">
            <Sidebar />
            <Feed/>
            <Rightbar/>
            </div>
            
        </div>
    )
}