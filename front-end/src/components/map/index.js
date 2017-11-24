// Data imports
const config = require("../../config.json");
const mockRoute = require("../../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';

// Script imports
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
			center: [3.225, 51.2098], // starting position [lng, lat]
			zoom: 9 // starting zoom
		});
		map.addLayer({
			"id": "route",
			"type": "line",
			"source": {
				"type": "geojson",
				"data": {
					"type": "Feature",
					"properties": {},
					"geometry": mockRoute.routes[0].geometry
				}
			},
			"layout": {
				"line-join": "round",
				"line-cap": "round"
			},
			"paint": {
				"line-color": "#000000",
				"line-width": 4
			}
		});
		this.setState({ map: map });
	}

	render() {
		return (
			<div class={style.map} id="map"></div>
		);
	}
}
