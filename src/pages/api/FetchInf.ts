import axios from "axios"
import { NasaApiResponse } from "./Interfaces/Inters";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const instance = axios.create({
  baseURL: "https://images-api.nasa.gov/"
})

const instance2 = axios.create({
  baseURL: "https://api.nasa.gov/planetary/",
}); 

export async function FetchInfo() {
    const res = await instance.get<NasaApiResponse>(
      "search?q=planets&media_type=image"
    );
    return res.data.collection;
}

export async function FetchImg() {
    const res = await instance2.get(`apod?api_key=${apiKey}`);
    return res.data;
}