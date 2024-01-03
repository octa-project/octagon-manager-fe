import axios from "axios"

// export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX :"http://43.231.114.215:7001"
export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:7001";

const apiMeasure = (mainRouteName: string) => ({

    getMeasures: () => axios.get(`${URL_PREFIX}/measure/${mainRouteName}`),
    getMeasureById: (id: string) => axios.get(`${URL_PREFIX}/measure/${mainRouteName}?id=${id}`),
})

export default apiMeasure;
