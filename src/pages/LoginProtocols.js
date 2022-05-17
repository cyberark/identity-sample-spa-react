import { useNavigate } from 'react-router-dom';
import spinner from '../assets/images/Spinner.svg';
import AppHeader from '../components/AppHeader';

function LoginProtocols() {
    const navigate = useNavigate();
    let loading = false;

    const onAuthLogin = () => navigate('/widget');

    return (
        <div className="container-fluid">
            {loading && <div className="loader-screen">
                <img className="loader" alt="spinner" src={spinner} />
            </div>}
            <AppHeader isHomeVisible={true} />
            <div className="app-page">
                <div className="container py-3">
                    <h2 className="text-center">Login Protocols</h2>
                    <h4 className="text-center py-3">Select any card below to view the different login protocols</h4>
                    <div className="card bg-primary text-white mx-auto w-50">
                        <div className="card-body">
                            <h5 className="card-title text-center">Login with OAuth/OIDC protocols</h5>
                            <div className="card-text text-center">
                                <p className="py-3">Once the user logins with CyberArk Identity authentication widget, and if the widget is integrated with the OIDC app, the OIDC flow will be triggered implicitly.</p>
                                <p className="py-1">The access tokens & ID tokens are then returned and these tokens can be used to authorize the user and to get user claims. Refresh tokens can also be  generated based on the configurations.</p>
                                <p className="py-1">A session cookie can be generated based on the access token/ID token and these session cookies will expire when access/ID/refresh tokens expire (or) when user clicks on logout.</p>
                                <p className="py-2">Note: For this flow the widget should be connected with an OIDC app on Identity portal.</p>
                            </div>
                        </div>
                        <div className="p-3 w-50 align-self-center">
                            <button className="container btn btn-link font-weight-bold" onClick={onAuthLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginProtocols;