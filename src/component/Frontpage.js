import {Link} from 'react-router-dom'

const Frontpage = () => {
    return (
        <div style={{height: '100vh',display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1 className={'headertext'} style={{margin: '20px'}}>TAXONOMICON</h1>
            <div>
                <div style={{margin : '20px'}}>
                    <Link className={'nav-link'} to={'/admin'}>Last opp kodeliste</Link>
                </div>
                <div>
                    <Link className={'nav-link'} to={'/code'}>Kategoriser kodelinjer</Link>
                </div>
            </div>
        </div>
    )
}

export default Frontpage