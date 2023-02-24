
export const BASE_URL = process.env.REACT_APP_ENV !== 'local' ? window.BASE_URL : process.env.REACT_APP_BASE_URL

export const ENCODING_URL = `${BASE_URL}/v1/encoding`
export const CODELIST_URL = `${BASE_URL}/v1/codelist`