const AlertMessage = ({ message }) => {
    return (
        <>
            <div class="alert alert-warning" role="alert">
               {message} <a href="#" class="alert-link">an example link</a>.
            </div>
        </>
    );
};

export default AlertMessage;
