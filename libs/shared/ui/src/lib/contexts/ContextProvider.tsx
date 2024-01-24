import React, { useState } from 'react'
import AppContext from './AppContext'
import {QueryParamsObj} from '@goal-tracker/data-access'

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('');
    
    const [queryParamsObj , setQueryParamsObj] = useState<QueryParamsObj>({
      page : 2,
      pageSize : 4,
      sortBy : 'firstName',
      sortOrder : 'asc'
    });

    

    return (
    <AppContext.Provider value={{manage, setManage , queryParamsObj , setQueryParamsObj}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider;
