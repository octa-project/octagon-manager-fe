import React, { Component } from "react"
import { Paper, List, ListItemText, ListItemButton } from "@mui/material"
import CustomTextField from "../../tools/textField"

class AutoSuggestWithApiDatasource extends Component {

    state = {
      hideSuggestions: true
    }
    
    renderOptions = () => {
      const { datasource, onSelected } = this.props
      if (!datasource) {
        return null
      }
      return datasource.map((data: any) => (
          <ListItemButton key={data.id} onClick={() => onSelected(data)}>
            <div className="w-full grid grid-cols-3 gap-5">
              <div>{data.barcode}</div>
              <div>{data.name}</div>
              <div>{data.sellPrice}</div>
            </div>
          </ListItemButton>
      ))
    }
  
    renderNoData = () => {
      return (
        <Paper elevation={4} >
          <List component="nav">
              <ListItemText className="text-base px-4">Барааны мэдээлэл олдсонгүй</ListItemText>
          </List>
        </Paper>
      )
    }
  
    renderSuggestions = () => {
      const { hideSuggestions } = this.state
      const { datasource, searchText } = this.props
  
      if (hideSuggestions || !searchText || searchText.length < 3) {
        return null
      }
  
      if (!datasource || datasource.length === 0) {
        return this.renderNoData()
      }
  
      return (
        <Paper elevation={4}>
          <List component="nav">
            <ListItemText>
              <div className="w-full grid grid-cols-3 gap-5 font-bold px-4">
                <div>Бар код</div>
                <div>Барааны нэр</div>
                <div>Барааны үнэ</div>
              </div>
            </ListItemText>
            {this.renderOptions()}
          </List>
        </Paper>
      )
    }

    onFocus = () => {
      this.setState({ hideSuggestions: false })
    }

    wait = async () => new Promise(resolve => setTimeout(resolve, 300))

    onBlur = async () => {
      await this.wait()
      this.setState({ hideSuggestions: true })
    }

    render () {
        const { onChange, searchText, handleKeyPress }  = this.props
        return (
            <div>
                <CustomTextField fullWidth={true}
                  label="Бар кодоор хайх" 
                  value={searchText}
                  onChange={onChange}
                  onKeyDown={handleKeyPress}
                  onFocus={this.onFocus}
                  onBlur={this.onBlur} />
                <div className="absolute z-10">{this.renderSuggestions()}</div>
            </div>
        )
    }
}
export default AutoSuggestWithApiDatasource