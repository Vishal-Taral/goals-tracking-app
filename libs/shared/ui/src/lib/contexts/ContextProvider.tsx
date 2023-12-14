import React, { useState } from 'react'
import AppContext from './AppContext'
import {useGetCategories} from '../../../../data-access/src/lib/queries/getAllCategories';

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('')
    const { data: categories }: any = useGetCategories();
    
  return (
    <AppContext.Provider value={{manage, setManage , categories}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider
