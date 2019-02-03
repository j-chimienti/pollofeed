import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

function NavLinks({children}) {
    return (
        <div className={'row d-flex text-white'}>
            <Link to="/admin">Admin</Link>
            {children}
        </div>
    )
}

NavLinks.propTypes = {}
NavLinks.defaultProps = {}

export default NavLinks
