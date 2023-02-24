import {Autocomplete, createFilterOptions, TextField} from "@mui/material";

import {useContext} from "react";
import {BulkCodeContext, CodeContext, CodeListContext} from "../../context/Code";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const filterOptions = createFilterOptions({
    stringify: ({ searchterms }) => searchterms.join(' ')
});

const CodeBulk = () => {

    const {bulkCode, setBulkCode} = useContext(BulkCodeContext)
    const {giveCodeBulk, getReservedTextsForCoding} = useContext(CodeContext)
    const {selectedCodeList} = useContext(CodeListContext)
    return (
        <div className={'code-bulk-header'}>
            <div className={'code-bulk-bulk-container'}>
                <div className={'code-bulk-categories'}>
                    <Autocomplete onChange={(event, val) => setBulkCode(val)}
                                  renderInput={(params) => <TextField {...params} label="COICOP" />}
                                  options={selectedCodeList ? selectedCodeList : []}
                                  filterOptions={filterOptions}
                                  getOptionLabel={({code, description}) => {
                                      return `${code} - ${description}`;
                                  }}
                                  value={bulkCode}
                    />
                </div>
                <div className={'code-bulk-assign'}>
                    <button onClick={() => {if(bulkCode) giveCodeBulk(bulkCode.code)}}
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