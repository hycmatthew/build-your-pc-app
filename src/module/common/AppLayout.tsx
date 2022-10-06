import React, { useState, useMemo } from 'react'
import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import MenuIcon from '@mui/icons-material/Menu'
import LanguageIcon from '@mui/icons-material/Language'
import Stack from '@mui/material/Stack'
import LanguageButton from './components/LanguageButton'

import './AppLayout.scss'

type Props = {
  children: JSX.Element
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 720,
      lg: 900,
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

const TopGrid = styled(Grid)({
  height: '70px',
})

const ChildGrid = styled(Grid)({
  paddingTop: '80px !important',
  height: 'calc(100vh - 44px)',
})

const FooterGrid = styled(Grid)({
  height: '44px',
})

function AppLayout({ children }: Props) {
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const pages = [
    { label: 'pc-builder', link: '/' },
    { label: 'benchmarks', link: '/benchmarks' },
    { label: 'ai-list', link: '/benchmarks' },
    { label: 'database', link: '/database' }
  ]

  const handleMenuClick = () => {
    setSubMenuOpen(!subMenuOpen)
  }

  const handleLangClick = () => {
    setSubMenuOpen(!subMenuOpen)
  }

  const DesktopMenu = useMemo(
    () => (
      <Container
        maxWidth="xl"
        sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}
      >
        <Grid
          container
          sx={{ height: '70px' }}
          justifyContent="space-between"
          alignItems="center"
          margin="auto"
        >
          <Grid item xs={2}>
            <CustomTypography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
              }}
            >
              LOGO
            </CustomTypography>
          </Grid>
          <Grid className="header-link-grid" item xs={9}>
            <Stack direction="row" spacing={2}>
              {pages.map((page) => (
                <Link key={page.label} to={page.link}>
                  <Button sx={{ color: 'black', display: 'block' }}>
                    {page.label}
                  </Button>
                </Link>
              ))}
            </Stack>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={subMenuOpen ? 'long-menu' : undefined}
              aria-expanded={subMenuOpen ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleLangClick}
            >
              <LanguageIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
          <LanguageButton />
        </Collapse>
      </Container>
    ),
    [subMenuOpen] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const MobileMenu = useMemo(
    () => (
      <Container sx={{ display: { xs: 'block', sm: 'block', md: 'none' } }}>
        <Grid
          container
          sx={{ height: '70px' }}
          justifyContent="space-between"
          alignItems="center"
          margin="auto"
        >
          <Grid item xs={2}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
          <Grid className="header-link-grid" container spacing={1}>
            {pages.map((page) => (
              <Grid item xs={12} key={page.label}>
                <Link to={page.link}>
                  <Button sx={{ color: 'black', display: 'block' }}>
                    {page.label}
                  </Button>
                </Link>
              </Grid>
            ))}
            <Grid item xs={12}>
              <LanguageButton />
            </Grid>
          </Grid>
        </Collapse>
      </Container>
    ),
    [subMenuOpen] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" className="main_container">
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <TopGrid item xs={12}>
              <CustomAppLayout>
                {DesktopMenu}
                {MobileMenu}
              </CustomAppLayout>
            </TopGrid>

            <ChildGrid item xs={12}>
              {children}
            </ChildGrid>
            <FooterGrid item xs={12}>
              <p>222</p>
            </FooterGrid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default AppLayout
