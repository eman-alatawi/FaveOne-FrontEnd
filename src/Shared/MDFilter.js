import React, { Component } from 'react'

export default class MDFilter extends Component {
    render() {
        return (
            <div>
                <input name="movieDrama-filter" type="text" value={this.props.value} onChange={this.props.onChange}></input>

            </div>
        )
    }
}
