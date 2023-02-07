import {useContext} from "react";
import {CodeContext} from "../../context/Code";
import {coicopOptions} from "../../data/coicop";
import {Autocomplete, TextField} from "@mui/material";
import TextContext from "./TextContext";


const CodeView = () => {
    const {texts, giveCode, addTextToSelected, removeTextFromSelected} = useContext(CodeContext)
    return (
        <div>

            {texts.map(text => {
                let selectedCode = null
                return <div key={text.id} style={{"display" : "flex", "justifyContent" : "space-between"}}>
                    <input onChange={(event) => {
                        if(event.target.checked) {
                            addTextToSelected( {id: text.id} )
                        }
                        else {
                            removeTextFromSelected( {id: text.id})
                        }
                    }
                    } style={{"flex" : "1", "margin": "10px"}} type={'checkbox'}/>
                    <div style={{ "display" : "flex","flex" : "4", "alignItems" : "center"}}><TextContext textContext={text.context} /></div>
                    <input style={{"flex" : "1", "margin" : "10px"}} disabled value={text.text} />
                    <div style={{"display" : "flex", "justifyContent" : "left", "flex" : "1", "margin" : "10px"}}>{text.predictions.map(prediction => {
                        const prob = Number(prediction.probability)
                        if(prob > 0.84)  return <button style={{"flex" : "1", "marginRight" : "5px"}} className={"highProb"}>{`${prediction.code} : ${prob.toFixed(2)}`}</button>
                        else if (prob > 0.60) return <button style={{"flex" : "1", "marginRight" : "5px"}} className={"mediumProb"}>{`${prediction.code} : ${prob.toFixed(2)}`}</button>
                        else  return <button style={{"flex" : "1", "marginRight" : "5px"}} className={"lowProb"}>{`${prediction.code} : ${prob.toFixed(2)}`}</button>

                    })}
                    </div>
                    <Autocomplete onChange={(change, val) => {
                        selectedCode = val
                    }
                    } style={{"flex" : "1", "margin" : "10px"}} renderInput={(params) => <TextField {...params} label="Coicop" />} options={coicopOptions} />
                    <button onClick={() => giveCode({id: text.id, confirmedCode: selectedCode})} style={{"margin" : "10px"}}>Tilegn kode</button>
                    <button onClick={() => giveCode({id: text.id, confirmedCode: "NO_CODE"})} style={{"flex" : "1", "margin" : "10px"}}>Kan ikke kode</button>
                </div>
            })}
        </div>
    )
}

export default CodeView