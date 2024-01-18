import axios from "axios"
//  export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7001";
export const URL_PREFIX = "http://localhost:7001";

 const apiPdfGenerator = (mainRouteName: string) => ({
      
    GetPdf: () => axios.get(`${URL_PREFIX}/pdf/generate/${mainRouteName}`,),
})

export default apiPdfGenerator;