import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import api from '../../components/services/api'
import CookiesName from '../../components/util/cookiesName'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './style.css'

function Login() {

    const INITIAL_STATE_ERROR = { code: '', message: '' }
    const INITIAL_STATE_USER = { email: '', password: '' }

    const [user, setUser] = useState(INITIAL_STATE_USER)
    const [submitEvent, setSubmitEvent] = useState(null)
    const [inLoging, setInLogin] = useState(false)
    const [isReadyToLogin, setIsReadyToLogin] = useState(false)
    const [error, setError] = useState(INITIAL_STATE_ERROR)
    const [, setCookie] = useCookies([CookiesName.API_TOKEN])

    useEffect(verifyIsReadToLogin, [user])
    useEffect(() => {
        if (submitEvent) {
            submitEvent.preventDefault()
            window.removeEventListener('submit', submitEvent)
        }
    }, [submitEvent])

    const history = useHistory()

    function setInputs({ email = user.email, password = user.password }) {
        setUser({ email, password })
    }

    function verifyIsReadToLogin() {
        if (user.email.length > 0 && user.password.length > 0) {
            setIsReadyToLogin(true)
        } else {
            setIsReadyToLogin(false)
        }
    }

    async function handleSubmit(event) {

        setSubmitEvent(event)
        setInLogin(true)
        const { data } = await api.post('/api/auth', { email: user.email, password: user.password })
        try {
            if (data.code !== '000') {
                throw data
            } else {
                setError(INITIAL_STATE_ERROR)
                setCookie(CookiesName.API_TOKEN, data.token)
                history.push('/main')
            }
        } catch (err) {
            setError(err)
            setInLogin(false)
        }
    }

    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                <div className="container align-self-center">

                    <div className="card card-body col-10 col-lg-4 offset-1 offset-lg-4 align-self-center">
                        <h5 className="card-title align-self-center">Login</h5>
                        {
                            error.code ?
                                <div className="alert alert-danger text-center" role="alert">
                                    {error.message}
                                </div> : null
                        }

                        <div className="row align-self-center">
                            <div className="col-12 align-self-center">
                                <div className="form-group">
                                    <label htmlFor="emailAddress">Email address</label>
                                    <input type="email" className="form-control" id="emailAddress" value={user.email} onChange={e => setInputs({ email: e.target.value })}></input>
                                </div>
                            </div>
                            <div className="col-12 align-self-center">
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" value={user.password} onChange={e => setInputs({ password: e.target.value })}></input>
                                </div>
                            </div>
                            <div className="col-12 align-self-center">
                                <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit} disabled={inLoging || !isReadyToLogin}>
                                    {inLoging ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign in'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );

}

export default Login;