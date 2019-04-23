import React, {Component} from 'react'

const host = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4321/'



export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super()
            this.state = {
                loading: true,
                redirect: false,
            }
        }

        componentDidMount() {
            fetch(`${host}admin/verify`, {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Credentials': true,
                    //  'Access-Control-Allow-Origin': host
                }
            })
                .then(res => {
                    if (res.status === 200) {

                        this.setState({loading: false})
                    } else {
                        throw res
                    }
                })
                .catch(err => {
                    console.error(err)
                    this.setState({loading: false}, () => {
                        this.props.history.push('/login')
                    })
                })
        }


        render() {
            const {loading} = this.state
            if (loading) return null

            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            )
        }
    }
}
