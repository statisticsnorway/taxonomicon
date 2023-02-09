import {useContext} from "react";
import {CodeContext} from "../../context/Code";
import CodeLine from "./CodeLine";


const CodeView = () => {
    const {texts, getReservedTextsForCoding} = useContext(CodeContext)
    return (
        <div>
            {texts && texts.length > 0 &&
                <div>
                    <div className={'codeline-header-container'}>
                        <div className={'flex-2 codeline-header'}>
                            Tekst for koding
                        </div>
                        <div className={'flex-5 codeline-header'}>
                            Kontekst
                        </div>
                        <div className={'flex-2 codeline-header'}>
                            Prediksjoner
                        </div>
                        <div className={'flex-2 codeline-header'}>
                            Velg kategori
                        </div>
                        <div className={'flex-1 codeline-header'}/>
                        <div className={'flex-1 codeline-header'}/>
                        <div className={'flex-1 codeline-header'}/>
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