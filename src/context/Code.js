import {createContext, useEffect, useState} from "react";
import axios from "axios";
import testData from "../data/omit/item.json"



export const CodeContext = createContext()

const CodeProvider = ({children}) => {
    const [texts, setTexts] = useState([])
    const [selectedTexts, setSelectedTexts] = useState([])
    const removeFromList = (text) => {

    }
    const giveCode = (text) => {
        console.log("TEXT", text)
        axios.put('http://localhost:8081/v1/encoding/'+text.id, {confirmedCode: text.confirmedCode}).then(res => {
            setTexts(texts.filter(listText => listText.id !== text.id))
        })
    }
    const giveCodeBulk = (code) => {
        axios.put('http://localhost:8081/v1/encoding/confirm/bulk', {confirmedCode : code, ids: selectedTexts.map(text => text.id)}).then(res => {
            const tempSelected = selectedTexts.map(tempText => tempText.id)
            setSelectedTexts([])
            setTexts(texts.filter(text => !tempSelected.includes(text.id)))
        })
    }
    const addTextToSelected = (text) => {
        setSelectedTexts([...selectedTexts, text])
    }
    const removeTextFromSelected = (text) => {
        setSelectedTexts(selectedTexts.filter(listText => listText.id !== text.id))
    }
    useEffect(() => {
        axios.get("http://localhost:8081/v1/encoding").then(res => {
            setTexts(res.data)
        }).catch(er => {
            setTexts(testData)
        })
    }, [])
    useEffect(() => {
        console.log("SELECTED TEXTS", selectedTexts)
    }, [selectedTexts])
    return (
        <CodeContext.Provider value={{texts, giveCode, addTextToSelected, removeTextFromSelected, giveCodeBulk}}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeProvider