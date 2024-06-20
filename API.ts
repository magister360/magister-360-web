//const API_KEY=process.env.REACT_APP_API_KEY

export const getApiUrl = (endpoint: string) => {
   
    return `http://localhost:3000${endpoint}`;
};
