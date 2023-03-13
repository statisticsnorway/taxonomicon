import {useContext, useEffect, useState} from "react";
import {CodeContext, CodeListContext} from "../../context/Code";
import CodeLine from "./CodeLine";


const CodeView = ({filter, setFilter}) => {

    const [allSelected, setAllSelected] = useState(false)
    const {selectedCodeList} = useContext(CodeListContext)
    const {texts, getReservedTextsForCoding, setSelectedTexts} = useContext(CodeContext)
    const filteredTexts = texts.filter(t => t.text.toLowerCase().includes(filter.toLowerCase()))
    useEffect(() => {
        let newSelected = []
        if(allSelected) {
            const checkboxes = document.getElementsByName('codecheck')
            checkboxes.forEach((box) => {
                if(box.checked !== true) {
                    box.checked = true
                    newSelected = [...newSelected, box.id]
                }
            })
            setSelectedTexts(newSelected)
        }
        else {
            setSelectedTexts([])
            const checkboxes = document.getElementsByName('codecheck')
            checkboxes.forEach((box) => {
                if(box.checked === true) {
                    box.checked = false
                }
            })
        }
    }, [allSelected, setSelectedTexts])
    useEffect(() => {
        if(texts.length === 0) setAllSelected(false)
    }, [texts])

    return (
        <div>
            {texts && texts.length > 0 &&
                <div>
                    <div className={'codeline-header-container'}>
                        <div className={'flex-3 codeline-header'}>
                            Tekst for koding
                            <div><input value={filter} type={'text'} onChange={(ev) => {setFilter(ev.target.value)}} /></div>
                        </div>
                        <div className={'flex-4 codeline-header'}>
                            Kontekst
                        </div>
                        <div className={'flex-1 codeline-header'}>
                            Prediksjon
                        </div>
                        <div className={'flex-5 codeline-header'}>
                            Velg kategori
                        </div>
                        <div className={'flex-2 codeline-header'}/>
                        <div className={'flex-1 codeline-header'}>
                            <input id={'bulkCheck'} className={'codeline-check'} type={'checkbox'} onChange={(event) => {setAllSelected(event.target.checked)}}/>
                        </div>
                    </div>
                    {filteredTexts.map(text => <CodeLine setFilter={setFilter} key={text.id} text={text}/>)}
                </div>
            }
            {texts && texts.length === 0 && selectedCodeList &&
                <div style={{'margin' : '20px'}}>
                    <button className={'width-75 fetch'}
                            onClick={getReservedTextsForCoding}>
                        Du er tom for kodelinjer. Hent flere
                    </button>
                </div>
            }
            {!selectedCodeList &&
                <div>
                    Laster inn kodeverk...
                </div>
            }
        </div>
    )
}

export default CodeView