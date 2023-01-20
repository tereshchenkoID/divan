import axios from 'axios';

const server = axios.create({
    baseURL: `https://stats.fn.sportradar.com/betradar/en/Europe:Berlin/gismo/`,
})

export const getSport = (url) => {
    return server.get(url)
        .then(response => {
            return response.data.doc[0]
        });
}

export const getCategory = (url) => {
    return server.get(url)
        .then(response => {
            return response.data.doc[0]
        });
}

export const getLeague = (url) => {
    return server.get(url)
        .then(response => {
            return response.data.doc[0]
        });
}

export const getSeason = (url) => {
    return server.get(url)
        .then(response => {
            return response.data.doc[0]
        });
}

export const getLanguage = (url) => {
    return server.get(url)
        .then(response => {
            return response.data
        });
}

export const getTeams = (url) => {
    return server.get(url)
        .then(response => {
            return response.data.doc[0]
        });
}
