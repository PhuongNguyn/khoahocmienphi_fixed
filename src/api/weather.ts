import IWeather from "@/interfaces/IWeather"
import axios, { AxiosResponse } from "axios"

const url = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = '955cfec3b475c1a984876c4ab9149f4e'
const time = new Date().getTime()

export const getListWeather = (lat: number, lon: number):Promise<AxiosResponse<IWeather>> => axios.get(`${url}?lat=${lat}&lon=${lon}&appid=${api_key}&lang=vi`)