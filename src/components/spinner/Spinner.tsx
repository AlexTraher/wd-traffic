import { FC } from "react";
import "./spinner.css"

const Spinner: FC = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <span className="spinner"></span>
    </div>
  )
}

export default Spinner;