

export default function OnePicture({image}){
    return (
        <div
            style={{
                display:"block",
                margin: "20px 20px"
            }}>
            <img src={image}/>
            <div
                style={{
                    display:"flex",
                    justifyContent:"center",
                    width:"100%",
                }}
            >
                <a 
                    href="https://www.zazzle.com/collections/mad_poker_fireman_merch-119711448067696482" 
                    target="_blank"
                    style={{
                        color:"red"
                    }}>
                        MAD Poker Fireman Merch
                </a>
            </div>
            <div
                style={{
                    display:"flex",
                    justifyContent:"center",
                    width:"100%",
                }}
            >
                <a 
                    href="https://www.zazzle.com/mbr/238919125440610850" 
                    target="_blank"
                    style={{
                        color:"red"
                    }}>
                        by MAD_Poker_Boutique
                </a>
            </div>            
        </div>
    )
}