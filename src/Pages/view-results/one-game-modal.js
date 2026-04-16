import MyButton from '../../Components/Widgets/my-button';
import {APPLICATION_COLORS} from '../../Components/Constants/application-colors';
import axios from 'axios';
import {useState, useEffect} from 'react';

export default function OneGameModal({
    setOpenModal,
    thisGameTitle,
    thisGameID,
    setThisGameID
})
{
    const [thisGameResults, setThisGameResults]=useState([]);
    
    useEffect(()=>{
        
        if (thisGameID===-1) return

        const fetchData = async() =>{
  
            try {
                let response = await axios.get(`http://127.0.0.1:8000/gameresults/this_game_results/${thisGameID}`,);
                setThisGameResults(response.data['this_game_result'])
                console.log(response.data)
            } catch(err){
                alert('Problem getting games.');
            }
        }
        fetchData()                
    },[thisGameID])

    const CloseBox=()=>{
        setThisGameID(-1)
        setOpenModal(false)
    }

    let OneRowStyle={
        display:'grid',
        gridTemplateColumns: '40% 30% 30%',
        fontSize:'20px',
        cursor:'pointer'
    }    

    return (
        <div
            style={{
                border:'1px solid black',
                backgroundColor:APPLICATION_COLORS['player-interface']['background_two'],
                height:'100%',
                overflowY:'scroll'
            }}>
            <MyButton
                button_function={CloseBox}
                button_text="Done"
                button_style={{
                    margin:'3% auto'
                }}
                disable={false}
            />
            <div
                style={{
                    margin:'0% auto',
                    fontSize:'24px'
                }}
                >
                {thisGameTitle}
            </div>
            <div
                style={{
                    margin:'2% 0%',
                    borderBottom:'1px dashed black',
                    ...OneRowStyle
                }}
            >
                <div>Player</div>
                <div>Position</div>
                <div>Points</div>
            </div>
            {thisGameResults.map((oneResult)=>(
                <div
                    style={OneRowStyle}
                >
                    <div>{oneResult['player']}</div>
                    <div>{oneResult['position']}</div>
                    <div>{oneResult['points']}</div>

                </div>))}
            
        </div>
    )
}