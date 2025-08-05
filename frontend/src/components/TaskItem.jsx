import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const TaskItem = ({ task, onDelete, onArchive, isArchived }) => {
	const { id, title, description, status, createdAt } = task

	const getStatusClass = (status) => {
		const statusMap = {
			pending: 'bg-warning text-dark',
			'in-progress': 'bg-info text-dark',
			completed: 'bg-success text-white',
		}
		return `badge ${statusMap[status] || 'bg-warning text-dark'}`
	}

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('es-419', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	return (
		<div className='card h-100 shadow-sm task-item p-3'>
			<div className='card-body p-0'>
				<div className='d-flex justify-content-between align-items-start mb-3'>
					<h5 className='card-title mb-0'>{title}</h5>
					<span className={getStatusClass(status)}>
						{status === 'pending'
							? 'Pending'
							: status === 'in_progress'
							? 'In Progress'
							: status === 'completed'
							? 'Completed'
							: status}
					</span>
				</div>
				<p className='card-text text-muted mb-3'>{description}</p>
				<div className='d-flex justify-content-between align-items-center'>
					<div className='btn-group'>
						{!isArchived && (
							<Link
								to={`/edit/${id}`}
								className='btn btn-outline-primary btn-sm d-flex justify-content-center align-items-center'
							>
								<i className='bi bi-pencil me-1'></i>
								Edit
							</Link>
						)}
						<button
							onClick={() => onArchive(id)}
							className='btn btn-outline-secondary border border-2 btn-sm d-flex justify-content-center align-items-center'
						>
							<i className={`bi bi-${isArchived ? 'arrow-up-circle' : 'archive'} me-1`}></i>
							{isArchived ? 'Unarchive' : 'Archive'}
						</button>
						<button
							onClick={() => onDelete(id)}
							className='btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center'
						>
							<i className='bi bi-trash me-1'></i>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

TaskItem.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		status: PropTypes.string,
		createdAt: PropTypes.string,
	}).isRequired,
	onDelete: PropTypes.func.isRequired,
	onArchive: PropTypes.func.isRequired,
	isArchived: PropTypes.bool.isRequired,
}

export default TaskItem
