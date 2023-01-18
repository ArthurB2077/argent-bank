const API_URL = 'http://localhost:3001/api/v1';

export const getProfile: Function = (token: string): Promise<Response> => fetch(`${API_URL}/user/profile`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
});

export const updateProfile: Function = (token: string, firstName: string, lastName: string): Promise<Response> => fetch(`${API_URL}/user/profile`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        firstName,
        lastName,
    })
});
