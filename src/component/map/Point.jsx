import { Marker } from "react-map-gl";

const Point = ({
    id,
    content = "",
    coordinates,
    color,
    textColor = "#000",
    radius = 10,
}) => {
    const onClick = (event) => {
        console.log(event);
    };

    return (
        <Marker
            longitude={coordinates.longitude}
            latitude={coordinates.latitude}
            anchor="center"
            onClick={onClick}
        >
            <div
                style={{
                    borderRadius: 50,
                    width: radius,
                    height: radius,
                    backgroundColor: color,
                    textAlign: "center",
                    verticalAlign: "middle",
                    color: textColor,
                    display: "inline-block",
                    cursor: "pointer",
                }}
            >
                {content}
            </div>
        </Marker>
    );
};

export default Point;
