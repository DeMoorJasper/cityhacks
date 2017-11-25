import { h, Component } from 'preact';
import style from './style.less';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<form action="">
					<input type="text" placeholder="Startlocatie" class="TextInput"/>
					<select name="type" id="type" class="TextInput">	
						<option value="" disabled selected hidden>Ontspanningstyp</option>
						<option value="Library">Bibliotheek</option>
						<option value="Sport">Sport</option>
						<option value="Culture">Cultuur</option>
						<option value="Playgrounds">Speelbos</option>
						<option value="Swimming">Zwembad</option>
						<option value="Horeca">Horeca</option>
					</select><br/>
					<label for="bank">Zitbankje</label>
					<input type="checkbox" name="Bank" id="bank"/><br/>
					<label>Rolstoel<input type="checkbox" name="Wheelchair"/></label>
					<input type="submit" value="Zoeken"/>
				</form>
			</div>
		);
	}
}