const Line = (props) => {
    const style = {
        position: "absolute",
        border: "2px solid #FFFFFF",
        textAlign: "center",
        transform: `rotate(${props.angle * 30}deg)`,
        width: props.width + "px",
        top: props.top + "px",
    };
    return <div className="line" style={style}></div>;
};

export default Line;
