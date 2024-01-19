import axios from "axios"

// export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.193:7003"
export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:7001"

const apiReport = (mainRouteName: string) => ({

    getCashierReportByBetweenDate: (data: any) => axios.post(`${URL_PREFIX}/report/${mainRouteName}`, data),
    getIncomeReportByBetweenDate: (data: any) => axios.post(`${URL_PREFIX}/report/${mainRouteName}`, data),
    getOutcomeReportByBetweenDate: (data: any) => axios.post(`${URL_PREFIX}/report/${mainRouteName}`, data),
    getPriceReportByBetweenDate: (data: any) => axios.post(`${URL_PREFIX}/report/${mainRouteName}`, data),
    getSaleReportByBetweenDate: (data: any) => axios.post(`${URL_PREFIX}/report/${mainRouteName}`, data),
    getSaleReport: (data: any) => axios.post(`${URL_PREFIX}/report/${mainRouteName}`, data),
    getTransactionsByBetweenDate: (data: any) => axios.post(`${URL_PREFIX}/report/${mainRouteName}`, data),
    getReportFile: () => axios.get(`${URL_PREFIX}/report/${mainRouteName}`),

})

export default apiReport
