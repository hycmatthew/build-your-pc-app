import React, { useState } from 'react'
import { t } from 'i18next'
import { isEmpty, max } from 'lodash'
import {
  Badge,
  Button,
  Grid,
} from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

import SSDType from '../../../constant/objectTypes/SSDType'
import SelectElement from '../../common/components/SelectElement'
import { generateSSDSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getSSDBrand, getSSDCapacity } from '../../../utils/GroupCategoryHelper'

import { SSD_FILTER_INIT_DATA } from '../data/FilterInitData'
import { generateItemName } from '../../../utils/LabelHelper'
import { ComparisonObject, ComparisonSubItem } from '../data/ComparisonObject'
import ComparisonModal from './ComparisonModal'
import ItemCard from './ItemCard'
import { getCurrentPriceWithSign } from '../../../utils/NumberHelper'

type SSDSuggestionProps = {
  ssdList: SSDType[]
  isLoading: boolean
}

const SSDSuggestion = ({ ssdList, isLoading }: SSDSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(SSD_FILTER_INIT_DATA)
  const [selectedItems, setSelectedItems] = useState<SSDType[]>([])
  const [openCompare, setOpenCompare] = useState(false)

  let selectedItem: SSDType | null = null
  const brandOptions = getSSDBrand(ssdList)
  const capacityOptions = getSSDCapacity(ssdList)

  const addComparison = (item: SSDType) => {
    setSelectedItems([...selectedItems, item])
  }

  const updateSelectedItem = (item: any) => {
    selectedItem = item
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const updateFilterCapacity = (capacity: string) => {
    setfilterLogic({ ...filterLogic, capacity })
  }

  const handleClose = () => {
    setOpenCompare(false)
  }

  const removeComparison = (model: string) => {
    const updatedList: SSDType[] = selectedItems.filter(
      (element: SSDType) => element.model !== model
    )
    if (updatedList.length === 0) {
      handleClose()
    }
    setSelectedItems([...updatedList])
  }

  const openCompareLogic = () => {
    if (selectedItems.length > 0) {
      setOpenCompare(true)
    }
  }

  const openComparison = () => {
    let comparsionObjects: ComparisonObject[] = []
    comparsionObjects = selectedItems.map((item) => {
      const imgStr = item.img
      const itemModel = item.model
      const itemName = generateItemName(item.brand, item.model)

      const capacity: ComparisonSubItem = {
        label: 'capacity',
        value: item.capacity,
        isHighlight: false,
      }

      const memoryType: ComparisonSubItem = {
        label: 'memoryType',
        value: item.memoryType,
        isHighlight: false,
      }

      const ramInterface: ComparisonSubItem = {
        label: 'interface',
        value: item.interface,
        isHighlight: false,
      }

      const sizeType: ComparisonSubItem = {
        label: 'sizeType',
        value: item.sizeType,
        isHighlight: false,
      }

      const readSpeed: ComparisonSubItem = {
        label: 'readSpeed',
        value: item.readSpeed.toString(),
        isHighlight: item.readSpeed === max(selectedItems.map((element) => element.readSpeed)),
      }

      const writeSpeed: ComparisonSubItem = {
        label: 'writeSpeed',
        value: item.writeSpeed.toString(),
        isHighlight: item.writeSpeed === max(selectedItems.map((element) => element.writeSpeed)),
      }

      const result: ComparisonObject = {
        img: imgStr,
        name: itemName,
        model: itemModel,
        items: [
          capacity,
          memoryType,
          ramInterface,
          sizeType,
          readSpeed,
          writeSpeed,
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
        <Grid item xs={9}>
          <SelectElement
            label={t('ssd')}
            options={generateSSDSelectElement(ssdList)}
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
          <ItemCard
            itemLabel={generateItemName(item.brand, item.model)}
            priceLabel={getCurrentPriceWithSign(item)}
            imgSrc={item.img}
            addComparsion={() => addComparison(item)}
          />
        ))}
      </Grid>
    </>
  )
}

export default SSDSuggestion
