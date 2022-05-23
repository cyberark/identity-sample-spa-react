/*
* Copyright (c) 2022 CyberArk Software Ltd. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { useEffect } from 'react';
import { setStorage, getStorage, OIDC_DEFAULT_SCOPE, redirectOIDCAPI } from '../utils';
import { CyberArkIdentityOAuthClient, CyberArkIdentityOIDCClient, getWidgetAssociatedApp, getOIDCAppDetails } from '@cyberark/identity-js-sdk';
import pkceChallenge from 'pkce-challenge';

function Resouce() {


    useEffect(() => {
        const init = async () => {
            const settings = getStorage('settings');
            const settingsJsonObj = JSON.parse(settings);
            let pkce, OIDC_APP = {
                AppID: '',
                ClientID: '',
                ClientSecret: '',
                Redirects: '',
                Scopes: []
            };
            try {
                const client = new CyberArkIdentityOAuthClient(settingsJsonObj.tenantUrl, settingsJsonObj.oauthAppId, settingsJsonObj.oauthServiceUserName, settingsJsonObj.oauthServiceUserPassword);
                const TOKEN = await client.requestToken('client_credentials', null, null, null, settingsJsonObj.oauthServiceUserName, settingsJsonObj.oauthServiceUserPassword, settingsJsonObj.oauthScopesSupported.split(' '));
    
                const APPKEY = await getWidgetAssociatedApp(settingsJsonObj.tenantUrl, settingsJsonObj.loginWidgetId);
                if (APPKEY === 'Invalid widgetId' || APPKEY === 'No application associated with the given widgetId') {
                    throw new Error(APPKEY);
                }
    
                const appDetails = await getOIDCAppDetails(settingsJsonObj.tenantUrl, APPKEY, TOKEN.access_token);
                if (typeof appDetails === 'string') {
                    throw new Error(appDetails);
                }
    
                Object.assign(OIDC_APP, appDetails)
    
                OIDC_APP.Scopes = [...OIDC_DEFAULT_SCOPE];
                if (appDetails.Scopes !== undefined) {
                    for (let i = 0; i < appDetails.Scopes.length; i++) {
                        OIDC_APP.Scopes.push(appDetails.Scopes[i].Scope);
                    }
                }
                setStorage('OIDC_ClientID', OIDC_APP.ClientID);
                setStorage('OIDC_AppID', OIDC_APP.AppID);
                setStorage('OIDC_ClientSecret', OIDC_APP.ClientSecret);
                setStorage('OIDC_SCOPES', OIDC_APP.Scopes);
    
                pkce = pkceChallenge();
                setStorage('code_verifier', pkce.code_verifier);
                const clientObj = new CyberArkIdentityOIDCClient(settingsJsonObj.tenantUrl, OIDC_APP.AppID, OIDC_APP.ClientID, OIDC_APP.ClientSecret);
                const authURL = await clientObj.authorizeURL(redirectOIDCAPI, OIDC_APP.Scopes, ['code'], pkce.code_challenge);
                window.location.href = authURL;
            } catch (error) {
                console.error(error);
            }
        }
    
        init();
    }, [])
    
    return (
        <></>
    );
}
export default Resouce;