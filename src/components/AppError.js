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