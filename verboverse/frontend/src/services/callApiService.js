const BASE_URL = 'http://localhost:9000/api';

const fetchTemplate = async (url, params = {}) => {
    return fetch(`${BASE_URL}${url}`, params).then((res) => {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        return res.json();
    })
}

export const createCall = async () => {
    const params = {
        method: `POST`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ }),
      };
    return fetchTemplate(`/createCall`, params);
}

export const getCall = async (id) => {
    return await fetchTemplate(`/getCall/${id}`, {
        method: 'GET'
    });
}

export const getCalls = async () => {
    return await fetchTemplate('/getCalls', {
        method: 'GET'
    });
}

export const addOfferCandidates = async (id, offerCandidates) => {
    return await fetchTemplate(`/addOfferCandidates/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({offerCandidates})
    });
}

export const addOffer = async (id, offer) => {
    return await fetchTemplate(`/addOffer/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({offer})
    });
}
