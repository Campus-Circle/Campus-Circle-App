import { useSelector } from "react-redux";
import axios from "axios";

const auth = useSelector(state => state.auth);

export function isAuth(){
    const URL = process.env.API;

    axios.post(`${URL}/validate`, {
        key: 'value'
    } ,config).then(res => {
        return true;
    }).catch(err => {
        console.log(err.response.data)
        return false;
    })
}