import React from 'react'
import PropTypes from 'prop-types'
import {Redirect, Route} from 'react-router-dom'

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'


function ProtectedRoute({component: Component, ...rest}) {


    return <Route {...rest} render={props => {

        return fetch(`${host}admin/verify`, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                //  'Access-Control-Allow-Origin': host
            }
        })
            .then(res => {
                if (res.status === 200) {

                    return <Component {...props} {...rest} />
                } else {
                    const error = new Error(res.error)
                    throw error
                }
            })
            .catch(err => {
                return <Redirect to={'/login'}/>
            })
    }}/>
}


ProtectedRoute.propTypes = {}
ProtectedRoute.defaultProps = {}

export default ProtectedRoute
