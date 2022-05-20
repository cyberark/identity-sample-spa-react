import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import acmeLogo from '../assets/images/acmelogo.png';
import { getStorage } from "../utils";

function AppHeader({ isHomeVisible = false, isSettingsVisible = false }) {
    const navigate = useNavigate();
    const [appLogo, setAppLogo] = useState(acmeLogo);

    useEffect(() => {
        const settingsStr = getStorage('settings');
        if(settingsStr !== null) {
            const settingsJsonObj = JSON.parse(settingsStr);
            setAppLogo(settingsJsonObj.appImage);
        }
    }, [])
    
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
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;