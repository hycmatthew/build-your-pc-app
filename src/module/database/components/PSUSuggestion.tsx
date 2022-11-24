import React, { useState } from 'react'
import { t } from 'i18next'
import { isEmpty } from 'lodash'
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

import PSUType from '../../../constant/objectTypes/PSUType'
import SelectElement from '../../common/components/SelectElement'
import { generatePSUSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getPSUBrand } from '../../../utils/GroupCategoryHelper'

import { PSU_FILTER_INIT_DATA } from '../data/FilterInitData'

type PSUSuggestionProps = {
  psuList: PSUType[]
  isLoading: boolean
}

const PSUSuggestion = ({
  psuList,
  isLoading,
}: PSUSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(PSU_FILTER_INIT_DATA)

  let selectedItem: PSUType | null = null
  const brandOptions = getPSUBrand(psuList)

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updatedList = psuList.filter((item) => {
    let isMatch = true
    if (!isEmpty(filterLogic.brand)) {
      isMatch = (item.brand === filterLogic.brand)
    }
    return isMatch
  })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectElement
            label={t('psu')}
            options={generatePSUSelectElement(psuList)}
            selectChange={updateSelectedItem}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectFilter
            label={t('brand')}
            options={brandOptions}
            selectChange={updateFilterBrand}
          />
        </Grid>
      </Grid>
      <Grid sx={{ paddingTop: 10 }} container>
        {updatedList.map((item) => (
          <Grid key={item.model} item xs={3}>
            <CardMedia
              component="img"
              height="140"
              image={item.img}
              alt={item.model}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                {item.model}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default PSUSuggestion
