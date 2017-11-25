// Data imports
const mockRoute = require("../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';

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
	}

	componentDidMount() {
		this.fillManeuvers();
	}

	fillManeuvers() {
		let maneuvers = [];
		mockRoute["routes"][0]["legs"][0]["steps"].forEach((step) => {
			maneuvers.push(step.maneuver);
		}, this);
		console.log(maneuvers);
		this.setState({ maneuvers: maneuvers });
	}

	render() {
		return (
			<div>
				<Map />
				<Direction data={this.state.maneuvers[this.state.lastManeuver]} />
			</div>
		);
	}
}
