import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {CODELIST_URL, ENCODING_URL} from "../constant/api";

if (process.env.REACT_APP_ENV === 'local') axios.defaults.headers.common['Authorization'] = process.env.REACT_APP_BEARER_TEST
export const CodeContext = createContext()
export const BulkCodeContext = createContext(null)
export const CodeListContext = createContext(null)

export const CodeListProvider = ({children}) => {
    const [codeListList, setCodeListList] = useState([])
    const [selectedCodeList, setSelectedCodeList] = useState(null)
    useEffect(() => {
        axios.get(`${CODELIST_URL}`).then(res => {
            setCodeListList(res.data)
            return res.data[0].id
        }).then(res => {
            axios.get(`${CODELIST_URL}/${res}`).then(res => {
                const t = res.data.codes.map(code => {
                    let trim = code.code
                    if(trim[0] === '0') {
                        trim = trim.substring(1)
                    }
                    trim = trim.replaceAll('.', '')
                    const searchWords= code.searchwords.map(term => term.searchword)
                    return {
                        id: code.id,
                        code: code.code,
                        description: code.description,
                        trimCode: trim,
                        searchterms: searchWords
                    }
                })
                setSelectedCodeList(t)
            })
        })
    }, [])
    useEffect(() => {
        console.log('CODE LIST', selectedCodeList)
    }, [selectedCodeList])
    return (
        <CodeListContext.Provider value={{selectedCodeList}}>
            {children}
        </CodeListContext.Provider>
    )
}
export const BulkCodeProvider = ({children}) => {
    const [bulkCode, setBulkCode] = useState(null)
    return (
        <BulkCodeContext.Provider value={{bulkCode, setBulkCode}}>
            {children}
        </BulkCodeContext.Provider>
    )
}

const CodeProvider = ({children}) => {
    const [texts, setTexts] = useState([])
    const [selectedTexts, setSelectedTexts] = useState([])

    const reserveTexts = () => {
        return axios.post(`${ENCODING_URL}/reserve`, {size: 200})
    }
    const getTexts = () => axios.get(`${ENCODING_URL}/not-confirmed?limit=20`)

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
    const giveCode = (text) => {
        if(text.confirmedCode) {
            axios.put(`${ENCODING_URL}/confirm/${text.id}`, {confirmedCode: text.confirmedCode}).then(res => {
                setTexts(texts.filter(listText => listText.id !== text.id))
            })
        }
    }
    const giveCodeBulk = (code) => {
        axios.put(`${ENCODING_URL}/confirm-bulk`, {confirmedCode : code, ids: selectedTexts}).then(res => {
            const tempSelected = selectedTexts.map(text => text)
            setSelectedTexts([])
            setTexts(texts.filter(text => !tempSelected.includes(text.id)))
        })
    }
    const addTextToSelected = (text) => {
        setSelectedTexts([...selectedTexts, text])
    }
    const removeTextFromSelected = (text) => {
        setSelectedTexts(selectedTexts.filter(listText => listText !== text))
    }
    useEffect(() => {
    }, [selectedTexts])
    return (
        <CodeContext.Provider value={{texts, giveCode, addTextToSelected, removeTextFromSelected, giveCodeBulk, getReservedTextsForCoding, setSelectedTexts}}>
            {children}
        </CodeContext.Provider>
    )
}

export default CodeProvider