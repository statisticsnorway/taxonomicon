import CodeLineContext from "./CodeLineContext";
import {Autocomplete, TextField, createFilterOptions} from "@mui/material";
import {coicopOptions} from "../../data/coicop";
import {useContext, useState} from "react";
import {CodeContext} from "../../context/Code";

const filterOptions = createFilterOptions({
    stringify: ({ searchterms }) => searchterms.join(' ')
});

const CodeLine = ({ text}) => {
    const {giveCode, addTextToSelected, removeTextFromSelected} = useContext(CodeContext)
    const [autoCompleteValue, setAutoCompleteValue] = useState(null)
    const [selectedCode, setSelectedCode] = useState(null)
    const checkBoxCheck = (event) => {
        if(event.target.checked) {
            addTextToSelected( text.id)
        }
        else {
            removeTextFromSelected( text.id)
        }
    }
    const findTrimCode = (trim) => {
        const predCode = coicopOptions.find((ob) => ob.trimCode === trim)
        if(predCode) {
            setSelectedCode(predCode.code)
            setAutoCompleteValue(predCode)
        }
    }
    const onAutocompleteChange = (change, val) => {
        if (val) {
            setSelectedCode(val.code)
            setAutoCompleteValue(val)
        }
        else {
            setSelectedCode(null)
            setAutoCompleteValue(null)
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
                        return (<div key={prediction.code} className={'codeline-prediction'}>
                            <button  className={"width-75 prediction-high"}
                                    onClick={() => findTrimCode(prediction.code)}>
                                {`${prediction.code} : ${prob.toFixed(2)}`}
                            </button>
                            </div>
                        )
                    else if (prob > 0.60)
                        return (<div key={prediction.code} className={"codeline-prediction"}>
                            <button  className={"width-75 prediction-medium"}
                                    onClick={() => findTrimCode(prediction.code)}>
                                {`${prediction.code} : ${prob.toFixed(2)}`}
                            </button>
                        </div>)
                    else
                        return (<div key={prediction.code} className={"codeline-prediction"}>
                            <button  className={"width-75 prediction-low"}
                                    onClick={() => findTrimCode(prediction.code)}>
                                {`${prediction.code} : ${prob.toFixed(2)}`}
                            </button>
                        </div>)
                })}
            </div>
            <div className={'codeline-categories-container'}>
                <Autocomplete onChange={onAutocompleteChange}
                          renderInput={(params) => <TextField {...params} label="Coicop" />}
                          options={coicopOptions}
                          filterOptions={filterOptions}
                          getOptionLabel={({code, description}) => {
                              return `${code} - ${description}`;
                          }}
                          value={autoCompleteValue}

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
                       name={'codecheck'}
                       id={text.id}
                />
            </div>
        </div>
    )
}

export default CodeLine