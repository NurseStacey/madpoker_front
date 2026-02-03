
import OneSeason from './one-season';

export default function CurrentSeasons({
    allSeasons,
    seasonTypes,
    fetchData
})
{

    return(
        <div
            style={{
                display:"block",
                border:'1px solid black',
                margin:"1% auto",
                padding:"2%",
                width:'60%',
                alignItems:'center',
                fontSize:'24px'
            }}
        >
            <div>Current Seasons</div>
            {allSeasons.map((oneSeason)=>(
                <div
                    key={oneSeason.id}>
                    <OneSeason
                        oneSeason={oneSeason}
                        seasonTypes={seasonTypes}
                        fetchData={fetchData}
                        />
                </div>
            ))}
        </div>

    )
}