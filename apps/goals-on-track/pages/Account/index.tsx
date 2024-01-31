/* eslint-disable @nx/enforce-module-boundaries */
import React from 'react'
import { Account } from '@goal-tracker/ui'
import PrivateLayout from 'apps/goals-on-track/component/common/privateLayout/private-layout'

const index = () => {
  return (
    <PrivateLayout>
      <Account />
    </PrivateLayout>
  )
}

export default index
