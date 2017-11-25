// Data imports
const mockRoute = require("../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';
import ReactMapboxGl, { GeoJSONLayer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";

import style from './styles/map.less';

export default class Profile extends Component {
	constructor() {
		super();
		this.drawMarkers = this.drawMarkers.bind(this);
	}

	componentDidMount() {
		let gpsLocation = this.props.gps;
		let interval = window.setInterval(() => {
			if (this.props.gpsEnabled) {
				this.props.getLocation().then(position => {
					gpsLocation = position.coords;
					this.props.checkManeuver(gpsLocation);
					console.log("New position: " + gpsLocation);
				}).catch(e => console.log(e));
			}
		}, 2000);
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

		if (!this.props.route) {
			return <h1>No route data supplied.</h1>;
		}

		if (!this.props.gps) {
			return <h1>No gps data supplied.</h1>;
		}

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
					coordinates={[this.props.gps.longitude, this.props.gps.latitude]}>
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
