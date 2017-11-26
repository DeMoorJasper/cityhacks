import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './styles/search.less';
import Autosuggest from 'react-autosuggest';
import { gpsLocation } from '../lib/utils';

const ajax = require('ajax');
const domain = require('../domain.json').domain;

const renderSuggestion = suggestion => (
	<div class={style.searchItem}>
		{suggestion.description}
	</div>
);

const getSuggestionValue = suggestion => suggestion.description;

export default class Search extends Component {
	constructor() {
		super();
		this.state = {
			startLocation: {},
			form: {
				searchData: [],
				suggestions: [],
				searchValue: "",
				selectedSearch: {},
				type: "horeca",
				distance: 2500
			}
		};
		this.selectType = this.selectType.bind(this);
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
		this.searchRoute = this.searchRoute.bind(this);
		this.getGpsLocation = this.getGpsLocation.bind(this);
		this.updateDistance = this.updateDistance.bind(this);
	}

	componentDidMount() {
		this.getGpsLocation();
	}

	getGpsLocation() {
		gpsLocation().then(location => {
			let position = {
				longitude: location.coords.longitude,
				latitude: location.coords.latitude,
				description: "Huidige locatie"
			};

			this.setState({
				startLocation: position
			});
		}).catch(e => {
			console.log(e);
		})
	}

	searchRoute(evt) {
		evt.preventDefault();
		if (this.state.form.selectedSearch &&
			this.state.form.selectedSearch.longitude &&
			this.state.form.selectedSearch.latitude &&
			this.state.form.type) {
				console.log(this.state.form.selectedSearch);
			let options = {
				start: {
					longitude: this.state.form.selectedSearch.longitude,
					latitude: this.state.form.selectedSearch.latitude
				},
				type: this.state.form.type,
				distance: this.state.form.distance
			};
			console.log(options);
			ajax.get(`${domain}/routing?options=${JSON.stringify(options)}`, null, (data) => {
				if (data && data.routes) {
					this.props.setRoute(data, () => {
						route('/routing', true);
					})
				}
				if (data.error) {
					alert("Geen geschikte route gevonden :(");
					console.log(data);
				}
			});
		}
	}

	onChange = (event, { newValue }) => {
		let form = this.state.form;
		form.searchValue = newValue;
		this.setState({
			form: form
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		ajax.get(`${domain}/search?query=${value}&page=0`, null, (data) => {
			let form = this.state.form;
			if (this.state.startLocation.description) {
				data = [this.state.startLocation].concat(data);
			}
			form.searchData = data;
			if (data && data.length > 0) {
				this.setState({ form: form }, () => {
					let form = this.state.form;
					form.suggestions = data;
					this.setState({
						form: form
					});
				});
			}
			if (data.error) {
				console.log(data);
			}
		});
	};

	onSuggestionsClearRequested = () => {
		let form = this.state.form;
		form.suggestions = [];
		this.setState({
			form: form
		});
	};

	onSuggestionSelected(event, data) {
		let form = this.state.form;
		form.selectedSearch = data.suggestion;
		this.setState({ form: form });
	};

	selectType(evt) {
		let form = this.state.form;
		form.type = evt.target.value;
		this.setState({ form: form });
	}

	updateDistance(evt) {
		let form = this.state.form;
		form.distance = evt.target.value;
		this.setState({ form: form });
	}

	render() {
		const inputProps = {
			placeholder: 'Zoek een startpunt...',
			value: this.state.form.searchValue,
			onChange: this.onChange
		};

		// <img src='./assets/icons/gps.svg' onclick={this.selectGpsLocation} />

		return (
			<div class={style.search}>
				<form onSubmit={this.searchRoute}>
					<label for="type">Startpunt</label>
					<Autosuggest
						suggestions={this.state.form.suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
						onSuggestionSelected={this.onSuggestionSelected}
					/>
					<label for="type">Wat wil je eens zien/bezoeken?</label>
					<select name="type" id="type" class="TextInput" onchange={this.selectType} value={this.state.form.type}>
						<option value="horeca">Horeca</option>
						<option value="nature">Natuurwandeling</option>
					</select>
					<label for="distance">Maximaal te wandelen afstand? (in meter)</label>
					<input type="number" value={this.state.form.distance} id="distance" onchange={this.updateDistance} />
					<button type="submit">Zoeken</button>
				</form>
			</div>
		);
	}
}