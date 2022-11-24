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

import SSDType from '../../../constant/objectTypes/SSDType'
import SelectElement from '../../common/components/SelectElement'
import { generateSSDSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getSSDBrand, getSSDCapacity } from '../../../utils/GroupCategoryHelper'

import { SSD_FILTER_INIT_DATA } from '../data/FilterInitData'

type SSDSuggestionProps = {
  ssdList: SSDType[]
  isLoading: boolean
}

const SSDSuggestion = ({ ssdList, isLoading }: SSDSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(SSD_FILTER_INIT_DATA)

  let selectedItem: SSDType | null = null
  const brandOptions = getSSDBrand(ssdList)
  const capacityOptions = getSSDCapacity(ssdList)

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updateFilterCapacity = (capacity: string) => {
    setfilterLogic({ ...filterLogic, capacity })
  }

  const updatedList = ssdList.filter((item) => {
    let isMatch = true
    if (!isEmpty(filterLogic.brand)) {
      isMatch = item.brand === filterLogic.brand
    }
    if (!isEmpty(filterLogic.capacity) && isMatch) {
      isMatch = item.capacity === filterLogic.capacity
    }
    return isMatch
  })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectElement
            label={t('ssd')}
            options={generateSSDSelectElement(ssdList)}
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
        <Grid item xs={6}>
          <SelectFilter
            label={t('capacity')}
            options={capacityOptions}
            selectChange={updateFilterCapacity}
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

export default SSDSuggestion
