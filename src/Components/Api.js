import Axios from 'axios'

export default () =>{

    let token = localStorage.getItem('token');

    const instance = Axios.create({
        baseURL: 'http://localhost:8000/api/'
      });
      
      if(token!=null){
        instance.defaults.headers.common['Authorization'] = 'Bearer '+token;
      }
      return instance
}