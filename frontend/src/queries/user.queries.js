import { useQuery } from "@tanstack/react-query";
import { getAllUsers, getUserById, getUsersByCity, registerUser } from "../services/user.services.js";

export const useUserRegistrationQuery = (formData) => {
    return useQuery({
        queryFn: () => registerUser(formData),
        queryKey: ['user-registration']
    })
}

export const useGetAllUsers = ( page = 1 , limit = 10 ) => {
    return useQuery({
        queryFn: ()=> getAllUsers(page , limit),
        queryKey: ['user', { page, limit }],
    })
}

export const useGetUserById = (id) => {
    return useQuery({
        queryFn: () => getUserById(id),
        queryKey: ['user', id],
        enabled: !!id,
    })
}

export const useGetUserByCity = (city) => {
    return useQuery({
        queryFn: () => getUsersByCity(city),
        queryKey: ['users', city],
        enabled: city
    })
}

export const useGetUserByCountry = (country) => {
 return useQuery({
        queryFn: () => getUsersByCity(country),
        queryKey: ['users' , country],
    })
}