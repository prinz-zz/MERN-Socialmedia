import './rightBar.scss';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
//import AddIcon from '@mui/icons-material/Add';
import { Users } from '../../dummyData';
import Online from '../Online/Online';



export default function Rightbar({ user }) {
   
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
        

   return (
       
        <div className="rightBarContainer">
            <div className="rightBarWrapper">
               <HomeRightBar />
            </div> 
        </div>
    )
}