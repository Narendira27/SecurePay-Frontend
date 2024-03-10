const ErrorMessageElement = ({ text }) => {
    return (
        <p className="text-red-800 text-md font-medium text-center ">* {text}</p>
    )
}


export default ErrorMessageElement