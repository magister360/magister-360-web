//const API_KEY=process.env.REACT_APP_API_KEY

export const getApiUrl = (endpoint: string) => {
    // Suponiendo que estás desarrollando en localhost
    return `http://localhost:3000${endpoint}`;
};
