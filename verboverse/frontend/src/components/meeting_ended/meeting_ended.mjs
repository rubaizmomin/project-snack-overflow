import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const Meeting_ended = () =>{
    useEffect(()=>{
        window.location.reload();
    }, []);
    const data = useLocation();
    return(
        <div>
            <p>{data.state.privilege} Ended the Meetinb</p>
        </div>
    )
}

export default Meeting_ended;