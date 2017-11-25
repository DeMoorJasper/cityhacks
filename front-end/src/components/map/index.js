// Data imports
const config = require("../../config.json");
const mockRoute = require("../../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';
import ReactMapboxGl, { GeoJSONLayer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";

import style from './style.less';

export default class Profile extends Component {
    constructor() {
		super();
		this.state = {
			gps: {
				latitude: 0,
				longitude: 0,
				accuracy: 0,
				speed: 0
			},
			gpsEnabled: true,
			maneuvers: [],
			lastManeuver: 0
		}
		this.drawMarkers = this.drawMarkers.bind(this);
    }
    
    componentDidMount() {
		let gpsLocation = this.state.gps;
		this.getLocation().then(position => {
			gpsLocation = position.coords;
			this.setState({ gps: position.coords });
			let interval = window.setInterval(() => {
				if (this.state.gpsEnabled) {
					this.getLocation().then(position => {
						gpsLocation = position.coords;
						if (this.state.maneuvers[this.state.lastManeuver].latitude + 0.001 < gpsLocation.latitude &&
							this.state.maneuvers[this.state.lastManeuver].longitude + 0.001 < gpsLocation.longitude) {
							this.setState({ lastManeuver: this.state.lastManeuver + 1 });
						}
						console.log("New position: " + gpsLocation);
					}).catch(e => {
						interval = null;
						this.setState({ gpsEnabled: false });
					});
				}
			}, 2000);
		}).catch(e => {
			this.setState({ gpsEnabled: false });
		});
	}

	getLocation() {
		return new Promise((resolve, reject) => {
			if ("geolocation" in navigator) {
				navigator.geolocation.getCurrentPosition((position) => {
					return resolve(position);
				});
			} else {
				return reject("Geolocation unavailable");
			}
		});
	}

	drawMarkers() {
		return mockRoute["waypoints"].map((waypoint) => {
			return (
				<Marker
					coordinates={waypoint["location"]}
					anchor="bottom">
					<img
						src={"./assets/icons/marker.svg"}
						style={{
							width: '3rem',
							height: 'auto',
							marginBottom: '-1.5rem'
						}}
					/>
				</Marker>
			);
		});
	}

    render() {
        const Map = ReactMapboxGl({
			accessToken: "pk.eyJ1IjoiZ2lsbGVzdmluY2tpZXIyMCIsImEiOiJjamFlN3ZwbDUxeWtkMzNsbzRnMHM2eHZtIn0.QxVyqaJamA9maRZDRhQ5Vg"
		});

        return (
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: "100vh",
                    width: "100vw"
                }}
                center={[3.2247, 51.2093]}
            >
                <GeoJSONLayer
                    data={{
                        "type": "Feature",
                        "properties": {},
                        "geometry": mockRoute["routes"][0]["geometry"]
                    }}
                    linePaint={{
                        "line-color": "#76B1EC",
                        "line-width": 8
                    }}
                    lineLayout={{
                        "line-join": "round",
                        "line-cap": "round"
                    }}
                />

                <Marker
                    coordinates={[this.state.gps.longitude, this.state.gps.latitude]}>
                    <img
                        src={"./assets/icons/gps.svg"}
                        style={{
                            width: '3rem',
                            height: 'auto'
                        }}
                    />
                </Marker>

                {this.drawMarkers()}
            </Map>
        );
    }
}
