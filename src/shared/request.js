import axios from "axios";
import { Cookies } from "react-cookie";

const token = new Cookies().get("token");
const token2 = new Cookies().get("refreshToken");

axios.defaults.headers.common['Authorization'] = `${token}`
axios.defaults.headers.common['Refresh-Token'] = `${token2}`

//refresh 토큰 꺼내기
//console.log("token여기", token);
//console.log("token2여기", token2);

const instance = axios.create({
  baseURL: "https://test2.pyuri.dev/",
  headers: {
     'Content-Type': 'application/json',
    // Authorization : `${token}`,
    // "Refresh-Token": `${token2}`,
    // 왜 안넘어가지?
  }
});

//if (token !== undefined && token !== null) {
//  Headers.authorization = `Bearer ${token}`
//}

export default instance;
