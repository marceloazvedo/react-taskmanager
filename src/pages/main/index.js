import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import CookiesName from '../../components/util/cookiesName'
import api from '../../components/services/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import TaskList from '../../components/TaskList'

function Main() {

    const INITIAL_STATE_ERROR = { code: '', message: '' }

    const [cookies] = useCookies([CookiesName.API_TOKEN])

    const [isFetchingTasks, setIsFetchingTasks] = useState(true)
    const [error, setError] = useState(INITIAL_STATE_ERROR)
    const [tasks, setTasks] = useState([])

    // Fetch all tasks
    useEffect(() => {
        setIsFetchingTasks(true)
        const request = api.get('/api/task', { headers: { 'Authorization': cookies[CookiesName.API_TOKEN] } })
        request.then(({ data }) => {
            if (data.code !== '000') {
                setError(data)
            } else {
                const { tasks } = data
                setTasks(tasks)
            }
        }).catch(err => {
            setError(err)
        }).finally((setIsFetchingTasks(false)))
    }, [])

    return (
        <div className="container">
            {
                error.code ?
                    <div className="alert alert-danger text-center" role="alert">
                        {error.message}
                    </div> : null
            }
            <div className="row">
                {
                    isFetchingTasks ?
                        <div className="col-12 align-self-center text-center">
                            <FontAwesomeIcon icon={faSpinner} spin className="justify-content-center" />
                        </div>
                        :
                        <TaskList tasks={tasks}/>
                }
            </div>
        </div>
    );

}

export default Main;