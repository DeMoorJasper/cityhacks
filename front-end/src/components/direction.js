import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './styles/direction.less';

export default class Direction extends Component {
	getIcon(modifier) {
		let icon = "right";

		switch(modifier) {
			case "slight left":
				icon = "left";
				break;
			case "slight right":
				icon = "right";
				break;
			case "straight":
				icon = "up";
				break;
			default:
				icon = modifier;
				break;
		}

		let iconParameter = "fa fa-arrow-" + icon;
		return <i class={iconParameter} aria-hidden="true"></i>;
	}

	render() {
		if (!this.props.data) return "";
		let direction = this.props.data;
		// console.log("direction", direction);
		return (
			<div class={style.direction}>
				<h1 class={style.arrowText}>{direction.instruction} {this.getIcon(direction.modifier)}</h1>
			</div>
		);
	}
}
