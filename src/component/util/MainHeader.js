import {NavLink} from "react-router-dom";

const MainHeader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '20px', paddingTop: '30px', paddingLeft: '30px', paddingBottom: '15px', backgroundColor: '#faf4ff'}}>
            <h1 className={'headertext'}>TAXONOMICON</h1>
            <nav>
                <div style={{display: 'flex', gap : '20px', fontSize: '1.25em'}}>
                    <NavLink className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'} to={'../admin'}>Admin</NavLink>
                    <NavLink className={({isActive}) => isActive ? 'nav-link-active' : 'nav-link'} to={'../code'}>Koding</NavLink>
                </div>
            </nav>
        </div>
    )
}

export default MainHeader