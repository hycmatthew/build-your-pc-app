import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const LanguageButton = () => {
  const langOptions = ['en', 'sc', 'tc']
  const { t, i18n } = useTranslation()

  const changeLanguageHandler = (lang: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(lang)
    i18n.changeLanguage(lang)
  }

  return (
    <Stack direction="row" justifyContent="flex-end">
      {langOptions.map((option) => (
        <Button
          key={option}
          onClick={changeLanguageHandler(option)}
          sx={{ my: 2, color: 'black', display: 'block' }}
        >
          {option}
        </Button>
      ))}
    </Stack>
  )
}

export default LanguageButton
