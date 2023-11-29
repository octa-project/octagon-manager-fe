import { Fragment } from "react"
import TextField from "@mui/material/TextField"

export default function CustomTextField (props: any) {
  const { ...prop } = props
  return (
    <Fragment>
      <TextField className="bg-white"
        {...prop}
        autoComplete="off"
        />
    </Fragment>
  )
}