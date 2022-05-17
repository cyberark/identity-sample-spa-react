import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import apiLogo from '../assets/images/api_logo.png';
import widgetLogo from '../assets/images/widget_logo.png';
import twofaLogo from '../assets/images/2fa_logo.png';

function Home() {
    const navigate = useNavigate();
    const onGetStarted = () => navigate('/loginprotocols');

    return (
        <div className="container-fluid">
            <AppHeader isHomeVisible={true} isSettingsVisible={true}/>
            <div className="app-page">
                <div className="container">
                    <div className="text-center">
                        <h5 className="pt-4">
                            Try out the different functionalities offered by CyberArk Identity for your web application. You can easily
                            embed these functionalities into your web application using Java SDK. Please check the documentation <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://identity-developer.cyberark.com/docs/cyberark-identity-java-sdk-reference">here</a>.
                        </h5>
                        <h5 className="pt-4">
                            Select the card you want to try out and then click on “Login” or “Signup” link in the card to try out
                            different functionalities
                        </h5>
                    </div>
                    <div className="card-deck py-5">
                        <div className="card bg-primary text-white invisible">
                            <img src={apiLogo} style={{width: '189px', height: '129px'}}
                                className="align-self-center mt-4 img-fluid" alt="apilogo" />
                            <div className="card-body">
                                <h4 className="card-title text-center">CyberArk Identity authentication APIs</h4>
                                <p className="card-text text-center">
                                    Checkout this flow to understand how the authentication APIs can be used to authenticate a user and
                                    integrate these APIs with OAuth/OIDC protocols
                                </p>
                            </div>
                            <div className="p-3">
                                <div className="row justify-content-around px-5">
                                    <div className="btn btn-link font-weight-bold">Get Started</div>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-primary text-white">
                            <img src={widgetLogo} style={{width: '129px', height: '156px'}}
                                className="align-self-center mt-3" alt="widget_logo" />
                            <div className="card-body">
                                <h4 className="card-title text-center">Widgets</h4>
                                <p className="card-text text-center">
                                    Checkout this flow to understand how to embed the login and the signup widget into your web app and
                                    integrate the widgets with OAuth/OIDC protocols to generate tokens
                                </p>
                            </div>
                            <div className="p-3">
                                <div className="row justify-content-around px-5">
                                    <div onClick={onGetStarted} className="btn btn-link font-weight-bold">Get Started</div>
                                </div>
                            </div>
                        </div>
                        <div className="card bg-primary text-white invisible">
                            <img src={twofaLogo} style={{width: '152px', height: '102px'}} className="align-self-center mt-5"
                                alt="2fa_logo" />
                            <div className="card-body">
                                <h4 className="card-title text-center">CyberArk Identity as 2FA provider</h4>
                                <p className="card-text text-center">
                                    Checkout this flow to understand how to embed the MFA widget for only second factor authentication and
                                    step-up authentication
                                </p>
                            </div>
                            <div className="p-3">
                                <div className="row justify-content-around px-5">
                                    <div className="btn btn-link font-weight-bold">Login</div>
                                    <div className="btn btn-link font-weight-bold">Signup</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    )
}

export default Home;