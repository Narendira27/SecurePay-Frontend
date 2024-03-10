const RenderUserList = (props) => {
    const { details, onclick } = props
    return (
        <div className="flex justify-between m-3">
            <div className="flex justify-center items-center">
                <h1 className="flex felx-col justify-center items-center text-slate-900 mr-4 h-10 w-10  bg-gray-300 rounded-full font-semibold " >{details.firstName[0].toUpperCase()}</h1>
                <p className=" text-slate-900 text-lg font-bold ">{details.firstName}</p>
            </div>
            <button onClick={() => onclick(details.id, details.firstName)} className=" text-white bg-slate-900 pl-3 pr-3 rounded-lg " type="button">Send Money</button>
        </div>
    )
}

export default RenderUserList