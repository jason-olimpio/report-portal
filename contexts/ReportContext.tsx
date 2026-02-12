import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'

import {reportData} from '@store'
import type {Report} from '@types'

export type ReportContextType = {
  reports: Report[]
  setReports: Dispatch<SetStateAction<Report[]>>
}

export const ReportContext = createContext<ReportContextType | undefined>(
  undefined,
)

type ReportProviderProps = {
  children: ReactNode
}

export const ReportProvider = ({children}: ReportProviderProps) => {
  const [reports, setReports] = useState<Report[]>(reportData)

  return (
    <ReportContext.Provider value={{reports, setReports}}>
      {children}
    </ReportContext.Provider>
  )
}
