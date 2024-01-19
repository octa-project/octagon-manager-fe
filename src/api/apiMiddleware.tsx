import axios from "axios";

export const URL_PREFIX = "http://localhost:7000";

const apiMiddleware = (mainRouteName: string) => ({

    GetComputerName: () => axios.get(`${URL_PREFIX}/computer-name/`),
})

export default apiMiddleware;