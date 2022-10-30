import axios from "axios";

const instance=axios.create(
    {
        baseURL:"https://paymentoptions.herokuapp.com",
    });

export default instance;