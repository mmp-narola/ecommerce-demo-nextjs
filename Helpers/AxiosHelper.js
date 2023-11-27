import axios from "axios";
// import { toast } from "react-toastify";

export const Axios = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
    }
});

//Error Handler
const HandleErrorResponse = (error) => {

    if (!error.response) {
        const errorMessage = error?.message || "Network error - something went wrong";
        toast.error(errorMessage)
        return Promise.reject(error);
    }

    const { response: { data, status } } = error;
    let errorMessage = "Something went wrong!";

    //Handle error if any unauthorized request has been made.
    if (status === 401) {
        errorMessage = data?.message || "Unauthorized access";
    } else {
        errorMessage = data?.message || error?.message
    }

    toast.error(errorMessage)
    return Promise.reject(errorMessage);
};


// Add a request interceptor
Axios.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return HandleErrorResponse(error)
});