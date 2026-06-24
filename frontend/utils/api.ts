const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';


function getToken() {
  if (typeof localStorage === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

export function setToken(token: string | null) {
  if (typeof localStorage === 'undefined') return;
  if (token) localStorage.setItem('admin_token', token);
  else localStorage.removeItem('admin_token');
}

async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
  };
  
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['X-Authorization'] = `Bearer ${token}`; // Fallback for Vercel PHP header stripping
  }
  
  options.headers = { ...headers, ...(options.headers as any) };
  
  const res = await fetch(url, options);
  
  if (!res.ok) {
    let msg = 'API error';
    try {
      const data = await res.json();
      msg = data.message || msg;
    } catch {}
    throw new Error(msg);
  }
  
  if (res.status === 204) return null;
  return res.json();
}

export async function fetchServices() {
  const res = await fetch(`${API_URL}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function createService(payload: any) {
  return fetchWithAuth(`${API_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function updateService(id: number, payload: any) {
  return fetchWithAuth(`${API_URL}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function deleteService(id: number) {
  return fetchWithAuth(`${API_URL}/services/${id}`, {
    method: 'DELETE',
  });
}

export async function fetchContacts() {
  return fetchWithAuth(`${API_URL}/contacts`);
}

export async function markMessageAsRead(id: number) {
  return fetchWithAuth(`${API_URL}/contacts/${id}/read`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function deleteMessage(id: number) {
  return fetchWithAuth(`${API_URL}/contacts/${id}`, {
    method: 'DELETE',
  });
}



export async function postContact(payload: any) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to post contact (Status: ${res.status}): ${errorText}`);
  }
  return res.json();
}

export async function loginAdmin(credentials: any) {
  const data = await fetchWithAuth(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (data && data.token) {
    setToken(data.token);
  }
  
  return data;
}

export async function fetchCurrentAdmin() {
  try {
    return await fetchWithAuth(`${API_URL}/user`);
  } catch (e) {
    return null;
  }
}

export async function logoutAdmin() {
  try {
    await fetchWithAuth(`${API_URL}/logout`, { method: 'POST' });
  } catch (e) {}
  setToken(null);
}
