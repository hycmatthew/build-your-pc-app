import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  TextField,
  Button,
} from '@mui/material'

function UsageComponent() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Button size="small">Learn More</Button>
        <Button size="small">Learn More</Button>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

export default UsageComponent
