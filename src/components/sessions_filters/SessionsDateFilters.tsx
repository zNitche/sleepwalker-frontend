import { SetStateAction, Dispatch } from "react"
import "./styles.scss"
import { DatePicker } from "@mui/x-date-pickers"
import { IFilter } from "../../interfaces/IFilter"
import { SessionsFiltersEnum } from "../../enums/SessionsFiltersEnum"
import dayjs from "dayjs"

interface SessionsDateFiltersProps {
  filters: IFilter[]
  setFilters: Dispatch<SetStateAction<IFilter[]>>
}

export default function SessionsDateFilters({ filters, setFilters }: SessionsDateFiltersProps) {
  function getFilterValue(name: SessionsFiltersEnum) {
    const filter = filters.find((filter) => filter.name == name)
    return filter ? dayjs(filter.value) : null
  }

  function setFilterValue(name: SessionsFiltersEnum, value: dayjs.Dayjs | null) {
    const updatedFilters = filters.filter(filter => filter.name != name)

    if (value) {
      updatedFilters.push({ name: name, value: value.toISOString() })
    }

    setFilters(updatedFilters)
  }

  return (
    <div className="sessions-date-filters-wrapper">
      <DatePicker
        label="From"
        slotProps={{
          field: { clearable: true },
        }}
        value={getFilterValue(SessionsFiltersEnum.DateFrom)}
        onChange={(newValue) => setFilterValue(SessionsFiltersEnum.DateFrom, newValue)}
        maxDate={dayjs()}
      />
      <DatePicker
        label="To"
        slotProps={{
          field: { clearable: true },
        }}
        value={getFilterValue(SessionsFiltersEnum.DateTo)}
        onChange={(newValue) => setFilterValue(SessionsFiltersEnum.DateTo, newValue)}
        // maxDate={dayjs()}
      />
    </div>
  )
}
