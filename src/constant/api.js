export const PROTOCOL = process.env.REACT_APP_ENCODING_PROTOCOL
export const HOST = process.env.REACT_APP_ENCODING_HOST
export const PORT = process.env.REACT_APP_ENCODING_PORT

export const API_VERSION = 'v1'
export const ENCODING_URL = `${PROTOCOL}://${HOST}:${PORT}/${API_VERSION}/encoding`