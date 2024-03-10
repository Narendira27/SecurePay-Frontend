const NavBar = (props) => {
    const { UserName, onclickprofile, menu, onclickButton } = props
    return (
        <>
            <nav className="flex justify-between items-center border-solid border-slate-200 border-y border-x-0 mt-2 p-4 ">
                <h1 className="text-slate-900  text-2xl font-semibold   ">SecurePay</h1>
                <div className="flex justify-between items-center ">
                    <p className="text-slate-900 text-xl font-medium" >Hello, <span className="text-slate-900 text-xl font-medium" >{UserName}</span></p>
                    <div onClick={onclickprofile} className=" flex flex-col justify-center items-center ml-5 h-10 w-10  bg-gray-300 rounded-full ">
                        <p className=" cursor-pointer text-slate-900 text-lg font-semibold ">{UserName[0]}</p>
                    </div>
                    {menu === true ? (<div className="fixed flex flex-row justify-center items-center ml-28 mt-32 rounded-lg h-20 w-20 bg-slate-200 p-1 ">
                        <button onClick={onclickButton} className="hover:bg-slate-900 hover:text-white w-full text-center rounded-md">Log Out</button>
                    </div>) : null}
                </div>
            </nav>

        </>
    )
}

export default NavBar