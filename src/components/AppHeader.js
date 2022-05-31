import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import acmeLogo from '../assets/images/acmelogo.png';
import { getStorage } from "../utils";
import { CyberArkIdentityOAuthClient } from '@cyberark/identity-js-sdk';

function AppHeader({ isHomeVisible = false, isSettingsVisible = false, isUserInfoVisible = false, isLogoutVisible=false }) {
    const navigate = useNavigate();
    const [appLogo, setAppLogo] = useState(acmeLogo);
    const [tenantUrl, setTenantUrl] = useState('');

    useEffect(() => {
        const settingsStr = getStorage('settings');
        if(settingsStr !== null) {
            const settingsJsonObj = JSON.parse(settingsStr);
            setAppLogo(settingsJsonObj.appImage);
            setTenantUrl(settingsJsonObj.tenantUrl);
        }
    }, [])

    const logout = async () => {
        const cookies=new Cookies();
        const token = cookies.get('sampleapp');
        try {
            if (token != null) {
              const clientObj = new CyberArkIdentityOAuthClient(
                tenantUrl,
                getStorage("OIDC_AppID"),
                getStorage("OIDC_ClientID"),
                getStorage("OIDC_ClientSecret")
              );
              const revokeToken = await clientObj.revokeToken(token);
              const endSession = await clientObj.endSession();
              cookies.remove("sampleapp");
              navigate("/home");
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    const toggleHomeMenu = () => { }
    const onTabClick = (path) => {
        navigate(path);
    }

    return (
        <header className="apidemo-header">
            <nav className="navbar navbar-expand-md navbar-dark">
                <div className="navbar-brand"><img src={appLogo} alt="logo" /></div>
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsList"
                    aria-controls="navbarsList" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleHomeMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="navbarsList">
                    <ul className="navbar-nav ml-auto">
                        {isHomeVisible && <li className="nav-item">
                            <a className="nav-link text-white" onClick={() => onTabClick('/home')}>
                                Home
                            </a>
                        </li>}
                        {isSettingsVisible && <li className="nav-item">
                            <a className="nav-link text-white" onClick={() => onTabClick('/settings')}>
                                Settings
                            </a>
                        </li>}
                        {isUserInfoVisible && <li className="nav-item">
                            <a className="nav-link text-white" onClick={() => onTabClick('/userinfo')}>
                                UserInfo
                            </a>
                        </li>}
                        {isLogoutVisible && <li className="nav-item">
                            <a className="nav-link text-white" onClick={logout}>
                                Logout
                            </a>
                        </li>}
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;