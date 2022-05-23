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
import Cookies from 'universal-cookie';
import { getStorage, redirectOIDCAPI } from '../utils';
import { useNavigate } from 'react-router-dom';
import { CyberArkIdentityOIDCClient } from '@cyberark/identity-js-sdk';

function RedirectResource() {

    const navigate = useNavigate();
    const cookies = new Cookies();
    const settings = getStorage('settings');
    const settingsJsonObj = JSON.parse(settings);

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        try {
            const code = window.location.search.split("code=")[1];
            const clientObj = new CyberArkIdentityOIDCClient(
                settingsJsonObj.tenantUrl,
                getStorage('OIDC_AppID'),
                getStorage('OIDC_ClientID')
            );
            const tokens = await clientObj.requestToken(
                'authorization_code',
                getStorage('code_verifier'),
                redirectOIDCAPI,
                code,
                null,
                null,
                getStorage('OIDC_SCOPES')
            );
            cookies.set('sampleapp', tokens.access_token);
            navigate('/userinfo');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <></>
    );
}

export default RedirectResource;