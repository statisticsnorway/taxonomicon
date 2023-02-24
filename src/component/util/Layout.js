import MainHeader from "./MainHeader";

const Layout = ({children}) => {
    return (<div>
        <MainHeader/>
        {children}
    </div>)
}

export default Layout