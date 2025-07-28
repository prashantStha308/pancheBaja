import { useQuery } from "@tanstack/react-query";
import { getAllArtists, getAllUsers, getUserById, getUsersByCity, searchUser } from "../services/user.services.js";

export const useGetAllUsers = ( page = 1 , limit = 10 ) => {
    return useQuery({
        queryFn: ()=> getAllUsers(page , limit),
        queryKey: ['user', { page, limit }],
    })
}

export const useGetAllArtists = (page = 1, limit = 10) => {
    return useQuery({
        queryFn: () => getAllArtists(page, limit),
        queryKey: ['artists', { page, limit }],
    })
}

export const useGetUserById = (id) => {
    return useQuery({
        queryFn: () => getUserById(id),
        queryKey: ['user' , id]
    })
}

export const useSearchUser = (searchWord) => {
    return useQuery({
        queryFn: () => searchUser(searchWord),
        queryKey: ['search' , searchWord]
    })
}

export const useGetUserByCity = (city) => {
    return useQuery({
        queryFn: () => getUsersByCity(city),
        queryKey: ['users' , city],
    })
}

export const useGetUserByCountry = (country) => {
 return useQuery({
        queryFn: () => getUsersByCity(country),
        queryKey: ['users' , country],
    })
}