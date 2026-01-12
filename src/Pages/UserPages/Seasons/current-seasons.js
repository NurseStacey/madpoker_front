
import OneSeason from './one-season';

export default function CurrentSeasons({
    allSeasons,
    fetchData
})
{


    return(
        <div
            style={{
                display:"block",
                border:'1px solid black',
                margin:"5% auto",
                padding:"3%",
                width:'50%',
                fontSize:'20px',
                alignItems:'center'
            }}
        >
            <div>Current Seasons</div>
            {allSeasons.map((oneSeason)=>(
                <OneSeason
                    oneSeason={oneSeason}
                    fetchData={fetchData}
                    />
            ))}
        </div>

    )
}