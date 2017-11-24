// Data imports
const config = require("../../config.json");
const mockRoute = require("../../mockdata/route.json");

// Node.js imports
import { h, Component } from 'preact';
import ReactMapboxGl, { GeoJSONLayer, Feature } from "react-mapbox-gl";

// Script imports
import style from './style.less';

export default class Map extends Component {
	render() {
		const Map = ReactMapboxGl({
			accessToken: "pk.eyJ1IjoiZ2lsbGVzdmluY2tpZXIyMCIsImEiOiJjamFlN3ZwbDUxeWtkMzNsbzRnMHM2eHZtIn0.QxVyqaJamA9maRZDRhQ5Vg"
		});
		console.log(mockRoute["routes"][0]["geometry"]);

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
						"line-color": "#888",
            			"line-width": 8
					}}
					lineLayout={{
						"line-join": "round",
            			"line-cap": "round"
					}}
				/><GeoJSONLayer
					data={{
						"type": "Feature",
						"properties": {},
						"geometry": mockRoute["routes"][0]["geometry"]
					}}
					linePaint={{
						"line-color": "#888",
            			"line-width": 8
					}}
					lineLayout={{
						"line-join": "round",
            			"line-cap": "round"
					}}
				/>
			</Map>
		);
	}
}
