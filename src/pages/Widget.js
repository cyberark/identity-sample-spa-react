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

import AppHeader from '../components/AppHeader';
import AppError from '../components/AppError';
import { useEffect } from 'react';
import { getStorage, loadWidgetJsAndCss } from '../utils';

function Widget() {

    useEffect(() => {
        const settings = getStorage('settings');
        if(settings !== null) {
            const settingsJsonObj = JSON.parse(settings);
            loadWidgetJsAndCss(settingsJsonObj, () => {
                window.LaunchLoginView({
                    "containerSelector": "#cyberark-login",
                    "showSignup": false,
                    "signUpLinkText": "Sign Up",
                    "apiFqdn": settingsJsonObj.tenantUrl.split("/")[2],
                    "widgetId": settingsJsonObj.loginWidgetId
                })
            });
        }
    }, [])

    const onRetry = () => {}

    return (
        <div className="container-fluid">
            <AppHeader isHomeVisible={true} />
            <div className="app-page">
                <div className="container h-100">
                    <div className="h-100 row justify-content-center align-items-center">
                        <div className="col">
                            <div className="text-center">
                                <h5>
                                    The admin of Acme Inc. creates the authentication widget on the CyberArk Identity portal and uses the page URL to embed the widget into the website or mobile app.
                                </h5>
                                <h5 className="mt-4">
                                    The widget adds sign up and sign in capabilities to your website or mobile app.
                                </h5>
                                <h5 className="my-4">
                                    End-users who sign up are added to the CyberArk Cloud Directory. You can leverage CyberArk Identity's authentication and authorization features to secure their accounts. Once the end-user signs up, they are re-directed to the sign in form in the widget to securely sign in using multi-factor authentication.
                                </h5>
                                <h5 className="my-4">
                                    The same widget prompts end-users to authenticate to your website with MFA. The widget can be integrated with sign in protocols such as OIDC/SAML to authorize a user.
                                </h5>
                            </div>
                        </div>
                        <div className="col m-5" id="cyberark-login" style={{lineHeight: 1}}></div>
                    </div>
                </div>
                <AppError btnClick={onRetry} body="Oops, Something went wrong. Verify App configuration and user permissions." />
            </div>
        </div>
    );
}

export default Widget;