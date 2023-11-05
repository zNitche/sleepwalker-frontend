import { useState, useEffect } from "react"
import FlexLoader from "../../components/flex_loader/FlexLoader"
import "./styles.scss"
import { httpGet } from "../../utils/httpUtils"


export default function SessionsPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setupData()
  }, [])

  async function setupData() {
    setIsLoading(true)

    setIsLoading(false)
  }

  function renderContent() {
    return (
      <span>sessions</span>
    )
  }

  return (
    <div className="sessions-page-wrapper">
      {isLoading ? <FlexLoader /> : renderContent()}
    </div>
  )
}
