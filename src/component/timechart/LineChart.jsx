import { ResponsiveLine } from "@nivo/line";
import moment from "moment";
import { darkTheme } from "./darkTheme";
import { defaultTheme } from "@nivo/core";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "@material-ui/core";

export const DATE_FORMAT = "DD/MM/YY, HH:MM:SS";

const CustomSymbol =
    (backgroundColor) =>
    ({ size, color, borderWidth, borderColor }) =>
        (
            <g>
                <circle
                    fill={backgroundColor}
                    r={size / 2}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                />
                <circle
                    r={size / 5}
                    strokeWidth={borderWidth}
                    stroke={borderColor}
                    fill={color}
                    fillOpacity={0.35}
                />
            </g>
        );

/**
 *
 * @param {Object} param
 * @param {import("@nivo/line").Serie[]} param.data
 * @param {import("@nivo/core").CartesianMarkerProps[]} param.markers
 * @returns
 */
const LineChart = ({ data = [], markers = [] }) => {
    const theme = useTheme();
    const nivoTheme = useMemo(
        () => (theme.palette.type === "light" ? defaultTheme : darkTheme),
        [theme.palette.type]
    );

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [nbTick, setNbTick] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const pageContainer = document.getElementById("page-container");

            setWidth(pageContainer.offsetWidth);
            setHeight(360);
            setNbTick(Math.ceil(pageContainer.offsetWidth / 100));
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <ResponsiveLine
                theme={nivoTheme}
                data={data}
                margin={{ top: 10, right: 70, bottom: 100, left: 30 }}
                xScale={{
                    type: "time",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false,
                }}
                curve="monotoneX"
                yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                }}
                xFormat={(time) => moment(time).format(DATE_FORMAT)}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: "bottom",
                    format: (time) => moment(time).format(DATE_FORMAT),
                    tickValues: nbTick,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,

                    // legend: verticalAxisName,
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                colors={
                    theme.palette.type === "light"
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light
                }
                pointSymbol={CustomSymbol(theme.palette.background.paper)}
                pointSize={16}
                pointBorderWidth={1}
                pointBorderColor={{
                    from: "color",
                    modifiers: [["darker", 0.3]],
                }}
                pointLabelYOffset={-12}
                useMesh={true}
                markers={markers}
            />
        </div>
    );
};

export default LineChart;
