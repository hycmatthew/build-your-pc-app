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
import { generateGPUSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getGPUBrand } from '../../../utils/GroupCategoryHelper'

import { GPU_FILTER_INIT_DATA } from '../data/FilterInitData'

type GPUSuggestionProps = {
  gpuList: GPUType[]
  isLoading: boolean
}

const GPUSuggestion = ({
  gpuList,
  isLoading,
}: GPUSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(GPU_FILTER_INIT_DATA)

  let selectedItem: GPUType | null = null
  const brandOptions = getGPUBrand(gpuList)

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updatedList = gpuList.filter((item) => {
    let isMatch = true
    if (!isEmpty(filterLogic.brand)) {
      isMatch = (item.brand === filterLogic.brand)
    }
    return isMatch
  })

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <SelectElement
            label={t('gpu')}
            options={generateGPUSelectElement(gpuList)}
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
