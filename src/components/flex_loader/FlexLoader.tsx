import { CircularProgress } from "@mui/material"
import "./styles.scss"


export default function FlexLoader() {
  return (
    <div className="flex-loader-wrapper">
      <CircularProgress />
    </div>
  )
}
