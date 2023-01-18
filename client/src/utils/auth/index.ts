const API_URL = 'http://localhost:3001/api/v1';

export const signUp: Function = (email: string, password: string, firstName: string, lastName: string): Promise<Response> => fetch(`${API_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password, firstName: firstName, lastName: lastName})
});

export const signIn: Function = (email: string, password: string): Promise<Response> => fetch(`${API_URL}/user/login`, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: email, password: password})
});