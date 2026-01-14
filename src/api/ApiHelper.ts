import getClient from "../axiosClient";

const axiosClient = getClient();

export function apiGet(endpoint: string, params?: object| null ){
    return axiosClient.get(endpoint ,{
        params: params
    }).then(res => res?.data ?? []);
};

export function apiFetch(endpoint: string, params?: object | null){
    return apiGet(endpoint, {
        ...params,
        per_page: Number.MIN_SAFE_INTEGER
    }).then(res => res?.data ?? [])
};

export function apiPost(endpoint: string, params?: object | null){
    return axiosClient.post(endpoint, params).then(res => res?.data ?? []);
};

export function apiPatch(endpoint: string, params: object | null) {
    return axiosClient.patch(endpoint, params).then(res => res?.data ?? []);
};

export function apiDelete(endpoint: string, params?: object | null) {
    return axiosClient.delete(endpoint, {
        data: params
    }).then(res => res?.data ?? []);
}