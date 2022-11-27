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

import RAMType from '../../../constant/objectTypes/RAMType'
import SelectElement from '../../common/components/SelectElement'
import { generateRAMSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getRAMBrand } from '../../../utils/GroupCategoryHelper'

import { RAM_FILTER_INIT_DATA } from '../data/FilterInitData'
import { generateItemName } from '../../../utils/LabelHelper'

type RAMSuggestionProps = {
  ramList: RAMType[]
  isLoading: boolean
}

const RAMSuggestion = ({
  ramList,
  isLoading,
}: RAMSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(RAM_FILTER_INIT_DATA)

  let selectedItem: RAMType | null = null
  const brandOptions = getRAMBrand(ramList)

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updatedList = ramList.filter((item) => {
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
            label={t('ram')}
            options={generateRAMSelectElement(ramList)}
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

export default RAMSuggestion
