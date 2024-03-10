const DescriptionElement = (props) => {
    const { text } = props
    return (
        <>
            <p className="text-gray-500 text-center m-4 text-md">{text}</p>
        </>
    )

}

export default DescriptionElement