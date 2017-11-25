// Data imports
// const mockRoute = require("../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';
import { route } from 'preact-router';

// Script imports
import style from './styles/routing.less';

// Modules
import Direction from './direction';
import Map from './map';

export default class Routing extends Component {
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
		this.fillManeuvers = this.fillManeuvers.bind(this);
		this.checkManeuver = this.checkManeuver.bind(this);
		this.updateGps = this.updateGps.bind(this);
	}

	componentDidMount() {
		// FIX THIS
		if (!(this.props.route && this.props.route["waypoints"])) {
			return route('/', true);
		}
		this.fillManeuvers();
		let gpsLocation = this.state.gps;
		this.getLocation().then(position => {
			this.setState({ gps: position.coords });
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

	fillManeuvers() {
		let maneuvers = [];
		this.props.route["routes"][0]["legs"][0]["steps"].forEach((step) => {
			maneuvers.push(step.maneuver);
		}, this);
		// console.log(maneuvers);
		this.setState({ maneuvers: maneuvers });
	}

	checkManeuver(gpsLocation) {
		// console.log(gpsLocation);
		if (this.state.maneuvers[this.state.lastManeuver].latitude + 0.001 < gpsLocation.latitude &&
			this.state.maneuvers[this.state.lastManeuver].longitude + 0.001 < gpsLocation.longitude) {
			this.setState({ lastManeuver: this.state.lastManeuver + 1 });
		}
	}

	updateGps(gps) {
		this.setState({ gps : gps });
	}

	render() {
		if (!this.props.route) {
			return <h1>No route data supplied.</h1>
		}

		return (
			<div>
				<Map gps={this.state.gps} route={this.props.route} gpsEnabled={this.state.gpsEnabled} 
					getLocation={this.getLocation} checkManeuver={this.checkManeuver} 
					updateGps={this.updateGps} />
				<Direction data={this.state.maneuvers[this.state.lastManeuver]} />
			</div>
		);
	}
}
