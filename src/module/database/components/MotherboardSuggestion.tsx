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

import MotherboardType from '../../../constant/objectTypes/MotherboardType'
import SelectElement from '../../common/components/SelectElement'
import { generateMotherboardSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getMotherboardBrand } from '../../../utils/GroupCategoryHelper'

import { MOTHERBOARD_FILTER_INIT_DATA } from '../data/FilterInitData'

type MotherboardSuggestionProps = {
  motherboardList: MotherboardType[]
  isLoading: boolean
}

const MotherboardSuggestion = ({
  motherboardList,
  isLoading,
}: MotherboardSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(MOTHERBOARD_FILTER_INIT_DATA)

  let selectedItem: MotherboardType | null = null
  const brandOptions = getMotherboardBrand(motherboardList)

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updatedList = motherboardList.filter((item) => {
    let isMatch = true
    if (!isEmpty(filterLogic.brand)) {
      isMatch = item.brand === filterLogic.brand
    }
    return isMatch
  })

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <SelectElement
            label={t('motherboard')}
            options={generateMotherboardSelectElement(motherboardList)}
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
      <Grid container>
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
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
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

export default MotherboardSuggestion
