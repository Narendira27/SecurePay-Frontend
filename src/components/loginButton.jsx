const LoginButton = (props) => {
    const { text, onclick } = props
    return (
        <>
            <button onClick={onclick} className="bg-slate-950 mt-5 text-white w-full rounded-lg text-lg p-2"> {text} </button>
        </>
    )
}

export default LoginButton