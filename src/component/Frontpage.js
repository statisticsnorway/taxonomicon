import {Link} from 'react-router-dom'
import {AuthContext} from "../context/Auth";
import {useContext} from "react";
import Unauthorized from "./util/Unauthorized";

const Frontpage = () => {
    const {auth} = useContext(AuthContext)
    return (
        <div>
            {auth === 'AUTHORIZED' && <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <h1 className={'headertext'} style={{margin: '20px'}}>TAXONOMICON</h1>
                <div>
                    <div style={{margin: '20px'}}>
                        <Link className={'nav-link'} to={'/admin'}>Last opp kodeliste</Link>
                    </div>
                    <div>
                        <Link className={'nav-link'} to={'/code'}>Kategoriser kodelinjer</Link>
                    </div>
                </div>
            </div>
            }
            {auth === 'NOT_LOGGED_IN' &&
                <div>
                    Logger inn...
                </div>
            }
            {auth === 'UNAUTHORIZED' &&
                <Unauthorized/>
            }
        </div>
    )
}

export default Frontpage