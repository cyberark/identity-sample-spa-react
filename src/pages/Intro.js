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

import { useNavigate } from 'react-router-dom';
import githubLogo from '../assets/images/github_logo.png';
import cyberarkLogo from '../assets/images/cyberark_logo.png';
import swaggerLogo from '../assets/images/swagger_logo.png';
import acmeLogo from '../assets/images/acmelogo.png';
import { useEffect, useState } from 'react';
import { getStorage } from '../utils';

function Intro() {
    const navigate = useNavigate();
    const [applogo, setAppLogo] = useState(acmeLogo);
    const onGetStarted = () => navigate('/home');

    useEffect(() => {
        const settingsStr = getStorage('settings');
        if(settingsStr !== null) {
            const settingsJsonObj = JSON.parse(settingsStr);
            setAppLogo(settingsJsonObj.appImage);
        }
    },[])

    return (
        <div className="container-fluid p-3">
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <img src={applogo} alt="sampleapplogo" className="img-responsive" />
                </div>
                <h3 className="text-white mt-3 text-center">
                    Acme Inc. uses CyberArk Identity APIs, SDKs, and widgets to secure its web applications.
                    This playground application shows all the possible variations that a developer from Acme Inc has at their disposal
                </h3>
                <div className="container align-self-center">
                    <div className="card-deck mt-5">
                        <div className="card">
                            <img src={githubLogo} alt="githublogo" className="align-self-center mt-3" style={{width: '123px',
                    height: '114px'}} />
                                <div className="card-body">
                                    <h5 className="card-title text-center">GitHub</h5>
                                    <div className="card-text text-center">
                                        Explore our GitHub and know more about the CIAM SDKs and sample apps
                                    </div>
                                </div>
                                <div className="text-center p-3">
                                    <a className="btn btn-link" target="_blank" rel="noopener noreferrer" href="https://github.com/cyberark/identity-demo-angular">Know More</a>
                                </div>
                        </div>
                        <div className="card">
                            <img 
                                src={cyberarkLogo} 
                                alt="cyberarklogo" 
                                className="align-self-center mt-3" 
                                style={{width: '171px', height: '114px'}}
                            />
                                <div className="card-body">
                                    <h5 className="card-title text-center">Blogs</h5>
                                    <div className="card-text text-center">
                                        Know what’s coming up next and to know more about the industry standards and best practices
                                    </div>
                                </div>
                                <div className="text-center p-3">
                                    <a className="btn btn-link" target="_blank" rel="noopener noreferrer" href="https://www.cyberark.com/resources/cyberark-identity">Know More</a>
                                </div>
                        </div>
                        <div className="card">
                            <img 
                                src={swaggerLogo} 
                                alt="swaggerlogo" 
                                className="align-self-center mt-3" 
                                style={{width: '114px', height: '109px'}}
                            />
                                <div className="card-body">
                                    <h5 className="card-title text-center">Developer Documentation</h5>
                                    <div className="card-text text-center">
                                        Read our developer documentation to get more insights on SDKs, APIs and sample apps
                                    </div>
                                </div>
                                <div className="text-center p-3">
                                    <a className="btn btn-link" target="_blank" rel="noopener noreferrer" href="https://identity-developer.cyberark.com/">Know More</a>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="btn btn-secondary w-25" onClick={onGetStarted}>Get Started</div>
                </div>
            </div>
        </div>
    );
}

export default Intro;