import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {ENCODING_URL} from "../constant/api";

if (process.env.REACT_APP_ENV === 'local') axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_BEARER_TEST
export const CodeContext = createContext()

const CodeProvider = ({children}) => {
    const [texts, setTexts] = useState([])
    const [selectedTexts, setSelectedTexts] = useState([])

    const reserveTexts = () => {
        return axios.post(`${ENCODING_URL}/reserve`, {size: 50})
    }
    const getTexts = () => axios.get(`${ENCODING_URL}/not-confirmed`)

    const giveCode = (text) => {

        axios.put(`${ENCODING_URL}/confirm/${text.id}`, {confirmedCode: text.confirmedCode}).then(res => {
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
        const getReservedTextsForCoding = async () => {
            const texts = await getTexts()
            if(texts.data.length === 0) {
                const reserveResult = await reserveTexts()
                if(reserveResult.status === 200) {
                    const newTexts = await getTexts()
                    setTexts(newTexts.data)
                }
            }
            else{
                setTexts(texts.data)
            }
        }
        if(texts.length === 0) getReservedTextsForCoding().then()

    }, [texts])

    return (
        <CodeContext.Provider value={{texts, giveCode, addTextToSelected, removeTextFromSelected, giveCodeBulk}}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeProvider