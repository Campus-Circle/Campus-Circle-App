import axios from 'axios';
export function isAuth() {
  const URL = process.env.API;

  axios
    .post(`${URL}/validate`, {
      key: 'value'
    })
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err.response.data);
      return false;
    });
}
