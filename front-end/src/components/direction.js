import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './styles/direction.less';

export default class Direction extends Component {
	render() {
		return (
			<div>
				{JSON.stringify(this.props.data)}
			</div>
		);
	}
}
