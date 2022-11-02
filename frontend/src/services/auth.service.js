import axios from "axios";

const API_URL = "http://localhost:8080/";

const register = (user) => {
    const {username, email, password} = {...user};
    return axios.post(API_URL + "register", {
      username,
      email,
      password,
    });
  };

  const login = (user) => {
    const { email, password} = {...user};
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.sessUser) {
          console.log(response.data);
          localStorage.setItem("user", JSON.stringify(response.data.sessUser));
        }
        return response.data;
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "logout").then((response) => {

      console.log("logout");
      window.location.reload();
      return response.data;
    });
  };

  const AuthService = {
    register,login,logout
  }
  
  export default AuthService;


