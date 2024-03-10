const SendForm = (props) => {
    const { name, onchange, onclick } = props

    return (
        <div className="p-5">
            <div className="flex justify-start items-center mb-5 " >
                <h1 className="flex felx-col justify-center items-center text-white mr-4 h-10 w-10  bg-green-500 rounded-full font-semibold " >{name[0]}</h1>
                <p className=" text-slate-900 text-lg font-bold ">{name}</p>
            </div >
            <p className="mb-5">Amount in Rs</p>
            <input onChange={onchange} type="text" className='w-full mb-5 outline-none p-2 text-slate-900   border border-solid border-gray-400 rounded-md' placeholder="Enter amount" />
            <button onClick={onclick} className="w-full bg-green-500 text-white pr-4 pl-4 pt-1 pb-1 rounded-lg " type="button">Initiate Transfer</button>
        </div>
    )
}

export default SendForm 