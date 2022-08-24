import React from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import MenuIcon from '@mui/icons-material/Menu'

import { createTheme, styled, ThemeProvider } from '@mui/material/styles'

import './AppLayout.scss'

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

const CustomAppLayout = styled(AppBar)({
  backgroundColor: '#ffffff',
  alpha: 0.5,
})

const CustomTypography = styled(Typography)({
  color: '#222222',
})

function AppLayout({ children }: Props) {
  const pages = ['Products', 'Pricing', 'Blog']
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        className="main_container"
      >
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <CustomAppLayout>
                <Container maxWidth="xl">
                  <Toolbar disableGutters>
                    <CustomTypography
                      variant="h6"
                      noWrap
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                      }}
                    >
                      LOGO
                    </CustomTypography>

                    <Box
                      sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: 'block', md: 'none' },
                        }}
                      >
                        {pages.map((page) => (
                          <MenuItem key={page} onClick={handleCloseNavMenu}>
                            <Typography textAlign="center">{page}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                    <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href=""
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        textDecoration: 'none',
                      }}
                    >
                      LOGO
                    </Typography>
                    <Box
                      sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    >
                      {pages.map((page) => (
                        <Button
                          key={page}
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: 'black', display: 'block' }}
                        >
                          {page}
                        </Button>
                      ))}
                    </Box>
                  </Toolbar>
                </Container>
              </CustomAppLayout>
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
            <Grid item xs={12}>
              <p>222</p>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default AppLayout
