import React, { Component } from 'react'

export default class MDFilter extends Component {
    render() {
        return (
            <div>
                <input name="movieDrama-filter" type="text" value={this.props.value} onChange={this.props.onChange} placeholder="Search ..." className="rounded-2xl mt-2 pl-2 bg-pink-800 text-white"></input>

            </div>
        )
    }
}
