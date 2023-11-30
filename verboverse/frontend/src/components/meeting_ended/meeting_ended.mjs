import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const Meeting_ended = () =>{
    // useEffect(() =>{
    //     const reloadCount = sessionStorage.getItem('reloadCount');
    //     if(reloadCount < 2) {
    //       sessionStorage.setItem('reloadCount', String(reloadCount + 1));
    //       window.location.reload();
    //     } else {
    //       sessionStorage.removeItem('reloadCount');
    //     }
    // }, []);
    const data = useLocation();
    return(
        <div>
            <p>{data.state.privilege} Ended the Meetinb</p>
        </div>
    )
}

export default Meeting_ended;