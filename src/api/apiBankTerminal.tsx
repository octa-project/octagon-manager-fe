import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:7000"

const apiBankTerminal = (mainRouteName: string) => ({

    bankTerminalTransaction: (data: any) => axios.post(`${URL_PREFIX}/${mainRouteName}`, data),
    bankPrintTransaction: (data: any) => axios.post(`${URL_PREFIX}/${mainRouteName}`, data),

})

export default apiBankTerminal
