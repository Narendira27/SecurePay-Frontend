import RenderUserList from "./userList"

const UserElement = (props) => {
    const { usersList, onChangeSearch, onClickSend } = props
    return (
        <div className="pl-4 pr-4">
            <h1 className="mb-4 text-slate-900  text-xl font-bold ">Users</h1>
            <input onChange={onChangeSearch} className="w-full h-8 mb-4 p-3 text-slate-900  outline-none border border-solid border-gray-400 rounded-md" type="search" placeholder="Search Users ... " />
            {
                usersList.length > 0 ? (usersList.map((each, id) => <RenderUserList key={id} details={each} onclick={(id, name) => onClickSend(id, name)} />)) : null
            }
        </div>
    )
}

export default UserElement