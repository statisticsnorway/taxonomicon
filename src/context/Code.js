import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {ENCODING_URL} from "../constant/api";
import {bearerTokenTest} from "../data/omit/token";

if (process.env.REACT_APP_ENV === 'local') axios.defaults.headers.common['Authorization'] = bearerTokenTest
export const CodeContext = createContext()

const CodeProvider = ({children}) => {
    const [texts, setTexts] = useState([])
    const [selectedTexts, setSelectedTexts] = useState([])
    const giveCode = (text) => {

        axios.put(`${ENCODING_URL}/${text.id}`, {confirmedCode: text.confirmedCode}).then(res => {
            setTexts(texts.filter(listText => listText.id !== text.id))
        })
    }
    const giveCodeBulk = (code) => {
        axios.put(`${ENCODING_URL}/confirm/bulk`, {confirmedCode : code, ids: selectedTexts.map(text => text.id)}).then(res => {
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

        axios.get(`${ENCODING_URL}/not-confirmed`).then(res => {
            setTexts(res.data)
        })
    }, [])

    return (
        <CodeContext.Provider value={{texts, giveCode, addTextToSelected, removeTextFromSelected, giveCodeBulk}}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeProvider