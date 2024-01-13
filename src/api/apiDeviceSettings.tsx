import axios from "axios"

export const URL_PREFIX = process.env.REACT_APP_IS_PROD ? process.env.REACT_APP_PROD_URL_PREFIX : "http://localhost:7001";
