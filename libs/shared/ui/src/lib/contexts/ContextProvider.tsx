import React, { useState } from 'react'
import AppContext from './AppContext'
import { useGetCategories, useGetRoles } from '@goal-tracker/data-access';

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('')
    const { data: categories }: any = useGetCategories();
    const {data: roles}: any = useGetRoles()
    
  return (
    <AppContext.Provider value={{manage, setManage , categories, roles}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider;
