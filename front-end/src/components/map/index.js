const config = require("../../config.json");

import { h, Component } from 'preact';
import style from './style.less';

export default class Map extends Component {
	constructor() {
		super();
		this.state = {
			map: null
		}
	}

	shouldComponentUpdate() {
		return false;
	}

	componentDidMount() {
		let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
		mapboxgl.accessToken = config["mapbox-apikey"];

		let map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v9',
			center: [-74.50, 40], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});

		this.setState({ map: map });
	}

	render() {
		return (
			<div class={style.map} id="map">

			</div>
		);
	}
}