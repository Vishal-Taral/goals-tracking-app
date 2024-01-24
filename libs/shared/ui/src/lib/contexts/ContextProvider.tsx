import React, { useState } from 'react'
import AppContext from './AppContext'

const ContextProvider = (props: any) => {
    const [manage, setManage] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(1)

    return (
    <AppContext.Provider value={{manage, setManage, pageNumber, setPageNumber,pageSize, setPageSize}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default ContextProvider;
