import { V2Sdk } from '@st/api';
import { GameData } from '@st/shared/build/data/loader';
import 'antd/dist/antd.css';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { App } from './app';
import { Auth } from './auth/auth.service';

async function getAuthHeader(): Promise<Record<string, string>> {
    const token = await Auth.getToken();
    if (token == null) {
        return {};
    }
    return { Authorization: 'Bearer ' + token };
}

document.addEventListener('DOMContentLoaded', () => {
    V2Sdk.config({
        fetch: fetch.bind(window),
        baseUrl: 'https://shockr.dev',
        headers: getAuthHeader,
    });

    GameData.load();
    ReactDom.render(<App />, document.getElementById('main'));
});
