import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './styles/home.less';
import Autosuggest from 'react-autosuggest';

const ajax = require('ajax');

const renderSuggestion = suggestion => (
	<div class={style.searchItem}>
		{suggestion.description}
	</div>
);

const getSuggestionValue = suggestion => suggestion.description;

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			startLocation: {},
			form: {
				searchData: [],
				suggestions: [],
				searchValue: "",
				selectedSearch: {},
				type: "horeca"
			}
		};
		this.selectType = this.selectType.bind(this);
		this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
		this.searchRoute = this.searchRoute.bind(this);
	}

	searchRoute(evt) {
		evt.preventDefault();
		if (this.state.form.selectedSearch &&
			this.state.form.selectedSearch.longitude &&
			this.state.form.selectedSearch.latitude &&
			this.state.form.type) {
			let options = {
				start: {
					longitude: this.state.form.selectedSearch.longitude,
					latitude: this.state.form.selectedSearch.latitude
				},
				type: this.state.form.type,
				distance: 2500
			};
			console.log(options);
			console.log(`http://localhost:4200/routing?options=${JSON.stringify(options)}`);
			ajax.get(`http://localhost:4200/routing?options=${JSON.stringify(options)}`, null, (data) => {
				if (data && data.routes) {
					this.props.setRoute(data, () => {
						route('/routing', true);
					})
				}
				if (data.error) {
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
		ajax.get(`http://localhost:4200/search?query=${value}&page=0`, null, (data) => {
			let form = this.state.form;
			form.searchData = data;
			if (data && data.length > 0) {
				this.setState({ form: form }, () => {
					let form = this.state.form;
					form.suggestions = this.getSuggestions(value);
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

	getSuggestions(value) {
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
		let locations = this.state.form.searchData;

		let res = inputLength === 0 ? [] : locations.filter(loc =>
			loc.description.includes(inputValue)
		);
		console.log(res);
		return res;
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

	render() {
		const inputProps = {
			placeholder: 'Zoek een startpunt...',
			value: this.state.form.searchValue,
			onChange: this.onChange
		};

		return (
			<div class={style.home}>
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
					<div class={style.checkblock}>
						<input type="checkbox" name="Bank" id="bank" />
						<label for="bank">Zitbankje</label>
					</div>
					<button type="submit">Zoeken</button>
				</form>
			</div>
		);
	}
}