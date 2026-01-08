import getClient from "../axiosClient";

export function apiGet(endpoint: string, params?: object| null ){
   
    const axiosClient = getClient();

    return axiosClient.get(endpoint ,{
        params: params
    }).then(res => res?.data ?? []);
}

// export function apiPost(endpoint: string, data: object) {
//     const axiosClient = getClient();
//     return axiosClient.post(endpoint, data).then(res => res?.data)
// }

export function apiPut(endpoint: string, data: object) {
    const axiosClient = getClient();
    return axiosClient.put(endpoint, data).then(res => res?.data);
}

export function apiFetch(endpoint: string, params?: object | null){
    return apiGet(endpoint, {
        ...params,
        per_page: Number.MIN_SAFE_INTEGER
    }).then(res => res?.data ?? [])
}

export function apiDelete(endpoint: string) {
    const axiosClient = getClient();
    return axiosClient.delete(endpoint).then(res => res?.data);
}
    
export function apiPost(endpoint: string, body?: object | null){
    const axiosClient = getClient();

    return axiosClient.post(endpoint, body).then(res => res?.data ?? []);
}