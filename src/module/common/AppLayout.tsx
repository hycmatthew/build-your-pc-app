import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'

type Props = {
  children: JSX.Element
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 540,
      sm: 720,
      md: 900,
      lg: 1080,
      xl: 1200,
    },
  },
})

function AppLayout({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h2>123</h2>
          </Grid>
          <Grid item xs={12}>
            {children}
          </Grid>
          <Grid item xs={12}>
            <p>222</p>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default AppLayout
