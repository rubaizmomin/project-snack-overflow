const BASE_URL = 'http://localhost:9000/api';

const fetchTemplate = async (url, params = {}) => {
    return fetch(`${BASE_URL}${url}`, params).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
}

export const signup = async (name, email, password) => {
    return await fetchTemplate('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    });
}

export const login = async (name, password) => {
    return await fetchTemplate('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, password})
    });
}

export const logout = async () => {
    return await fetchTemplate('/logout', {
        method: 'GET'
    });
}

export const me = async () => {
    return await fetchTemplate('/me', {
        method: 'GET'
    });
}




