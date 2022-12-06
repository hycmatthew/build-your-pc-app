import React, { useState } from 'react'
import { t } from 'i18next'
import {
  Badge,
  Button,
  Grid,
} from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

import MotherboardType from '../../../constant/objectTypes/MotherboardType'
import SelectElement from '../../common/components/SelectElement'
import PriceSlider from '../../common/components/PriceSlider'
import { generateMotherboardSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getMotherboardBrand, getMotherboardChipset } from '../../../utils/GroupCategoryHelper'
import ComparisonModal from './ComparisonModal'
import ItemCard from './ItemCard'

import { MOTHERBOARD_FILTER_INIT_DATA } from '../data/FilterInitData'
import { generateItemName } from '../../../utils/LabelHelper'
import { ComparisonObject, ComparisonSubItem } from '../data/ComparisonObject'
import { getCurrentPriceWithSign } from '../../../utils/NumberHelper'

type MotherboardSuggestionProps = {
  motherboardList: MotherboardType[]
  isLoading: boolean
}

const MotherboardSuggestion = ({
  motherboardList,
  isLoading,
}: MotherboardSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(MOTHERBOARD_FILTER_INIT_DATA)
  const [selectedItems, setSelectedItems] = useState<MotherboardType[]>([])
  const [openCompare, setOpenCompare] = useState(false)

  const brandOptions = getMotherboardBrand(motherboardList)
  const chipsetOptions = getMotherboardChipset(motherboardList)

  const addComparison = (item: MotherboardType) => {
    setSelectedItems([...selectedItems, item])
  }

  const updateSelectedItem = (item: string) => {
    setfilterLogic({ ...filterLogic, model: item })
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

  const openCompareLogic = () => {
    if (selectedItems.length > 0) {
      setOpenCompare(true)
    }
  }

  const handleClose = () => {
    setOpenCompare(false)
  }

  const removeComparison = (model: string) => {
    const updatedList: MotherboardType[] = selectedItems.filter(
      (element: MotherboardType) => element.model !== model
    )
    if (updatedList.length === 0) {
      handleClose()
    }
    setSelectedItems([...updatedList])
  }

  const openComparison = () => {
    let comparsionObjects: ComparisonObject[] = []
    comparsionObjects = selectedItems.map((item) => {
      const imgStr = item.img
      const itemModel = item.model
      const itemName = generateItemName(item.brand, item.model)

      const motherboardSocket: ComparisonSubItem = {
        label: 'motherboard-socket',
        value: item.socket,
        isHighlight: false,
      }

      const motherboardChipset: ComparisonSubItem = {
        label: 'motherboard-chipset',
        value: item.chipset,
        isHighlight: false,
      }

      const motherboardRamType: ComparisonSubItem = {
        label: 'motherboard-ram-type',
        value: item.ramType,
        isHighlight: false,
      }
      /*
      const motherboardSupporedRam: ComparisonSubItem = {
        label: 'motherboard-ram',
        value: item.supportedRam,
        isHighlight: false,
      }
      */
      const sizeType: ComparisonSubItem = {
        label: 'size-type',
        value: item.sizeType,
        isHighlight: false,
      }

      const result: ComparisonObject = {
        img: imgStr,
        name: itemName,
        model: itemModel,
        items: [
          motherboardSocket,
          motherboardChipset,
          motherboardRamType,
          sizeType,
        ],
      }

      return result
    })

    return (
      <ComparisonModal
        comparisonObjects={comparsionObjects}
        isOpen={openCompare}
        handleClose={handleClose}
        handleRemove={removeComparison}
      />
    )
  }

  const updatedList = motherboardList.filter((item) => {
    let isMatch = true
    if (filterLogic.brand) {
      isMatch = item.brand === filterLogic.brand
    }
    return isMatch
  })

  return (
    <>
      <Grid container spacing={3} columns={{ xs: 6, md: 12 }}>
        <Grid item xs={9}>
          <SelectElement
            label={t('motherboard')}
            options={generateMotherboardSelectElement(motherboardList)}
            selectChange={updateSelectedItem}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={3}>
          <Badge badgeContent={selectedItems.length} color="error">
            <Button
              startIcon={<CompareArrowsIcon />}
              variant="contained"
              disabled={selectedItems.length === 0}
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
        <Grid item xs={6}>
          <SelectFilter
            label={t('chipset')}
            options={chipsetOptions}
            selectChange={updateFilterChipset}
          />
        </Grid>
      </Grid>
      <Grid sx={{ paddingTop: 10 }} container spacing={2} columns={{ xs: 6, md: 12 }}>
        {updatedList.map((item) => (
          <ItemCard
            itemLabel={generateItemName(item.brand, item.model)}
            priceLabel={getCurrentPriceWithSign(item)}
            imgSrc={item.img}
            disable={selectedItems.includes(item)}
            addComparsion={() => addComparison(item)}
            removeComparsion={() => removeComparison(item.model)}
          />
        ))}
      </Grid>
    </>
  )
}

export default MotherboardSuggestion
