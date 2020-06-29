import React from 'react';
import PropTypes from 'prop-types';

class Collapsible extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isExpanded: false,
			height: 0
		}
	}

	handleToggle(e){
		e.preventDefault();
		this.setState({
			isExpanded: !this.state.isExpanded,
			height: this.refs.inner.clientHeight
		});
	}

	render(){
		const { title, children } = this.props;
		const { isExpanded, height } = this.state;
		const currentHeight = isExpanded ? height : 0;

		return (
			<div className="card">
        <div className={`card-header ${isExpanded ? 'is-expanded' : ''}`} 
        			onClick={(e) => this.handleToggle(e)}>
          <h2>{ title }</h2>
        </div>
        <div className="card-collapse" style={{ height: currentHeight + 'px' }}>
        	<div className="card-body" ref="inner">
	         	{ children }
	        </div>
        </div>
      </div>
		)
	}
}

Collapsible.propTypes = {
	title: PropTypes.string.isRequired
}

export default Collapsible;