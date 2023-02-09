import CodeLineContext from "./CodeLineContext";
import {Autocomplete, TextField} from "@mui/material";
import {coicopOptions} from "../../data/coicop";
import {useContext, useState} from "react";
import {CodeContext} from "../../context/Code";


const CodeLine = ({ text}) => {
    const {giveCode, addTextToSelected, removeTextFromSelected} = useContext(CodeContext)
    const [selectedCode, setSelectedCode] = useState(null)
    const checkBoxCheck = (event) => {
        if(event.target.checked) {
            addTextToSelected( {id: text.id} )
        }
        else {
            removeTextFromSelected( {id: text.id})
        }
    }
    return (
        <div className={'codeline-container'}>
            <div className={'codeline-text-container'}>
                <input disabled value={text.text} className={'codeline-text'}/>
            </div>

            <div className={'codeline-context-container'}>
                <CodeLineContext textContext={text.context} />
            </div>

            <div className={'codeline-predictions-container'}>
                {text.predictions.map(prediction => {
                    const prob = Number(prediction.probability)
                    if(prob > 0.84)
                        return (<div className={'codeline-prediction'}>
                            <button key={prediction.code} className={"width-75 prediction-high"}>
                                {`${prediction.code} : ${prob.toFixed(2)}`}
                            </button>
                            </div>
                        )
                    else if (prob > 0.60)
                        return (<div className={"codeline-prediction"}>
                            <button key={prediction.code} className={"width-75 prediction-medium"}>
                                {`${prediction.code} : ${prob.toFixed(2)}`}
                            </button>
                        </div>)
                    else
                        return (<div className={"codeline-prediction"}>
                            <button key={prediction.code} className={"width-75 prediction-low"}>
                                {`${prediction.code} : ${prob.toFixed(2)}`}
                            </button>
                        </div>)
                })}
            </div>
            <div className={'codeline-categories-container'}>
                <Autocomplete onChange={(change, val) => {setSelectedCode(val)}}
                          renderInput={(params) => <TextField {...params} label="Coicop" />}
                          options={coicopOptions}
                />
            </div>
            <div className={'codeline-assign-container'}>
                <button disabled={selectedCode === null}
                        onClick={() => giveCode({id: text.id, confirmedCode: selectedCode})}
                        className={'width-75 assign-code'}>
                    Tilegn kode
                </button>
            </div>
            <div className={'codeline-assign-container'}>
                <button onClick={() => giveCode({id: text.id, confirmedCode: "NO_CODE"})}
                        className={'width-75 no-code'}>
                    Kan ikke kode
                </button>
            </div>
            <div  className={'codeline-check-container'}>
                <input onChange={checkBoxCheck}
                       type={'checkbox'}
                       className={'codeline-check'}
                />
            </div>
        </div>
    )
}

export default CodeLine