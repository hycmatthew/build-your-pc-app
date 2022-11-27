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

import GPUType from '../../../constant/objectTypes/GPUType'
import SelectElement from '../../common/components/SelectElement'
import PriceSlider from '../../common/components/PriceSlider'
import { generateGPUSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getGPUBrand, getGPUManufacturer } from '../../../utils/GroupCategoryHelper'
import { stringToNumber, getSelectedCurrency } from '../../../utils/NumberHelper'

import { GPU_FILTER_INIT_DATA } from '../data/FilterInitData'
import { generateItemName } from '../../../utils/LabelHelper'

type GPUSuggestionProps = {
  gpuList: GPUType[]
  isLoading: boolean
}

const GPUSuggestion = ({
  gpuList,
  isLoading,
}: GPUSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(GPU_FILTER_INIT_DATA)

  const brandOptions = getGPUBrand(gpuList)
  const manufacturerOptions = getGPUManufacturer(gpuList)

  const updateSelectedItem = (item: any) => {
    setfilterLogic({ ...filterLogic, model: item })
  }

  const updateMaxPrice = (price: number) => {
    setfilterLogic({ ...filterLogic, price })
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updateFilterManufacturer = (manufacturer: string) => {
    setfilterLogic({ ...filterLogic, manufacturer })
  }

  const updatedList = gpuList.filter((item) => {
    let isMatch = true
    if (filterLogic.brand) {
      isMatch = (item.brand === filterLogic.brand)
    }
    if (filterLogic.manufacturer && isMatch) {
      isMatch = (item.manufacturer === filterLogic.manufacturer)
    }
    if (filterLogic.price !== 0 && isMatch) {
      isMatch = (stringToNumber(item[getSelectedCurrency()]) < filterLogic.price)
    }
    return isMatch
  })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectElement
            label={t('gpu')}
            options={generateGPUSelectElement(gpuList)}
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
            label={t('manufacturer')}
            options={manufacturerOptions}
            selectChange={updateFilterManufacturer}
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

export default GPUSuggestion
