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
import Cookies from 'universal-cookie';
import { useEffect, useState } from 'react';
import { getStorage } from '../utils';
import { CyberArkIdentityOIDCClient } from '@cyberark/identity-js-sdk';

function UserInfo() {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        const cookies = new Cookies();
        const settings = getStorage('settings');
        const settingsJsonObj = JSON.parse(settings);
        const getUserData = async () => {
            const token = cookies.get('sampleapp');
            try {
                const clientObj = new CyberArkIdentityOIDCClient(
                    settingsJsonObj.tenantUrl,
                    getStorage('OIDC_AppID'),
                    getStorage('OIDC_ClientID'),
                    getStorage('OIDC_ClientSecret')
                );
                const userInfo = await clientObj.getUserInfo(token);
                setUserData(userInfo);
            } catch (error) {
                console.error(error);
            }
        }
        
        getUserData();
    }, [])

    const copyToClipboard = (val) => {
        navigator.clipboard.writeText(val);
    }

    return (
        <div className="container-fluid">
            <AppHeader isHomeVisible={true} isUserInfoVisible={true} isLogoutVisible={true}/>
            <div className="app-page">
                <div className="container py-3">
                    <div className="card-deck">
                        <div className="card bg-primary text-white">
                            <div className="card-body">
                                <h4 className="card-title text-center">UserInfo</h4>
                                <div>
                                    <div className="card-body">
                                        <table className="table table-sm text-white">
                                            <tbody>
                                                {
                                                    Object.keys(userData).map((key) => {
                                                        return (
                                                            <tr key={key}>
                                                                <th className="col-sm-3" scope="row">{key}</th>
                                                                <td>
                                                                    <div className="text-break text-truncate myDIV col-sm-10 horizontalDiv">{userData[key].toString()}</div>
                                                                    <div className="hide col-sm-2 horizontalDiv">
                                                                        <i className="fa fa-clone btn btn-link" title="copy"
                                                                            onClick={() => copyToClipboard(userData[key])}></i>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserInfo;