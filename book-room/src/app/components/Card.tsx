const Card = ({children}: {children : React.ReactNode}) => {
    const cardStyle : React.CSSProperties = {
        position: "absolute",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "center",
        width: "60%",
        height: "90%",
        margin: "15px",
        padding: "10px",
        border: "1px solid #ccc",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "10px",
        marginBottom: "10px",
        backgroundColor: "#f8f8f8",
        flexDirection: "column",
        flexWrap: "nowrap",

    
    }
        if(window.innerWidth < 768){
            cardStyle.width = "95%";
            cardStyle.height = "95%";
            cardStyle.padding = "20px";
        }

    return (
        <div style={cardStyle}>{children}</div>
    )
}

export default Card