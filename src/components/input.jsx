const InputElement = (props) => {

    const { inputText, placeHolderText, type, onchange } = props

    return (
        <div className="w-full mb-2">
            <p className="text-slate-950 mb-2 text-lg font-medium ">{inputText}</p>
            <input onChange={onchange} className='w-full  rounded-md p-3  outline-0 border border-solid border-gray-300' placeholder={placeHolderText} type={type} />
        </div>
    )

}

export default InputElement