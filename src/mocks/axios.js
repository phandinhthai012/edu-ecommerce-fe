import axios from "axios";
import { mockProducts } from "../data/products";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  withCredentials: true 
});



instance.interceptors.request.use(req => {
  const data = mockProducts.slice(0, 3);
  if (req.url.includes("/api/suggestions")) {
    
    req.adapter = () => Promise.resolve({
      data: data,
      status: 200,
      statusText: "OK",
      config: req,
      headers: {}
    });
  }
  return req;
});


export default instance;