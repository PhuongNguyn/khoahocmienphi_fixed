import IBanner from "@/interfaces/IBanner"
import axios, { AxiosResponse } from "axios"
import { fetchApi } from ".";

const url = '/banner'
const api_key = '955cfec3b475c1a984876c4ab9149f4e'
const time = new Date().getTime()

export const getBanner = ():Promise<AxiosResponse<{banner: IBanner}>> => fetchApi().get(url)