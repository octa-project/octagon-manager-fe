import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:7002";

const apiWallet = (mainRouteName: string) => ({

    getWalletBalance: (phoneNum: any) => axios.get(`${URL_PREFIX}/wallet/${mainRouteName}?phoneNum=${phoneNum}`),
    getWalletTransactionHistory: (data: any) => axios.post(`${URL_PREFIX}/wallet/${mainRouteName}`, data),
    walletToAccountTransaction: (data: any) => axios.post(`${URL_PREFIX}/wallet/${mainRouteName}`,data),
    cardToWalletTransaction: (data: any) => axios.post(`${URL_PREFIX}/wallet/${mainRouteName}`,data),
    getCardWeb: (data: any) => axios.post(`${URL_PREFIX}/wallet/${mainRouteName}`,data),
    getCardList: (phoneNum: any) => axios.get(`${URL_PREFIX}/wallet/${mainRouteName}?phoneNum=${phoneNum}`),
    saveCard: (phoneNum: any) => axios.get(`${URL_PREFIX}/wallet/${mainRouteName}?phoneNum=${phoneNum}`),
    walletToWalletTransaction: (data: any) => axios.post(`${URL_PREFIX}/wallet/${mainRouteName}`,data),

})

export default apiWallet