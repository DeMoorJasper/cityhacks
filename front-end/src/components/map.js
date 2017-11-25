// Data imports
// const mockRoute = require("../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';
import ReactMapboxGl, { GeoJSONLayer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";

import style from './styles/map.less';

const Map = ReactMapboxGl({
	accessToken: "pk.eyJ1IjoiZ2lsbGVzdmluY2tpZXIyMCIsImEiOiJjamFlN3ZwbDUxeWtkMzNsbzRnMHM2eHZtIn0.QxVyqaJamA9maRZDRhQ5Vg"
});

export default class Profile extends Component {
	constructor() {
		super();
		this.state = {
			gps: {
				longitude: 0,
				latitude: 0
			}
		}
		this.drawMarkers = this.drawMarkers.bind(this);
	}

	componentDidMount() {
		let gpsLocation = this.props.gps;
		let interval = window.setInterval(() => {
			if (this.props.gpsEnabled) {
				this.props.getLocation().then(position => {
					gpsLocation = position.coords;
					this.props.checkManeuver(gpsLocation);
					this.props.updateGps(gpsLocation);
				}).catch(e => console.log(e));
			}
		}, 2000);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.gps && nextProps.gps !== this.props.gps) {
			console.log("update gps");
			this.setState({ gps : nextProps.gps }, () => {
				console.log(this.state);
			});
		}
	}

	drawMarkers() {
		console.log(this.props.route);
		return this.props.route["waypoints"].map((waypoint) => {
			return (
				<Marker
					coordinates={waypoint["location"]}
					anchor="bottom">
					<img
						src={"./assets/icons/marker.svg"}
						style={{
							width: '3rem',
							height: 'auto',
							marginBottom: '-1.1rem'
						}}
					/>
				</Marker>
			);
		});
	}

	render() {
		if (!this.props.route) {
			return <h1>No route data supplied.</h1>;
		}

		if (!this.props.gps) {
			return <h1>No gps data supplied.</h1>;
		}

		let startPoint = {
			latitude: parseFloat(this.props.route["waypoints"][0]["location"][0]),
			longitude: parseFloat(this.props.route["waypoints"][0]["location"][1])
		}

		return (
			<Map
				style="mapbox://styles/mapbox/streets-v9"
				containerStyle={{
					height: "100vh",
					width: "100vw"
				}}
				center={[startPoint.latitude, startPoint.longitude]}
				movingMethod="easeTo"
				zoom={[14]}
			>
				<GeoJSONLayer
					data={{
						"type": "Feature",
						"properties": {},
						"geometry": this.props.route["routes"][0]["geometry"]
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
