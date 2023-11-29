import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:8400"

const apiTransaction = (mainRouteName: string) => ({

    saveTransaction: (data: any) => axios.post(`${URL_PREFIX}/transaction/${mainRouteName}`, data),
    updateTransaction: (data: any) => axios.post(`${URL_PREFIX}/transaction/${mainRouteName}`, data),
    deleteTransaction: (id: any) => axios.delete(`${URL_PREFIX}/transaction/${mainRouteName}?id=${id}`),
    getTransactionById: (id: any) => axios.get(`${URL_PREFIX}/transaction/${mainRouteName}?id=${id}`),
    getTransactions: () => axios.get(`${URL_PREFIX}/transaction/${mainRouteName}`),
    getTransactionsBySaleId: (id: any) => axios.get(`${URL_PREFIX}/transaction/${mainRouteName}?id=${id}`),
    getTransactionsAmountBySaleId: (id: any) => axios.get(`${URL_PREFIX}/transaction/${mainRouteName}?id=${id}`),

    saveBankTransaction: (data: any) => axios.post(`${URL_PREFIX}/bank-transaction/${mainRouteName}`, data),
    updateBankTransaction: (data: any) => axios.post(`${URL_PREFIX}/bank-transaction/${mainRouteName}`, data),
    deleteBankTransactionById: (id: any) => axios.delete(`${URL_PREFIX}/bank-transaction/${mainRouteName}?id=${id}`),
    getBankTransactionById: (id: any) => axios.get(`${URL_PREFIX}/bank-transaction/${mainRouteName}?id=${id}`),
    getBankTransactions: () => axios.get(`${URL_PREFIX}/bank-transaction/${mainRouteName}`),
    
})

export default apiTransaction
