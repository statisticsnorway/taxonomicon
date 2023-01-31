import {Autocomplete, TextField} from "@mui/material";
import {coicopOptions} from "../../data/coicop";

const Bulk = () => {

    return (
        <div style={{"display" : "flex", "position" : "sticky", "top" : "0", "backgroundColor": "#fff", "zIndex" : "100", "borderBottom" : "solid #000 1px", "paddingBottom" : "20px"}}>
            <Autocomplete style={{"flex" : "1", "margin" : "10px"}} renderInput={(params) => <TextField {...params} label="Coicop" />} options={coicopOptions} />
            <button style={{"margin" : "10px"}}>Tilegn kode</button>
        </div>
    )
}

export default Bulk