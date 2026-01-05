import getClient from "../axiosClient";

export function apiGet(endpoint: string, params?: object| null ){
   
    const axiosClient = getClient();

    return axiosClient.get(endpoint ,{
        params: params
    }).then(res => res?.data ?? []);
}

export function apiFetch(endpoint: string, params?: object | null){
    return apiGet(endpoint, {
        ...params,
        per_page: Number.MIN_SAFE_INTEGER
    }).then(res => res?.data ?? [])
}