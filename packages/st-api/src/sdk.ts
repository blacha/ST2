import { TypeOf } from 'io-ts';
import { ApiV2Service } from './v2';
import { V2ValidationReport } from './report';

export interface V2SdkConfig {
    baseUrl: string | null;
    /** window.fetch like object */
    fetch: any;
    headers: () => Record<string, string> | Promise<Record<string, string>>;
}

const V2SdkConfig: V2SdkConfig = {
    baseUrl: null,
    fetch: typeof fetch,
    headers: () => ({}),
};

export type ApiV2ServiceRequest<K extends keyof ApiV2Service> = TypeOf<ApiV2Service[K]['request']>;
export type ApiV2ServiceResponse<K extends keyof ApiV2Service> = TypeOf<ApiV2Service[K]['response']>;
export type ApiV2Response<K extends keyof ApiV2Service> =
    | { ok: true; code: 200; response: ApiV2ServiceResponse<K> }
    | { ok: false; code: 500; error: { body: any; status: number } } // Unknown error
    | { ok: false; code: 422; reason: V2ValidationReport[] } // validation failed
    | { ok: false; code: 403 }; // Auth failed

export const V2Sdk = {
    config(cfg: V2SdkConfig) {
        V2SdkConfig.baseUrl = cfg.baseUrl;
        V2SdkConfig.fetch = cfg.fetch;
        V2SdkConfig.headers = cfg.headers;
    },

    async call<K extends keyof ApiV2Service>(name: K, request?: ApiV2ServiceRequest<K>): Promise<ApiV2Response<K>> {
        if (V2SdkConfig.fetch == null) {
            throw new Error('Fetch must be supplied before using St:SDK');
        }

        if (V2SdkConfig.baseUrl == null) {
            throw new Error('Invalid baseUrl');
        }

        const targetUrl = `${V2SdkConfig.baseUrl}/api/v2/${name}`;
        const configHeaders = await V2SdkConfig.headers();
        const headers = { ...configHeaders, 'content-type': 'application/json' };

        const res = await V2SdkConfig.fetch(targetUrl, {
            method: 'post',
            headers,
            body: request == null ? undefined : JSON.stringify(request),
        });
        if (res.ok) {
            return { ok: true, code: 200, response: await res.json() };
        }

        if (!res.headers.get('content-type').includes('application/json')) {
            throw new Error('Failed to fetch: ' + (await res.text()));
        }
        const data = await res.json();
        if (res.status == 422) {
            return { ok: false, code: 422, reason: data.reason };
        }
        if (res.status == 403) {
            return { ok: false, code: 403 };
        }
        return { ok: false, code: 500, error: { status: res.statusCode, body: data } };
    },
};
