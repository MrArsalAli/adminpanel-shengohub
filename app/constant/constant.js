const devURL = "http://localhost:7777";
const prodURL = "https://learnsphere-backend-21nu.onrender.com";
const prodURL1 = "https://learn-sphere-backend-pi.vercel.app";

const BASE_URL = devURL;

export const AppRoutes = {
    // auth
    signin: BASE_URL + "/auth/login",
    verifyOTP: BASE_URL + "/auth/verifyOTP",

    // admin
    getAllUsers: BASE_URL + "/admin/getAllUsers",
    getAllTeachers: BASE_URL + "/admin/getAllTeachers",
    getAllStudents: BASE_URL + "/admin/getAllStudents",
    getAllTeachersRequests: BASE_URL + "/admin/getAllTeachersRequests",
    getSingleTeacherRequest: BASE_URL + "/admin/getATeachersRequest",
    updateTeacherStatus: BASE_URL + "/admin/updateTeachersRequestStatus"



};

export default AppRoutes;
