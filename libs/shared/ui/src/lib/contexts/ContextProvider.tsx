import React, { useState } from 'react'
import AppContext from './AppContext'
import {useGetCategories} from '../../../../data-access/src/lib/queries/getAllCategories';
import { useGetRoles } from '../../../../data-access/src/lib/queries/getAllRoles';
import { useUpdateCategory } from '../../../../data-access/src/lib/queries/updateCategory';

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('')
    const { data: categories }: any = useGetCategories();
    const { data: roles }: any = useGetRoles();
    // const {mutateAsync:updateCategory} = useUpdateCategory();
    // const payLoad = {
    //   categoryId:"c313db86-98cf-11ee-8263-04e56e7607c1",
    //   categoryName:"4321Fitness"
    // }

    // const update = updateCategory(payLoad); 
    
  return (
    <AppContext.Provider value={{manage, setManage , categories , roles}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider
