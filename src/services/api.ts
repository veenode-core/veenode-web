const API_BASE = '/api';

export async function apiRequest(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('vn_admin_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export const authApi = {
  login: (credentials: any) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
};

export const blogApi = {
  getAll: () => apiRequest('/blog'),
  create: (data: any) => apiRequest('/admin/blog', { method: 'POST', body: JSON.stringify(data) }),
};

export const servicesApi = {
  getAll: () => apiRequest('/services'),
  create: (data: any) => apiRequest('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
};
