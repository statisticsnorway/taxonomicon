import {AuthContext} from "../../context/Auth";
import {useContext} from "react";
import Unauthorized from "./Unauthorized";


const ProtectedRoute = ({children}) => {
    const {auth} = useContext(AuthContext)

    return (
    <div>
        {auth === 'AUTHORIZED' && children}
        {auth !== 'AUTHORIZED' &&
            <Unauthorized/>
        }

    </div>)
}

export default ProtectedRoute