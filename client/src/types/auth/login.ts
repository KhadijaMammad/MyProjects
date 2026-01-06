export interface LoginResponse {
    [x: string]: any;
    user_id: number,
    username: string,
    password: string,
    access_token: string,
    refresh_token: string,
}