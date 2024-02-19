export const env = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api/', // Acessa o backend
    fileLink: process.env.REACT_APP_LINK_URL || 'http://localhost:8000/storage/', // Download de Arquivos
}