import {Autocomplete, TextField} from "@mui/material";
import {coicopOptions} from "../../data/coicop";
import {useContext, useState} from "react";
import {CodeContext} from "../../context/Code";

const CodeBulk = () => {
    const [code, setCode] = useState(null)
    const {giveCodeBulk, getReservedTextsForCoding} = useContext(CodeContext)
    return (
        <div className={'code-bulk-header'}>
            <div className={'code-bulk-actions-container'}>
                <div className={'code-bulk-actions-filler'}></div>
                <div className={'code-bulk-actions-content'}>
                    <button
                            className={'width-75 fetch'}
                            onClick={getReservedTextsForCoding}>
                        Hent kodelinjer
                    </button>
                </div>
            </div>
            <div className={'code-bulk-bulk-container'}>
                <div className={'code-bulk-categories'}>
                    <Autocomplete onChange={(event, val) => setCode(val)}  renderInput={(params) => <TextField {...params} label="Coicop" />} options={coicopOptions} />
                </div>
                <div className={'code-bulk-assign'}>
                    <button onClick={() => {if(code) giveCodeBulk(code)}}
                            className={'width-75 assign-code'}>
                        Tilegn kode
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CodeBulk