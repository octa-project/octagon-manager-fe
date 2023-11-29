import React, { useEffect, useMemo, useState } from 'react'
import { Autocomplete, Grid } from '@mui/material'
import { debounce } from '@mui/material/utils'
import CustomTextField from '../textField'
import api from '@/src/api'
import reactStringReplace from 'react-string-replace'
import { sleep } from '@/src/utils'

interface Item {
  id: number
  barcode: string
  name: string
  sellPrice: number
}

export default function SearchListComplete(props: { items: any }) {
  const { items } = props
  const [value, setValue] = useState<Item[] | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState<readonly Item[]>([])

  const fetch = useMemo(
    () => debounce(async (request: { input: string }, callback: (results?: Item[]) => void) => {
          const res = await api.get_by_barcode_like.getByBarCodeLike(request.input)
          callback(res.data.data)
        },
        400,
      ),
    [],
  )

  useEffect(() => {
    let active = true
    
    if (inputValue === "") {
      setOptions(value ? [value] : [])
      return undefined
    }
    fetch({ input: inputValue }, (results?: readonly Item[]) => {

      console.log(inputValue)
      if (active) {
        let newOptions: Item[] = []

        if (value) {
          newOptions = [value]
        }

        if (results) {
          newOptions = [...newOptions, ...results]
        }
        setOptions(newOptions)
      }

    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetch])
    const onChange = async (event: any, newValue: Item | null) => {
      // console.log(newValue)
      items(newValue)
      await sleep(300)
      setValue(null)
      setInputValue('')
      console.log('aaaaaaaaaaaaaaaaddadadadad')
    }
    function onInputChange(event: any, newInputValue: React.SetStateAction<string>): void {
      console.log(event.target.value)
      setInputValue(newInputValue)
    }

    return (
    <Autocomplete className='bg-white'
      getOptionLabel={(option) => typeof option === 'string' ? option : option.barcode }
      options={options}
      freeSolo
      value={value}
      onChange={onChange}
      onInputChange={onInputChange}
      renderInput={(params) => (
        <CustomTextField {...params} label="Бар кодоор хайх - F6" fullWidth />
      )}
      renderOption={(props, option) => {
        const replaced = reactStringReplace(option.barcode, inputValue, () => <span key={option.id} className='bg-yellow-200'>{inputValue}</span>)
        // debugger
        return (
          <li {...props} key={`SearchProp__${option.id}`}>
            <Grid container spacing={2} key={`SearchItem__${option.id}`}>
              <Grid item xs={4}>{replaced}</Grid>
              <Grid item xs={6}>{option.name}</Grid>
              <Grid item xs={2}>{option.sellPrice}₮</Grid>
            </Grid>
          </li>
        )
      }}
    />
  )
}
