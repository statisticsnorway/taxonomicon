import axios from "axios";
import {CODELIST_URL} from "../../constant/api";

const formSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    axios.post(`${CODELIST_URL}/file`, data).then(res => {
        console.log('Code list uploaded')
    })
}
const CodeListUpload = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '30px'}}>
            <form onSubmit={formSubmit} encType={'multipart/form-data'}>
                <div style={{display : 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start'}}>
                <div><label for={'codelistName'}>Navn</label><input required name={'codelistName'} type={'text'} /></div>
                <input required name={'file'} type={'file'}
                />
                <button>Lagre kodeliste</button>
                </div>
            </form>
        </div>
    )
}
export default CodeListUpload