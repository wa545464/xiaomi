let baseURL

if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = "http://localhost:8000"
} else {
    baseURL = "http://localhost:5000"
}
export default {
    baseURL
}
