import React from 'react'

import './style.css'

function Task(props) {

    const { task } = props

    return (
        <div className="card bg-light task">
            <div className="card-body">
                {task.description}
                <div class="dropdown-divider"></div>
                <blockquote class="blockquote mb-0">
                    <p class="card-text"><small class="text-muted blockquote-footer task-footer">Created in {task.created_at}</small></p>
                    {
                        task.created_at !== task.updated_at ?
                            <p class="card-text"><small class="text-muted blockquote-footer task-footer">Created in {task.updated_at}</small></p>
                            : null
                    }

                </blockquote>
            </div>
        </div>
    )

}

export default Task;