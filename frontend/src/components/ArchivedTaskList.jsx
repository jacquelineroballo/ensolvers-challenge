import React from 'react'
import { useState, useEffect } from 'react'
import TaskItem from './TaskItem'
import { TaskService } from '../services/api'

const ArchivedTaskList = () => {
	const [tasks, setTasks] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetchArchivedTasks()
	}, [])

	const fetchArchivedTasks = async () => {
		try {
			const data = await TaskService.getNotes(true)
			setTasks(data)
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async (id) => {
		try {
			await TaskService.deleteTask(id)
			setTasks(tasks.filter((task) => task.id !== id))
		} catch (err) {
			setError(err.message)
		}
	}

	const handleUnarchive = async (id) => {
		try {
			await TaskService.toggleArchived(id)
			setTasks(tasks.filter((task) => task.id !== id))
		} catch (err) {
			setError(err.message)
		}
	}

	if (loading)
		return (
			<div className='container text-center py-5'>
				<div className='spinner-border text-primary' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		)
	if (error)
		return (
			<div className='container py-5'>
				<div className='alert alert-danger'>{error}</div>
			</div>
		)

	return (
		<div className='container py-4'>
			<div className='task-list'>
				<h2 className='mb-4'>Archived Notes</h2>
				{tasks.length === 0 ? (
					<div className='text-center py-5'>
						<p className='text-muted fs-5'>No archived notes available</p>
					</div>
				) : (
					<div className='row g-4'>
						{tasks.map((task) => (
							<div key={task.id} className='col-12 col-md-6 col-lg-4'>
								<TaskItem
									task={task}
									onDelete={handleDelete}
									onArchive={handleUnarchive}
									isArchived={true}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ArchivedTaskList
