import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './styles/header.less';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<h1>Pitstop</h1>
				<nav>
					<a href="https://github.com/DeMoorJasper/pitstop" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
				</nav>
			</header>
		);
	}
}
