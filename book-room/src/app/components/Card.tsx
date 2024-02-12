import React, {useState,useEffect} from "react"

const Card = ({children}: {children : React.ReactNode}) => {
    const [cardStyle, setCardStyle] = useState<React.CSSProperties>({
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
        opacity: "0.8"

    
    });

    useEffect(()=> {
        const handleResize = ()=> {
            if(window.innerWidth < 768){
                setCardStyle({
                    ...cardStyle,
                    width: "96%",
                    height: "95%",
                    padding: "10px"

                })

            } else if(window.innerHeight < 669){
                setCardStyle({
                    ...cardStyle,
                    height: "99%",

                })
            }  else {
                setCardStyle({
                    ...cardStyle,
                    width: "60%",
                    height: "95%",
                    padding: "10px"
                })
            }
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    });

    return (
        <div style={cardStyle}>{children}</div>
    )
}

export default Card