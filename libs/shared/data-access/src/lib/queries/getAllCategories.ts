import { apiClient , apiUrlObject} from "@goal-tracker/data-access"
import { useQuery } from "@tanstack/react-query";

const getAllCategories = ():Promise<any> =>{
    return apiClient.get(apiUrlObject.allCategoriesApiUrl);
}

export const useGetCategories = ()=>{
    return useQuery({queryKey:['categories'],queryFn:getAllCategories});
}   