import {Autocomplete, createFilterOptions, TextField} from "@mui/material";

import {useContext, useState} from "react";
import {BulkCodeContext, CodeContext, CodeListContext} from "../../context/Code";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const filterOptions = createFilterOptions({
    stringify: ({ searchterms }) => searchterms.join(' ')
});

const CodeBulk = ({setFilter}) => {

    const {bulkCode, setBulkCode} = useContext(BulkCodeContext)
    const {giveCodeBulk, getReservedTextsForCoding} = useContext(CodeContext)
    const {selectedCodeList} = useContext(CodeListContext)
    const [currentSearch, setCurrentSearch] = useState('')
    return (
        <div className={'code-bulk-header'}>
            <div className={'code-bulk-bulk-container'}>
                <div className={'code-bulk-categories'}>
                    <Autocomplete onChange={(event, val) => setBulkCode(val)}
                                  renderInput={(params) => <TextField {...params} label={selectedCodeList ? selectedCodeList.name : ''} />}
                                  options={selectedCodeList ? selectedCodeList.codes : []}
                                  filterOptions={filterOptions}
                                  getOptionLabel={({code, description}) => {
                                      return `${code} - ${description}`;
                                  }}
                                  renderOption={(p, o, s) => {
                                      const hitword = o.searchterms.find(t => {
                                          if(t && currentSearch) return t.toLowerCase().includes(currentSearch.toLowerCase())
                                          else return false
                                      })
                                      return (<li {...p}>{`${o.code} - ${o.description}`}<span style={{color: '#44F', display: 'inline-block'}}>{hitword ? '('+hitword+')' : ''}</span></li>)
                                  }}
                                  value={bulkCode}
                                  onInputChange={(e, v, r) => {
                                      if(r === 'input') {
                                          setCurrentSearch(v)
                                      }
                                  }}
                    />
                </div>
                <div className={'code-bulk-assign'}>
                    <button onClick={() => {
                        if(bulkCode) giveCodeBulk(bulkCode.code)
                        const allBox = document.getElementById('bulkCheck')
                        allBox.checked = false
                        setFilter('')
                    }}
                            disabled={bulkCode === null}
                            className={'assign-code'}
                            style={{width: '40%'}}>
                                <CheckCircleOutlineIcon />
                    </button>
                    <button className={'fetch'}
                            onClick={getReservedTextsForCoding}
                            style={{width: '40%'}}>
                                Hent kodelinjer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CodeBulk