export interface ApiFunc<Params = any, Body = any, Response = any, method = 'post'> {
    path: string;
    params: Params;
    body: Body;
    response: Response;
    method: 'get' | 'post';
}
