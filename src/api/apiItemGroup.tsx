import axios from "axios"
 export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://43.231.114.215:7001";

 const apiItemGroup = (mainRouteName: string) => ({
      saveItemGroup:(data:any) => axios.post(`${URL_PREFIX}/itemgroup/${mainRouteName}`,data),
      updateItemGroup:(data:any) => axios.post(`${URL_PREFIX}/itemgroup/${mainRouteName}`,data),
      getitemGroupById:(id:any) => axios.get(`${URL_PREFIX}/itemgroup/${mainRouteName}?id=${id}`),
      getAllItemGroups:() => axios.get(`${URL_PREFIX}/itemgroup/${mainRouteName}`,),
      deleteItemGroupById:(id:any) => axios.post(`${URL_PREFIX}/itemgroup/${mainRouteName}?id=${id}`),
})

export default apiItemGroup