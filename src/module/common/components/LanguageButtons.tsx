import React from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const LanguageButtons = () => {
  const langOptions = ['en', 'zh-CN', 'zh-TW']
  const { t, i18n } = useTranslation()

  const changeLanguageHandler = (lang: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
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
          {t(option)}
        </Button>
      ))}
    </Stack>
  )
}

export default LanguageButtons
