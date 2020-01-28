import React from 'react'

import Task from '../Task'

function TaskList(props) {

    const { tasks } = props

    const tasksToRender = tasks.map(task =>
        (<Task key={task._id} task={task} />)
    )

    return (
        <div className="container">
            {tasksToRender}
        </div>
    )

}

export default TaskList;