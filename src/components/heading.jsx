const HeadingElement = (props) => {
    const { text } = props
    return (
        <>
            <h1 className="text-slate-950 text-4xl font-bold text-center m-2">{text}</h1>
        </>
    )

}


export default HeadingElement