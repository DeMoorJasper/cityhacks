import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './styles/home.less';

export default class Home extends Component {
	searchRoute() {
		route('/routing', true);
	}

	render() {
		return (
			<div class={style.home}>
				<form onSubmit={this.searchRoute}>
					<label for="type">Startpunt</label>
					<input type="text" placeholder="Startlocatie" class="TextInput"/>
					<label for="type">Wat wil je eens zien/bezoeken?</label>
					<select name="type" id="type" class="TextInput">
						<option value="horeca" selected>Horeca</option>
						<option value="nature">Natuurwandeling</option>
					</select>
					<div class={style.checkblock}>
						<input type="checkbox" name="Bank" id="bank"/>
						<label for="bank">Zitbankje</label>
					</div>
					<button type="submit">Zoeken</button>
				</form>
			</div>
		);
	}
}