import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import ArchivedTaskList from './components/ArchivedTaskList'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
	return (
		<Router>
			<div className='app min-vh-100 d-flex flex-column'>
				<nav
					className='navbar navbar-expand-lg navbar-dark'
					style={{ background: 'var(--primary-gradient)' }}
				>
					<div className='container'>
						<Link to='/' className='navbar-brand d-flex align-items-center'>
							<i className='bi bi-check2-square me-2'></i>
							Note Creator
						</Link>
						<div className='navbar-nav ms-auto'>
							<Link to='/' className='nav-link'>
								Active Notes
							</Link>
							<Link to='/archived' className='nav-link'>
								Archived Notes
							</Link>
						</div>
					</div>
				</nav>
				<main className='flex-grow-1 app-main'>
					<Routes>
						<Route path='/' element={<TaskList />} />
						<Route path='/archived' element={<ArchivedTaskList />} />
						<Route path='/new' element={<TaskForm />} />
						<Route path='/edit/:id' element={<TaskForm />} />
					</Routes>
				</main>
				<footer className='py-3 text-center text-muted'>
					<small>Jacqueline © Note Creator {new Date().getFullYear()}</small>
				</footer>
			</div>
		</Router>
	)
}

export default App
