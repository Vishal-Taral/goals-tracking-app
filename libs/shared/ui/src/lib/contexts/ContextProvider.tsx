import React, { useState } from 'react'
import AppContext from './AppContext'
import { useGetCategories, useGetRoles } from '@goal-tracker/data-access';

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('')
    
  return (
    <AppContext.Provider value={{manage, setManage}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider;
