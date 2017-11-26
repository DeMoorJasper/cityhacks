import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Search from './search';
import Routing from './routing';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			route: {}
		};
		this.handleRoute = this.handleRoute.bind(this);
		this.setRoute = this.setRoute.bind(this);
	}

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	setRoute = (route, callback) => {
		this.setState({ route : route }, callback);
	};

	render() {
		return (
			<div id="app">
				<Header />
				<Router onChange={this.handleRoute}>
					<Search path="/" setRoute={this.setRoute} />
					<Routing path="/routing" route={this.state.route} />
				</Router>
			</div>
		);
	}
}
