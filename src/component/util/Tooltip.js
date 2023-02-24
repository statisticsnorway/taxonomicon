import {useState} from "react";


const Tooltip = ({message, children}) => {
    const [hovered, setHovered] = useState(false)
    return(
        <div onMouseEnter={() => setHovered(true)}
             onMouseLeave={() => setHovered(false)}>
            {children}
            {hovered && <div>{message}</div>}
        </div>
    )
}

export default Tooltip