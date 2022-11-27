import React, { useState } from 'react'
import { t } from 'i18next'
import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'

import CPUType from '../../../constant/objectTypes/CPUType'
import SelectElement from '../../common/components/SelectElement'
import PriceSlider from '../../common/components/PriceSlider'
import { generateCPUSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getCPUBrand } from '../../../utils/GroupCategoryHelper'

import { CPU_FILTER_INIT_DATA } from '../data/FilterInitData'
import { getSelectedCurrency, stringToNumber } from '../../../utils/NumberHelper'
import { generateItemName } from '../../../utils/LabelHelper'

type CPUSuggestionProps = {
  cpuList: CPUType[]
  isLoading: boolean
}

const CPUSuggestion = ({
  cpuList,
  isLoading,
}: CPUSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(CPU_FILTER_INIT_DATA)

  let selectedItem: CPUType | null = null
  const brandOptions = getCPUBrand(cpuList)

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateMaxPrice = (price: number) => {
    setfilterLogic({ ...filterLogic, price })
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updatedList = cpuList.filter((item) => {
    let isMatch = true
    if (filterLogic.brand) {
      isMatch = (item.brand === filterLogic.brand)
    }
    if (filterLogic.price !== 0) {
      isMatch = (stringToNumber(item[getSelectedCurrency()]) < filterLogic.price)
    }
    return isMatch
  })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SelectElement
            label={t('cpu')}
            options={generateCPUSelectElement(cpuList)}
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
      </Grid>
      <Grid sx={{ paddingTop: 10 }} container>
        {updatedList.map((item) => (
          <Grid key={item.name} item xs={3}>
            <CardMedia
              component="img"
              height="140"
              image={item.img}
              alt={item.name}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                {generateItemName(item.brand, item.name)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {
                  
                }
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Compare</Button>
            </CardActions>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CPUSuggestion
