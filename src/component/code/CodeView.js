import {useContext, useEffect, useState} from "react";
import {CodeContext} from "../../context/Code";
import CodeLine from "./CodeLine";


const CodeView = () => {
    const [allSelected, setAllSelected] = useState(false)
    const {texts, getReservedTextsForCoding, setSelectedTexts} = useContext(CodeContext)
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
                        </div>
                        <div className={'flex-5 codeline-header'}>
                            Kontekst
                        </div>
                        <div className={'flex-2 codeline-header'}>
                            Prediksjoner
                        </div>
                        <div className={'flex-4 codeline-header'}>
                            Velg kategori
                        </div>
                        <div className={'flex-1 codeline-header'}/>
                        <div className={'flex-1 codeline-header'}/>
                        <div className={'flex-1 codeline-header'}/>
                        <div className={'flex-1 codeline-header'}>
                            <input className={'codeline-check'} type={'checkbox'} onChange={(event) => {setAllSelected(event.target.checked)}}/>
                        </div>
                    </div>
                    {texts.map(text => <CodeLine key={text.id} text={text}/>)}
                </div>
            }
            {texts && texts.length === 0 &&
                <div style={{'margin' : '20px'}}>
                    <button className={'width-75 fetch'}
                            onClick={getReservedTextsForCoding}>
                        Du er tom for kodelinjer. Hent flere
                    </button>
                </div>
            }
        </div>
    )
}

export default CodeView