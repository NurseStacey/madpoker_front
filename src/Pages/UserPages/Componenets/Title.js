import AdminButton from './admin-button';
import LogoutButton from './logout-button';

export default function Title({
    TitleText
}){

    return(
        <div
            style={{
                width:"100%",
                font:"Arial",
                fontSize:"35px",
                display:'flex',
                justifyContent:'space-between',
                margin:'auto',
                //border:'1px solid black'
                backgroundColor:"red"
            }}>
            <div
                style={{
                    position:'absolute',
                    left:'50%',
                    translate:'-50%'
                }}
                >
                {TitleText}
            </div> 
            <div
                style={{
                    marginLeft:'30px'
                }}
            > 
                <LogoutButton
                />
            </div>                           
            <div
                style={{
                    marginRight:'30px'
                }}
            >
                <AdminButton/>
            </div>
            
        </div>
    )
}