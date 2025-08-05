import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TaskService } from '../services/api'

const TaskForm = () => {
	const navigate = useNavigate()
	const { id } = useParams()
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		status: 'pending',
		archived: false,
	})
	const [errors, setErrors] = useState({
		title: '',
		description: '',
		server: null,
	})

	useEffect(() => {
		if (id) {
			fetchTask()
		}
	}, [id])

	const fetchTask = async () => {
		try {
			const data = await TaskService.getTaskById(id)
			setFormData(data)
		} catch (err) {
			setErrors((prev) => ({ ...prev, server: err.message }))
		}
	}

	const validateField = (name, value) => {
		switch (name) {
			case 'title':
				if (!value.trim()) return 'Title is required'
				if (value.length < 3) return 'Title must be at least 3 characters'
				if (value.length > 50) return 'Title cannot exceed 50 characters'
				return ''
			case 'description':
				if (!value.trim()) return 'Description is required'
				if (value.length < 10) return 'Description must be at least 10 characters'
				if (value.length > 200) return 'Description cannot exceed 200 characters'
				return ''
			default:
				return ''
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
		setErrors((prev) => ({
			...prev,
			[name]: validateField(name, value),
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validate all fields before submitting
		const newErrors = {
			title: validateField('title', formData.title),
			description: validateField('description', formData.description),
			server: null,
		}

		setErrors(newErrors)

		// If there are errors, do not submit the form
		if (newErrors.title || newErrors.description) {
			return
		}

		try {
			if (id) {
				await TaskService.updateTask(id, formData)
			} else {
				await TaskService.createTask(formData)
			}
			navigate('/')
		} catch (err) {
			setErrors((prev) => ({ ...prev, server: err.message }))
		}
	}

	return (
		<div className='container py-4'>
			<div className='task-form-container'>
				<h2 className='mb-4'>{id ? 'Edit task' : 'Create new task'}</h2>
				{errors.server && <div className='alert alert-danger'>{errors.server}</div>}
				<form onSubmit={handleSubmit} className='task-form'>
					<div className='form-group mb-3'>
						<label htmlFor='title' className='form-label'>
							Title
						</label>
						<input
							type='text'
							className='form-control'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							required
						/>
						{errors.title && <div className='invalid-feedback d-block'>{errors.title}</div>}
					</div>

					<div className='form-group mb-3'>
						<label htmlFor='description' className='form-label'>
							Description
						</label>
						<textarea
							className='form-control'
							id='description'
							name='description'
							value={formData.description}
							onChange={handleChange}
							rows='4'
							required
						/>
						{errors.description && (
							<div className='invalid-feedback d-block'>{errors.description}</div>
						)}
					</div>

					<div className='form-group mb-4'>
						<label htmlFor='status' className='form-label'>
							Status
						</label>
						<select
							className='form-select'
							id='status'
							name='status'
							value={formData.status}
							onChange={handleChange}
						>
							<option value='pending'>Pending</option>
							<option value='in_progress'>In progress</option>
							<option value='completed'>Completed</option>
						</select>
					</div>

					<div className='d-flex justify-content-end gap-2'>
						<button
							type='button'
							onClick={() => navigate('/')}
							className='btn btn-secondary btn-cancel'
						>
							Cancel
						</button>
						<button type='submit' className='btn btn-primary btn-submit'>
							{id ? 'Update task' : 'Create task'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default TaskForm
