// Data imports
const config = require("../../config.json");
const mockRoute = require("../../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';
import ReactMapboxGl, { GeoJSONLayer, Feature } from "react-mapbox-gl";
import { Marker } from "react-mapbox-gl";

// Script imports
import style from './style.less';

export default class Map extends Component {
	constructor() {
		super();
		this.state = {
			gps: {
				latitude: 0,
				longitude: 0,
				accuracy: 0,
				speed: 0
			},
			gpsEnabled: true
		}
		this.drawMarkers = this.drawMarkers.bind(this);
		this.drawManeuvres = this.drawManeuvres.bind(this);
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

	componentDidMount() {
		let gpsLocation = this.state.gps;
		this.getLocation().then(position => {
			gpsLocation = position.coords;
			this.setState({ gps: position.coords });
			let interval = window.setInterval(() => {
				if (this.state.gpsEnabled) {
					this.getLocation().then(position => {
						gpsLocation = position.coords;
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

	drawManeuvres() {
		
	}

	drawMarkers() {
		return mockRoute["waypoints"].map((waypoint) => {
			return (
				<Marker
					coordinates={waypoint["location"]}
					anchor="bottom">
					<img
						src={"https://image.flaticon.com/icons/png/512/33/33622.png"}
						style={{
							width: '3rem',
							height: 'auto'
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
		console.log(mockRoute["routes"][0]["geometry"]);
		console.log(this.state.gps);

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
