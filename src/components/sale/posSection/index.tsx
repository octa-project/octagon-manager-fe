import React, { Component, Fragment } from "react"
import Cart from "../cart"
import SearchBox from "../../tools/autoComplete"
import api from "@/src/api"
import moment from "moment"
import Snackbar from '@/src/components/tools/snackAlert'


export class PosSection extends Component {
  state = {
    saleId: 0,
    products: []
  }
  onSelected = async (selectedItem:any) => {
    if(this.state.saleId === 0){
      const saveData = {
        amount: selectedItem.sellPrice,
        date: moment().format("YYYY-MM-DD H:m:s")
      }
      try {
        const res = await api.save_sale.saveSale(saveData)
        if(res.data.code === "200"){
          this.setState({saleId: res.data.data.id})
          this.addSaleItemToSale(res.data.data.id, selectedItem.barcode?selectedItem.barcode:selectedItem[0].barcode)
          
        }else{
          Snackbar.warning(res.data.msg)
        }
      } catch (error) {
        console.log(error)
      }
    }else{
      this.addSaleItemToSale(this.state.saleId, selectedItem.barcode?selectedItem.barcode:selectedItem[0].barcode)
    }
  }
  addSaleItemToSale = async (saleId: number,barCode: string) => {
    try {
      const res = await api.add_sale_item_to_sale.addSaleItemToSale(saleId,barCode)
      if(res.data.isSuccess === true){

        if(this.state.products.length > 0){
          if(this.handleCheck(res.data.data)){

            this.setState(prevState => ({
                ...prevState,
                products: prevState.products.map((product: { itemId: any; qty: number }) => ({
                  ...product,
                  qty: product.itemId == res.data.data.itemId ? product.qty+1 : product.qty
              }))
            }))

          }else{
            this.setState({ products: this.state.products.concat(res.data.data) })
          }
        }
        this.getSaleById(saleId)
      }else{
        console.log(res.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  getSaleById = async (saleId) => {
    try {
      const { dataMerge } = this.props
      const sales =  await api.get_sale_by_id.getSaleById(saleId)
      if(sales.data.isSuccess === true){

        dataMerge(sales.data.data)

        if(this.state.products.length === 0){
          this.setState({products: sales.data.data.saleItems})
        }

      }else{
        console.log(sales.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  handleCheck = (item) => {
      return this.state.products.some(product => item.itemId === product.itemId);
  }
  // onCountChange = async (item) => {
  // }
  onCountUp = (item) => {
    this.addSaleItemToSale(item.saleId,item.itemBarcode)
  }
  onCountDown = async (item) => {
    try {
      let qty = parseInt(item.qty)-1
      const resp = await api.update_sale_item_from_sale.updateSaleItemFromSale(item.saleId,item.itemBarcode,qty)
      if(resp.data.isSuccess === true){
        this.setState(prevState => ({
          ...prevState,
            products: prevState.products.map(product => ({
              ...product,
              qty: product.itemId == item.itemId ? product.qty-1 : product.qty
          }))
        }))
        this.getSaleById(item.saleId)
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const { text } = this.props
    return (
      <Fragment>
        <div className="grid grid-cols-3 gap-5 mb-5">
          <div>
            <SearchBox
              items={this.onSelected}
              />
          </div>
          <div>
          </div>
        </div>
        <Cart
          items={this.state.products}
          // onCountChange={this.onCountChange}
          onCountUp={this.onCountUp}
          onCountDown={this.onCountDown}
        />
      </Fragment>
    )
  }
}

export default PosSection