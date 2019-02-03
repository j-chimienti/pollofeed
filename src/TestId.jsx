import React from 'react'
import PropTypes from 'prop-types'

function TestId(props) {

    const {history, location, match} = props

    console.log(location)
    console.log(history)
    console.log(match.params.id)
    return (
        <div></div>
    )
}

TestId.propTypes = {}
TestId.defaultProps = {}

export default TestId
