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
import PriceSlider from '../../common/components/PriceSlider'
import { generateMotherboardSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getMotherboardBrand, getMotherboardChipset } from '../../../utils/GroupCategoryHelper'

import { MOTHERBOARD_FILTER_INIT_DATA } from '../data/FilterInitData'
import { generateItemName } from '../../../utils/LabelHelper'

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
  const chipsetOptions = getMotherboardChipset(motherboardList)

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateMaxPrice = (price: number) => {
    setfilterLogic({ ...filterLogic, price })
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updateFilterChipset = (chipset: string) => {
    setfilterLogic({ ...filterLogic, chipset })
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectElement
            label={t('motherboard')}
            options={generateMotherboardSelectElement(motherboardList)}
            selectChange={updateSelectedItem}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={9}>
          <PriceSlider selectChange={updateMaxPrice} />
        </Grid>
        <Grid item xs={6}>
          <SelectFilter
            label={t('brand')}
            options={brandOptions}
            selectChange={updateFilterBrand}
          />
        </Grid>
        <Grid item xs={6}>
          <SelectFilter
            label={t('chipset')}
            options={chipsetOptions}
            selectChange={updateFilterChipset}
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
                {generateItemName(item.brand, item.model)}
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
