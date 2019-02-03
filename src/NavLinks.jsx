import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function NavLinks(props) {
    return (
        <div className={'row d-flex flex-column text-white'}>
            <Link to="/">Home</Link>
            <Link to="/admin">Admin</Link>
        </div>
    )
}

NavLinks.propTypes = {}
NavLinks.defaultProps = {}

export default NavLinks
