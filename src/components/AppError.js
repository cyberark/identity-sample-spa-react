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

function AppError({
    title = 'Error',
    body = 'Oops, something went wrong. Please try again later.',
    btnLabel = 'Retry',
    btnClick = () => { }
}) {
    return (
        <div className="modal fade" id="errorPopup" tabIndex={-1} role="dialog" aria-labelledby="errorPopupTitle"
            aria-hidden="true" data-backdrop="static" data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="errorPopupTitle">{title}</h5>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="container btn btn-secondary w-50 align-self-center mx-auto" data-dismiss="modal"
                            onClick={btnClick}>{btnLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppError;