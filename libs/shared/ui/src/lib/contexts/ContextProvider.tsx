import React, { useState } from 'react'
import AppContext from './AppContext'
import {useGetCategories} from '../../../../data-access/src/lib/queries/getAllCategories';
import { useGetRoles } from '../../../../data-access/src/lib/queries/getAllRoles';

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('')
    const { data: categories }: any = useGetCategories();
    const { data: roles }: any = useGetRoles();
    
  return (
    <AppContext.Provider value={{manage, setManage , categories , roles}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider
