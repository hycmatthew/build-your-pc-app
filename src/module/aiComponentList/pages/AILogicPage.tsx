import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'

import AppLayout from '../../common/AppLayout'
import BudgetComponent from '../components/BudgetComponent'
import UsageComponent from '../components/UsageComponent'
import SpecificComponent from '../components/SpecificComponent'

function AILogicPage() {
  const [step, setStep] = useState(0)

  return (
    <AppLayout>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BudgetComponent />
        </Grid>
        <Grid item xs={12}>
          <UsageComponent />
        </Grid>
        <Grid item xs={12}>
          <SpecificComponent />
        </Grid>
      </Grid>
    </AppLayout>
  )
}

export default AILogicPage
