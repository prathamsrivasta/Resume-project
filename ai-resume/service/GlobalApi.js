import axios from "axios"; // it is used to make HTTP requests and handle responses                                                                                            
// Ensure that the API key is correctly read from the environment
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// Create an axios instance with base URL and headers
const axiosClient = axios.create({
    baseURL: 'http://localhost:1337/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}` // Ensure there's no extra space before 'Bearer'
    }
});

// API methods
const CreateNewResume = (data) => axiosClient.post('api/user-resumes', data); // Create a new resume and return the response
const GetUserResumes = (userEmail) => axiosClient.get('api/user-resumes?filters[userEmail][$eq]=' + userEmail); // Get all resumes for a user
const UpdateResumeDetail = (id, data) => axiosClient.put('api/user-resumes/' + id, data);// Update a resume by ID and return the response
const GetResumeById = (id) => axiosClient.get('api/user-resumes/' + id + '?populate=*'); // Get a resume by ID and populate all fields
const DeleteResumeById = (id) => axiosClient.delete('api/user-resumes/' + id); // Delete a resume by ID and return the response

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};
