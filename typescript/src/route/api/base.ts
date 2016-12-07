export enum ResponseStatus {
    success = 0,
    warning = 1,
    error = 2
}

export interface IApiResponse {
    $status: ResponseStatus;
    result?: any;
}

