import * as t from 'io-ts';

export interface ApiV2<T extends string = string, Req extends t.Props = t.Props, Res extends t.Props = t.Props> {
    name: T;
    request: t.TypeC<Req>;
    response: t.TypeC<Res>;
}

export function defineV2<T extends string, Req extends t.Props, Res extends t.Props>(
    name: T,
    request: t.TypeC<Req>,
    response: t.TypeC<Res>,
): ApiV2<T, Req, Res> {
    return {
        name,
        request,
        response,
    };
}
