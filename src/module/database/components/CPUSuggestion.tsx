import React, { useState } from 'react'
import { t } from 'i18next'
import {
  Badge,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import { motion, Variants } from 'framer-motion'
import { max, maxBy, sum } from 'lodash'

import CPUType from '../../../constant/objectTypes/CPUType'
import SelectElement from '../../common/components/SelectElement'
import PriceSlider from '../../common/components/PriceSlider'
import { generateCPUSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getCPUBrand } from '../../../utils/GroupCategoryHelper'

import { CPU_FILTER_INIT_DATA } from '../data/FilterInitData'
import {
  getSelectedCurrency,
  stringToNumber,
} from '../../../utils/NumberHelper'
import { generateItemName } from '../../../utils/LabelHelper'
import ComparisonModal from './ComparisonModal'
import { ComparisonObject, ComparisonSubItem } from '../data/ComparisonObject'

type CPUSuggestionProps = {
  cpuList: CPUType[]
  isLoading: boolean
}

const CPUSuggestion = ({ cpuList, isLoading }: CPUSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(CPU_FILTER_INIT_DATA)
  const [selectedItems, setSelectedItems] = useState<CPUType[]>([])
  const [openCompare, setOpenCompare] = useState(false)

  const brandOptions = getCPUBrand(cpuList)

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  const updateSelectedItem = (item: any) => {
    setfilterLogic({ ...filterLogic, model: item })
  }

  const updateMaxPrice = (price: number) => {
    setfilterLogic({ ...filterLogic, price })
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const addComparison = (item: CPUType) => {
    setSelectedItems([...selectedItems, item])
  }

  const openCompareLogic = () => {
    if (selectedItems.length > 0) {
      setOpenCompare(true)
    }
  }

  const handleClose = () => {
    setOpenCompare(false)
  }

  const getCoresNumber = (coreStr: string) => {
    const coreList = coreStr.split('/').map((item) => Number(item))
    return sum(coreList)
  }

  const openComparison = () => {
    let comparsionObjects: ComparisonObject[] = []
    comparsionObjects = selectedItems.map((item) => {
      const imgStr = item.img
      const itemName = item.name
      const cpuCores: ComparisonSubItem = {
        label: 'cpu-core',
        value: item.cores,
        isHighlight:
          getCoresNumber(item.cores) === max(selectedItems.map((element) => getCoresNumber(element.cores))),
      }

      const result: ComparisonObject = {
        img: imgStr,
        name: itemName,
        items: [cpuCores],
      }
      return result
    })

    return (
      <ComparisonModal
        comparisonObjects={comparsionObjects}
        isOpen={openCompare}
        handleClose={handleClose}
      />
    )
  }

  const updatedList = cpuList.filter((item) => {
    let isMatch = true
    if (filterLogic.brand) {
      isMatch = item.brand === filterLogic.brand
    }
    if (filterLogic.model && isMatch) {
      isMatch = item.name === filterLogic.model
    }
    if (filterLogic.price !== 0 && isMatch) {
      isMatch = stringToNumber(item[getSelectedCurrency()]) < filterLogic.price
    }
    return isMatch
  })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <SelectElement
            label={t('cpu')}
            options={generateCPUSelectElement(cpuList)}
            selectChange={updateSelectedItem}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={3}>
          <Badge badgeContent={selectedItems.length} color="error">
            <Button
              startIcon={<CompareArrowsIcon />}
              variant="contained"
              onClick={() => openCompareLogic()}
            >
              Compare
            </Button>
          </Badge>
        </Grid>
        {openComparison()}
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
                {item.multiCoreScore}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => addComparison(item)}>
                Compare
              </Button>
            </CardActions>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default CPUSuggestion
