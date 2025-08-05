const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const TaskService = {
  // Obtener todas las tareas
  getAllTasks: async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      if (!response.ok) throw new Error('Error al cargar las tareas');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Obtener una tarea por ID
  getTaskById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`);
      if (!response.ok) throw new Error('Error al cargar la tarea');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Crear una nueva tarea
  createTask: async (taskData) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error('Error al crear la tarea');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Actualizar una tarea existente
  updateTask: async (id, taskData) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) throw new Error('Error al actualizar la tarea');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Eliminar una tarea
  deleteTask: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar la tarea');
      return true;
    } catch (error) {
      throw error;
    }
  },

  // Obtener todas las notas activas
  getNotes: async (archived = false) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks?archived=${archived}`);
      if (!response.ok) throw new Error('Error al cargar las notas');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Archivar/desarchivar una nota
  toggleArchived: async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${id}/toggle-archive`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Error al cambiar el estado de archivo');
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

// Remove all content below this line that starts with # symbols