import {Autocomplete, TextField} from "@mui/material";
import {coicopOptions} from "../../data/coicop";
import {useContext, useState} from "react";
import {CodeContext} from "../../context/Code";

const Bulk = () => {
    const [code, setCode] = useState(null)
    const {giveCodeBulk} = useContext(CodeContext)
    return (
        <div style={{"display" : "flex", "position" : "sticky", "top" : "0", "backgroundColor": "#fff", "zIndex" : "100", "borderBottom" : "solid #000 1px", "paddingBottom" : "20px"}}>
            <Autocomplete onChange={(event, val) => setCode(val)} style={{"flex" : "1", "margin" : "10px"}} renderInput={(params) => <TextField {...params} label="Coicop" />} options={coicopOptions} />
            <button onClick={() => {
                if(code) giveCodeBulk(code)
            }} style={{"margin" : "10px"}}>Tilegn kode</button>
        </div>
    )
}

export default Bulk