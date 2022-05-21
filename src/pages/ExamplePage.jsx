import { Typography } from "@material-ui/core";
import Page from "component/Page";
import LineChart from "component/timechart/LineChart";
import Timeline from "component/timeline/Timeline";
import Map from "component/map/Map";
import moment from "moment";

const ExamplePage = () => {
    /**
     * @type {import("@nivo/line").Serie[]}
     */
    const lineChartSeries = [
        {
            id: "Temperature",
            color: "hsl(278, 70%, 50%)",
            data: [
                {
                    x: moment("05/05/2022").toDate(),
                    y: 21,
                },
                {
                    x: moment("05/06/2022").toDate(),
                    y: 19,
                },
                {
                    x: moment("05/07/2022").toDate(),
                    y: 22,
                },
                {
                    x: moment("05/08/2022").toDate(),
                    y: 20,
                },
            ],
        },
    ];

    /**
     * @type {import("@nivo/line").CartesianMarkerProps[]}
     */
    const markers = [
        {
            axis: "x",
            value: moment("05/06/2022").toDate(),
            lineStyle: { stroke: "#b0413e", strokeWidth: 2 },
            legend: "x marker",
            legendOrientation: "vertical",
        },
        {
            axis: "y",
            value: 21,
            lineStyle: { stroke: "blue", strokeWidth: 2 },
            legend: "y marker",
            legendOrientation: "horizontal",
        },
    ];

    /**
     * @type {import('component/timeline/TimelineGroup').Group[]}
     */
    const timelineData = [
        {
            name: "Manufacturer to central stock",
            departure: {
                date: moment(1628641148000),
                location: {
                    id: "https://api.onerecord.fr/locations/sha_warehouse",
                    geolocation: {
                        id: "https://api.onerecord.fr/locations/sha_warehouse/geolocation",
                        elevation: {
                            unit: "m",
                            value: 0.0,
                        },
                        latitude: 31.04038,
                        longitude: 121.283,
                    },
                    code: "SHA",
                    locationName: "Shanghai",
                    locationType: "Warehouse",
                },
            },
            arrival: {
                date: moment("2021-09-02T22:50:03+0200"),
                location: {
                    geolocation: {
                        elevation: {
                            unit: "m",
                            value: 0.0,
                        },
                        latitude: 50.74807,
                        longitude: 3.25508,
                    },
                    code: "BCN",
                    locationName: "Mouscron",
                    locationType: "Warehouse",
                },
            },
            checkPoints: [
                {
                    date: moment("2021-08-13T10:11:38+0800"),
                    location: {
                        id: "https://api.onerecord.fr/locations/cdsha",
                        geolocation: {
                            id: "https://api.onerecord.fr/locations/cdsha/geolocation",
                            elevation: {
                                unit: "m",
                                value: 0.0,
                            },
                            latitude: 31.33193,
                            longitude: 121.65435,
                        },
                        code: "CNSHA",
                        locationName: "Shanghai",
                        locationType: "Port",
                    },
                },
                {
                    date: moment("2021-09-01T04:24:52+02:00"),
                    location: {
                        id: "https://api.onerecord.fr/locations/nlrtm",
                        geolocation: {
                            id: "https://api.onerecord.fr/locations/nlrtm/geolocation",
                            elevation: {
                                unit: "m",
                                value: 0.0,
                            },
                            latitude: 51.95138,
                            longitude: 4.05362,
                        },
                        code: "NLRTM",
                        locationName: "Rotterdam",
                        locationType: "Port",
                    },
                },
                {
                    date: moment("2021-09-02T21:54:52+02:00"),
                    location: {
                        geolocation: {
                            elevation: {
                                unit: "m",
                                value: 0.0,
                            },
                            latitude: 50.74807,
                            longitude: 3.25508,
                        },
                        code: "BCN",
                        locationName: "Mouscron",
                        locationType: "Warehouse",
                    },
                },
            ],
            events: [],
        },
    ];

    const events = [
        {
            linkedObject: {
                id: "https://api.onerecord.fr/companies/msc/piece-dgs/container1",
            },
            location: {
                id: "https://api.onerecord.fr/locations/cnsha-port",
                locationName: "Shanghai Port",
            },
            performedBy: {
                id: "https://api.onerecord.fr/companies/msc",
                branch: {
                    branchName: "MSC Rotterdam",
                },
            },
            dateTime: moment("2021-08-15T21:54:52+02:00").toDate(),
            eventCode: "LOAD",
            eventName: "(SCAN) Container loaded in the ship",
            eventTypeIndicator: "Actual",
        },
        {
            linkedObject: {
                id: "https://api.onerecord.fr/companies/asus/items/zenbook1",
            },
            location: {
                id: "https://api.onerecord.fr/locations/bru-whs-1",
                locationName: "Brussels Warehouse 1",
            },
            performedBy: {
                id: "https://api.onerecord.fr/companies/dhl",
                branch: {
                    branchName: "DHL Belgium",
                },
            },
            dateTime: moment("2021-09-02T21:55:52+02:00").toDate(),
            eventCode: "UNLOAD",
            eventName: "(SCAN) Piece unloaded from truck",
            eventTypeIndicator: "Actual",
        },
    ];

    return (
        <Page title="Example">
            <Typography variant="h4">Simple line chart</Typography>
            <LineChart data={lineChartSeries} />

            <Typography variant="h4">Line chart with markers</Typography>
            <LineChart data={lineChartSeries} markers={markers} />

            <Typography variant="h4">Timeline</Typography>
            <Timeline groups={timelineData} events={events} />

            <Typography variant="h4">Map</Typography>
            <Map
                areaData={[
                    {
                        id: "portArea",
                        coordinates: [
                            {
                                longitude: 4.037818908691406,
                                latitude: 51.95124824631019,
                            },
                            {
                                longitude: 4.07567024230957,
                                latitude: 51.95124824631019,
                            },
                            {
                                longitude: 4.07567024230957,
                                latitude: 51.95288812186641,
                            },
                            {
                                longitude: 4.037818908691406,
                                latitude: 51.95288812186641,
                            },
                            {
                                longitude: 4.037818908691406,
                                latitude: 51.95124824631019,
                            },
                        ],
                        backgroundColor: "#0080ff",
                        backgroundOpacity: 0.1,
                        borderColor: "#0080ff",
                        borderWidth: 1,
                        textColor: "#0080ff",
                        content: "port area",
                    },
                ]}
                pointsData={[
                    {
                        id: "point",
                        coordinates: {
                            longitude: 4.025,
                            latitude: 51.95124824631019,
                        },
                        radius: 20,
                        color: "#0080ff",
                        textColor: "#fff",
                        content: "1",
                    },
                ]}
            />
        </Page>
    );
};

export default ExamplePage;
