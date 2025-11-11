import { toast } from 'react-hot-toast';
import useAuthStore from '../store/useAuthStore';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fetchWithAuth = async (url, options = {}) => {
  const token = useAuthStore.getState().token;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    useAuthStore.getState().logout();
    toast.error('Session expired. Please log in again.');
    return null;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  if (options.method === 'DELETE') return { success: true };

  return response.json();
};

const apiService = {
  register: (data) => fetchWithAuth(`${BACKEND_URL}/auth/register`, { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => fetchWithAuth(`${BACKEND_URL}/auth/login`, { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => fetchWithAuth(`${BACKEND_URL}/auth/me`),

  getBoards: () => fetchWithAuth(`${BACKEND_URL}/boards`),
  getBoardDetail: (id) => fetchWithAuth(`${BACKEND_URL}/boards/${id}`),
  createBoard: (title) => fetchWithAuth(`${BACKEND_URL}/boards`, { method: 'POST', body: JSON.stringify({ title }) }),
  deleteBoard: (id) => fetchWithAuth(`${BACKEND_URL}/boards/${id}`, { method: 'DELETE' }),
  inviteCollaborator: (boardId, email) =>
    fetchWithAuth(`${BACKEND_URL}/boards/${boardId}/invite`, { method: 'PUT', body: JSON.stringify({ email }) }),

  createTask: (data) => fetchWithAuth(`${BACKEND_URL}/tasks`, { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (taskId, data) => fetchWithAuth(`${BACKEND_URL}/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTask: (taskId) => fetchWithAuth(`${BACKEND_URL}/tasks/${taskId}`, { method: 'DELETE' }),
};

export default apiService;
