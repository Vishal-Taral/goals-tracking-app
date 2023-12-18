import { apiClient , apiUrlObject} from "@goal-tracker/data-access"
import { useQuery } from "@tanstack/react-query";

const getAllRoles = ():Promise<any> =>{
    return apiClient.get(apiUrlObject.getAllRoles);
}

export const useGetRoles = ()=>{
    return useQuery({queryKey:['roles'],queryFn:getAllRoles});
}   
