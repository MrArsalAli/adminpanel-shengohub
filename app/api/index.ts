import axios from "axios";
import AppRoutes from "../constant/constant";


export const getAllTeachers = async () => {
    try {
        const response = await axios.get(AppRoutes.getAllTeachers);
        return response?.data?.data;
    } catch (error: any) {
        console.error("Error fetching all teachers:", error.message);
    }
};

export const getAllStudents = async () => {
    try {
        const response = await axios.get(AppRoutes.getAllStudents);
        return response?.data?.data;
    } catch (error: any) {
        console.error("Error fetching all Students:", error.message);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(AppRoutes.getAllUsers);
        return response?.data?.data;
    } catch (error: any) {
        console.error("Error fetching all Users:", error.message);
    }
};

export const getAllTeachersRequest = async (id: any) => {
    try {
        const response = await axios.get(AppRoutes.getAllTeachersRequests);
        return response?.data?.data;
    } catch (error: any) {
        console.error("Error fetching a teacher:", error?.message);
    }
};

export const getATeachersRequest = async (id: any) => {
    try {
        const response = await axios.get(`${AppRoutes.getSingleTeacherRequest}/${id}`);
        return response?.data?.data;
    } catch (error: any) {
        console.error("Error fetching a teacher:", error?.message);
    }
};

export const updateTeachersRequestStatus = async (id: any) => {
    try {
        const response = await axios.put(`${AppRoutes.updateTeacherStatus}/${id}`);
        return response?.data?.data;
    } catch (error: any) {
        console.error("Error fetching a teacher:", error?.message);
    }
};

export const getDashboardStats = async () => {
    try {
        const response = await axios.get(AppRoutes.getDashboardStats);
        return response?.data?.data;
    } catch (error: any) {
        console.error("Error fetching dashboard stats:", error.message);
        return null;
    }
};
