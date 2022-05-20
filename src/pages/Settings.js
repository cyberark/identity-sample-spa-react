import AppHeader from '../components/AppHeader';
import AppError from '../components/AppError';
import spinner from '../assets/images/Spinner.svg';
import cyberarkLogo from '../assets/images/cyberark-logo.png';
import oauthLogo from '../assets/images/oauth_logo28x28.png';
import oidcLogo from '../assets/images/openid-icon-28x28.png';
import greenCheck from '../assets/images/green_check.png';
import acmeLogo from '../assets/images/acmelogo.png';
import Tagify from '@yaireo/tagify'
import { useEffect, useState } from 'react';
import { setStorage, getFormValues, getStorage, setFormValues } from '../utils';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [hasAppLogoError, setHasAppLogoError] = useState(false);
    const [isCaptchaEnabledInSettings, setIsCaptchaEnabled] = useState(false);
    const [imagePreview, setImagePreview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const obj = getStorage('settings');
        if(obj !== null){
            const jsonObj = JSON.parse(obj);
            setFormValues(document.getElementById('settingsForm'), jsonObj);
            setImagePreview(jsonObj.appImage);
        }else {
            setImagePreview(acmeLogo);
        }

        document.querySelectorAll('input[class=customTagStyle]').forEach(ele => {
            new Tagify(ele, {
                originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(' '),
                delimiters: " "
            });
        });
    }, [])

    const onImageUpload = e => {
        const selectedFile = e.target.files[0];
        const fileName = selectedFile.name;
        if (selectedFile.size > 1000000 || checkImageFileExt(fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length))) {
            setHasAppLogoError(true);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result.toString());
        };
        reader.readAsDataURL(selectedFile);
    }

    const checkImageFileExt = (extension) => {
        return !["png","jpg","gif","ico","bmp"].includes(extension);
    }

    const onCheckCaptchaEnabled = e => setIsCaptchaEnabled(e.target.checked);

    const onCancel = () => navigate('/home');

    const onSave = e => {
        e.preventDefault();
        setLoading(true);
        let formVals = getFormValues(e.target);
        if(imagePreview !== '') formVals.appImage = imagePreview;
        setStorage('settings', JSON.stringify(formVals));
        setLoading(false);
        setErrorMessage('Settings saved successfully');
        document.getElementById('divToScroll').scrollTop = 0;
    }

    const onRetry = () => { }

    const onOAuthScopeChange = e => { }

    const onOIDCScopeChange = e => { }

    return (
        <div className="container-fluid">
            {loading && <div className="loader-screen">
                <img alt="spinner" className="loader" src={spinner} />
            </div>}
            <AppHeader isHomeVisible={true} />
            <div id='divToScroll' className="app-page">
                <div className="container my-3">
                    <h3 className="text-center p-3">Settings</h3>
                    <h5 className="p-3">Note: Settings in this page are utilized to demonstrate the functionalities using this app. The
                        settings must match exactly to the configured applications on the tenant. Incorrect configuration will lead to
                        inappropriate behavior of the functionalities.</h5>
                    {errorMessage && <div className="user-error">
                        <div className="error-image"><img alt="successfailicon"
                            src={greenCheck} />
                        </div>
                        <p style={{color: '#000'}}>{errorMessage}</p>
                    </div>}
                    <form id="settingsForm" className="row" autoComplete='off' onSubmit={onSave}>
                        <div className="container p-3 mb-1 mx-3">
                            <div className="row align-items-center">
                                <label className="label col">Application Logo <br /> (Supports: png, jpg, gif, ico, bmp)</label>
                                <input type="file" className="form-control col" accept=".png,.jpg,.gif,.ico,.bmp" name="appImage"
                                    onChange={onImageUpload} />
                                <img src={imagePreview} alt="default-logo" width="28px" height="28px" className="col-2" />
                                {hasAppLogoError && <span>Invalid file extension or file size has exceeded max limit of 1 MB</span>}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="border border-primary p-3 mb-3">
                                <div className="d-flex justify-content-between">
                                    <h5>CyberArk Tenant</h5>
                                    <img src={cyberarkLogo} alt="cyberark-logo" style={{ width: '28px', height: '28px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="required label">URL</label>
                                    <input className="form-control" name="tenantUrl" type="text" required placeholder="https://YOUR_TENANT.idaptive.app" maxLength={80} pattern='^((https)|(HTTPS)):\/\/.*\..+' />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Role Name</label>
                                    <input className="form-control" name="roleName" required placeholder="MFA Role Name" />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Authentication Widget ID</label>
                                    <input className="form-control" name="loginWidgetId" required placeholder="Login Widget ID" pattern='^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$' />
                                </div>
                                <div className="form-group">
                                    <label className="required label">MFA Widget ID</label>
                                    <input className="form-control" name="mfaWidgetId" required placeholder="MFA Widget ID" pattern='^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$' />
                                </div>
                            </div>
                            <div className="border border-primary p-3 mb-3">
                                <div className="d-flex justify-content-between">
                                    <h5>OAuth 2.0</h5>
                                    <img src={oauthLogo} alt="oauth_logo" style={{ height: '28px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Application ID</label>
                                    <input className="form-control" name="oauthAppId" required placeholder="OAuth Client Application ID" />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Username</label>
                                    <input className="form-control" name="oauthServiceUserName" required placeholder="Service Username" />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Password</label>
                                    <input className="form-control" name="oauthServiceUserPassword" required placeholder="Service User Password" minLength={8} maxLength={64} />
                                </div >
                                <div className="form-group">
                                    <label className="required label">Scopes</label>
                                    <input className="customTagStyle" name="oauthScopesSupported" required placeholder="Space Separated OAuth Scopes" onChange={onOAuthScopeChange} />
                                </div >
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="border border-primary p-3 mb-3">
                                <div className="d-flex justify-content-between">
                                    <h5>OpenID Connect</h5>
                                    <img src={oidcLogo} alt="openid-icon" style={{ height: '28px' }} />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Application ID</label>
                                    <input className="form-control" name="oidcAppId" required placeholder="OpenID Connect Application ID" />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Client ID</label>
                                    <input className="form-control" name="oidcClientId" required placeholder="OpenID Connect Client ID" pattern="^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$" />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Client Secret</label>
                                    <input className="form-control" name="oidcClientPassword" required placeholder="OpenID Connect Client Secret" />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Scopes</label>
                                    <input className="customTagStyle" name="oidcScopesSupported" required placeholder="openid email profile" onChange={onOIDCScopeChange} />
                                </div>
                            </div >
                            <div className="border border-primary p-3 mb-3">
                                <div className="d-flex justify-content-between">
                                    <h5>Session Management</h5>
                                </div>
                                <div className="form-group">
                                    <label className="required label">Session Timeout (sec)</label>
                                    <input className="form-control" name="sessionTimeout" required placeholder="120" max="500" type="number" />
                                </div>
                                <div className="form-group">
                                    <label className="required label">Mobile Background Timeout (sec)</label>
                                    <input className="form-control" name="mobileTimeout" required placeholder="60" max="500" type="number" />
                                </div>
                            </div>
                            <div className="border border-primary p-3 mb-3">
                                <div className="d-flex justify-content-between">
                                    <h5>ReCaptcha Settings</h5>
                                </div>
                                <div className="form-group">
                                    <div className="form-check form-check-inline">
                                        <input type="checkbox" className="form-check-input" name="isCaptchaEnabledInSettings" onChange={onCheckCaptchaEnabled} checked={isCaptchaEnabledInSettings} />
                                        <label className="form-check-label">Enable Captcha for sign-up flow&nbsp;&nbsp;</label>
                                        <span data-toggle="tooltip" data-html="true" data-placement="right" title="Make sure the captcha settings are in sync <br/> with the captcha settings on admin portal."><i className="fa fa-info-circle" style={{ fontSize: '20px', color: 'gray' }} /></span>
                                    </div>
                                </div>
                                {isCaptchaEnabledInSettings && <div className="form-group">
                                    <label className="required label">Site Key</label>
                                    <input className="form-control" name="siteKey" required placeholder="Enter ReCaptcha Site Key" />
                                </div>}
                            </div>
                        </div>
                        <div className="d-flex p-3 w-100">
                            <div className="container btn btn-secondary mr-5 w-25" onClick={onCancel}>Cancel</div>
                            <button className="container btn btn-secondary w-25" type="submit">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <AppError body="Oops, something went wrong. Please try again later." title="Unauthorized" btnClick={onRetry} />
        </div>
    );
}

export default Settings;