import axios from 'axios';

const API_URL="http://localhost:3300/auth";

class authService {
    login(email, password){
        return axios.post(API_URL+"signin",{email,password}).then((res) => {
            if(res.data.accessToken)
                localStorage.setItem("user",JSON.stringify(res.data));
        })
    }
}