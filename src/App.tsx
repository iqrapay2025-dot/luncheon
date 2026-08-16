import { useState } from "react"
import LandingPage from "./pages/Landing"
import RegistrationPage from "./pages/Registration"
import ConfirmationPage from "./pages/Confirmation"
import FAQPage from "./pages/FAQ"
import GalleryPage from "./pages/Gallery"

export type Page = "landing" | "register" | "confirmation" | "faq" | "gallery"
export type NavigateFn = (page: Page, data?: unknown) => void

export default function App() {
  const [page, setPage] = useState<Page>("landing")
  const [confirmData, setConfirmData] = useState<unknown>(null)

  const navigate: NavigateFn = (newPage, data) => {
    if (data !== undefined) setConfirmData(data)
    setPage(newPage)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      {page === "landing" && <LandingPage navigate={navigate} />}
      {page === "register" && <RegistrationPage navigate={navigate} />}
      {page === "confirmation" && (
        <ConfirmationPage navigate={navigate} data={confirmData} />
      )}
      {page === "faq" && <FAQPage navigate={navigate} />}
      {page === "gallery" && <GalleryPage navigate={navigate} />}
    </>
  )
}
