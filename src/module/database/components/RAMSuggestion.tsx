import React, { useState } from 'react'
import { t } from 'i18next'
import { isEmpty, max, min } from 'lodash'
import {
  Badge,
  Button,
  Grid,
} from '@mui/material'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'

import RAMType from '../../../constant/objectTypes/RAMType'
import SelectElement from '../../common/components/SelectElement'
import { generateRAMSelectElement } from '../../common/utils/generateSelectElements'
import SelectFilter from '../../common/components/SelectFilter'
import { getRAMBrand } from '../../../utils/GroupCategoryHelper'

import { RAM_FILTER_INIT_DATA } from '../data/FilterInitData'
import { generateItemName } from '../../../utils/LabelHelper'
import ItemCard from './ItemCard'
import { ComparisonObject, ComparisonSubItem } from '../data/ComparisonObject'
import ComparisonModal from './ComparisonModal'

type RAMSuggestionProps = {
  ramList: RAMType[]
  isLoading: boolean
}

const RAMSuggestion = ({
  ramList,
  isLoading,
}: RAMSuggestionProps) => {
  const [filterLogic, setfilterLogic] = useState(RAM_FILTER_INIT_DATA)
  const [selectedItems, setSelectedItems] = useState<RAMType[]>([])
  const [openCompare, setOpenCompare] = useState(false)

  const brandOptions = getRAMBrand(ramList)

  const addComparison = (item: RAMType) => {
    setSelectedItems([...selectedItems, item])
  }

  const updateSelectedItem = (item: any) => {
    setfilterLogic({ ...filterLogic, model: item })
  }

  const updateFilterBrand = (brand: string) => {
    setfilterLogic({ ...filterLogic, brand })
  }

  const handleClose = () => {
    setOpenCompare(false)
  }

  const removeComparison = (model: string) => {
    const updatedList: RAMType[] = selectedItems.filter(
      (element: RAMType) => element.model !== model
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

      const ramChipset: ComparisonSubItem = {
        label: 'chipset',
        value: item.chipset,
        isHighlight: false,
      }

      const capacity: ComparisonSubItem = {
        label: 'capacity',
        value: item.capacity,
        isHighlight: item.capacityNum === max(selectedItems.map((element) => element.capacityNum)),
      }

      const speed: ComparisonSubItem = {
        label: 'firestrikeScore',
        value: item.speed.toString(),
        isHighlight: item.speed === max(selectedItems.map((element) => element.speed)),
      }

      const cl: ComparisonSubItem = {
        label: 'firestrikeScore',
        value: item.cl.toString(),
        isHighlight: item.cl === min(selectedItems.map((element) => element.cl)),
      }

      const timing: ComparisonSubItem = {
        label: 'motherboard-ram-type',
        value: item.timing || '-',
        isHighlight: item.cl === min(selectedItems.map((element) => element.cl)),
      }

      const rgb: ComparisonSubItem = {
        label: 'is-rgb',
        value: item.rgb ? 'RGB' : '-',
        isHighlight: false,
      }

      const result: ComparisonObject = {
        img: imgStr,
        name: itemName,
        model: itemModel,
        items: [
          ramChipset,
          capacity,
          speed,
          cl,
          timing,
          rgb
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

  const updatedList = ramList.filter((item) => {
    let isMatch = true
    if (filterLogic.brand && isMatch) {
      isMatch = (item.brand === filterLogic.brand)
    }
    return isMatch
  })

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <SelectElement
            label={t('ram')}
            options={generateRAMSelectElement(ramList)}
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
      </Grid>
      <Grid sx={{ paddingTop: 10 }} container>
        {updatedList.map((item) => (
          <ItemCard
            itemLabel={generateItemName(item.brand, item.model)}
            imgSrc={item.img}
            addComparsion={() => addComparison(item)}
          />
        ))}
      </Grid>
    </>
  )
}

export default RAMSuggestion
