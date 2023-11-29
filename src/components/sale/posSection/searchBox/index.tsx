import React, { Component, Fragment } from "react"
import AutoSuggestWithApiDatasource from "../../autoSuggestWithApiDatasource"
import api from "@/src/api"
import Snackbar from '@/src/components/tools/snackAlert'
class SearchBox extends Component {
  
  state = {
    searchText: "",
    products: []
  }

  onChange = async (e: { target: { value: number } }) => {
    if(!isNaN(e.target.value)){
      const searchText = e.target.value

      if (!searchText || searchText.length < 3) {
        this.setState({ products: [], searchText })
        return
      }
      this.setState({ searchText })
      try {
        const res = await api.get_by_barcode_like.getByBarCodeLike(searchText)
        if(res.data.code === "200"){
          this.setState({ products: res.data.data })
        }else{
          Snackbar.error(res.data.msg)
        }
      } catch (error) {
        Snackbar.error(error.message)
      }
    }else{
      Snackbar.error("Зөвхөн тоо оруулна уу")
      this.setState({ searchText: "" })
    }
  }
  
  handleKeyPress = async (e: { target: { value: any }; key: string }) => {
    const { items } = this.props

    if(e.key === "Enter"){

      try {
        const res = await api.get_by_barcode.getByBarCode(e.target.value)
        if(res.data.code === "200"){
          items(res.data.data)
          this.setState({ searchText: "" })
        }else{
          Snackbar.error('Барааны мэдээлэл олдсонгүй!')
        }
      } catch (error: any) {
        Snackbar.error(error.message)
      }
    }

  } 
  render() {
    const { items } = this.props
    const { products, searchText } = this.state
    return (
      <Fragment>
          <AutoSuggestWithApiDatasource
            searchText={searchText}
            onChange={this.onChange}
            onSelected={items}
            datasource={products}
            handleKeyPress={this.handleKeyPress}
          />
      </Fragment>
    )
  }
}

export default SearchBox

