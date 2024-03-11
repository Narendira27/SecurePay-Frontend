const BalanceComponent = (props) => {

    const { balance } = props
    return (
        <div className="p-4">
            <p className="mt-5 mb-5 text-slate-900 text-xl font-semibold">Your Balance is <span className="text-slate-900 text-xl font-medium">₹ {balance}</span></p>
        </div>
    )
}

export default BalanceComponent