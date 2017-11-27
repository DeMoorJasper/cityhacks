// Node.js imports
import { h, Component } from 'preact';

import style from './styles/detail.less';

export default class Detail extends Component {
	render() {
        let properties = this.props.data;
        let img = properties.img ? <img src="#" alt={properties.description} title={properties.description} /> : "";
		return (
            <div class={style.detail} onclick={this.props.hideDetail}>
                {img}
                <h1>{properties.type}</h1>
                <h2>{properties.description}</h2>
            </div>
		);
	}
}
