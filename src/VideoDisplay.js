import React from 'react'
import PropTypes from 'prop-types'

function VideoDisplay({video }) {

    return (

        <video
            src={video}
            controls
            className={'embed-responsive-item'}
            id="video"
        >
        </video>
    )
}

VideoDisplay.propTypes = {
    video: PropTypes.string.isRequired
}
VideoDisplay.defaultProps = {}

export default VideoDisplay
