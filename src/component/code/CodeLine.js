import CodeLineContext from "./CodeLineContext";
import {Autocomplete, TextField, createFilterOptions, Tooltip} from "@mui/material";
import {useContext, useState} from "react";
import {BulkCodeContext, CodeContext, CodeListContext} from "../../context/Code";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';

const buildCode = (trimcode) => {

    if(trimcode.length === 5) {
        return trimcode[0]+trimcode[1]+'.'+trimcode[2]+'.'+trimcode[3]+'.'+trimcode[4]
    }
    return '0'+trimcode[0]+'.'+trimcode[1]+'.'+trimcode[2]+'.'+trimcode[3]
}
const getDescription = (trimcode, coicopOptions) => {
    const desc = coicopOptions.find(option => option.trimCode === trimcode)
    if (desc) return desc.description
    return 'Ugyldig kode'
}

const filterOptions = createFilterOptions({
    stringify: ({ searchterms }) => searchterms.join(' ')
});

const predictionComponent = (prediction, findTrimCode, selectedCodeList) => {
    const prob = Number(prediction.probability)
    if(prob > 0.84)
        return (<div key={prediction.code} className={'codeline-prediction'}>
                <button  className={"prediction-high"}
                         onClick={() => findTrimCode(prediction.code)}>
                    {buildCode(prediction.code)}
                </button>
            </div>
        )
    else if (prob > 0.60)
        return (<div key={prediction.code} className={"codeline-prediction"}>
            <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{`Kategori: ${buildCode(prediction.code)} - ${getDescription(prediction.code, selectedCodeList)}\n Sannsynlighet: ${prob.toFixed(2)}`}</span>}><button  className={"prediction-medium"}
                                                                                                                                                                                                                             onClick={() => findTrimCode(prediction.code)}>
                {buildCode(prediction.code)}
            </button></Tooltip>
        </div>)
    else
        return (<div key={prediction.code} className={"codeline-prediction"}>
            <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{`Kategori: ${buildCode(prediction.code)} - ${getDescription(prediction.code, selectedCodeList)}\n Sannsynlighet: ${prob.toFixed(2)}`}</span>}><button  className={"prediction-low"}
                                                                                                                                                                                                                             onClick={() => findTrimCode(prediction.code)}>
                {buildCode(prediction.code)}
            </button></Tooltip>
        </div>)
}

const CodeLine = ({ text}) => {
    const {setBulkCode} = useContext(BulkCodeContext)
    const {giveCode, addTextToSelected, removeTextFromSelected} = useContext(CodeContext)
    const {selectedCodeList} = useContext(CodeListContext)
    const [autoCompleteValue, setAutoCompleteValue] = useState(null)
    const [selectedCode, setSelectedCode] = useState(null)
    const [currentSearch, setCurrentSearch] = useState('')
    const checkBoxCheck = (event) => {
        if(event.target.checked) {
            addTextToSelected( text.id)
        }
        else {
            removeTextFromSelected( text.id)
        }
    }
    const findTrimCode = (trim) => {
        const predCode = selectedCodeList.find((ob) => ob.trimCode === trim)
        if(predCode) {
            setSelectedCode(predCode.code)
            setAutoCompleteValue(predCode)
            setBulkCode(predCode)
        }
    }
    const onAutocompleteChange = (change, val) => {
        if (val) {
            setSelectedCode(val.code)
            setAutoCompleteValue(val)
            setBulkCode(val)
        }
        else {
            setSelectedCode(null)
            setAutoCompleteValue(null)
        }
    }
    return (
        <div className={'codeline-container'}>
            <div className={'flex-3 codeline-text-container'}>
                <span className={'codeline-text'}>{text.text}</span>
            </div>

            <div className={'flex-5 codeline-context-container'}>
                <CodeLineContext textContext={text.context} />
            </div>

            <div className={'flex-2 codeline-predictions-container'}>
                {text && text.predictions && text.predictions.length > 0 &&
                    predictionComponent(text.predictions[0], findTrimCode, selectedCodeList)
                }
            </div>
            <div className={'flex-4 codeline-categories-container'}>
                <Autocomplete onChange={onAutocompleteChange}
                              renderInput={(params) => selectedCode ? <Tooltip title={autoCompleteValue.description}><TextField {...params} label="COICOP" /></Tooltip> : <TextField {...params} label="COICOP" />  }
                              options={selectedCodeList ? selectedCodeList : []}
                              filterOptions={filterOptions}
                              getOptionLabel={({code, description, searchterms}) => {
                                  return `${code} - ${description}`;

                              }}
                              renderOption={(p, o, s) => {
                                  const hitword = o.searchterms.find(t => {
                                      if(t && currentSearch) return t.toLowerCase().includes(currentSearch.toLowerCase())
                                      else return false
                                  })
                                  return (<li  {...p}><span style={{display : 'inline-block'}}>{`${o.code} - ${o.description}`}<span style={{color: '#44F'}}>{hitword ? ' ('+hitword+')' : ''}</span></span></li>)
                              }}
                              value={autoCompleteValue}
                              isOptionEqualToValue={(option, value) => option.id === value.id}
                              onInputChange={(e, v, r) => {
                                  if(r === 'input') {
                                      setCurrentSearch(v)
                                  }
                              }}

                />
            </div>
            <div className={'flex-1 codeline-assign-container'}>
                <button

                        disabled={selectedCode === null}
                        onClick={() => giveCode({id: text.id, confirmedCode: selectedCode})}
                        className={'width-75 assign-code disableIcon'}>
                    <CheckCircleOutlineIcon />
                </button>
            </div>
            <div className={'flex-1 codeline-assign-container'}>
                <button onClick={() => giveCode({id: text.id, confirmedCode: 'INPUTER'})}
                        className={'width-75 inpute'}>
                    <ArrowForwardIcon/>
                </button>
            </div>
            <div className={'flex-1 codeline-assign-container'}>
                <button onClick={() => giveCode({id: text.id, confirmedCode: "DONT_CODE"})}
                        className={'width-75 no-code'}>
                    <DoDisturbOnIcon sx={{ color: 'red' }} />
                </button>
            </div>
            <div  className={'flex-1 codeline-check-container'}>
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