const PaymentButton = (props) => {
    const { text, onclick } = props
    return (
        <>
            <button onClick={onclick} className="bg-green-400 mt-5 text-white rounded-lg text-lg p-2"> {text} </button>
        </>
    )
}

export default PaymentButton