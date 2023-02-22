import { AppWindow } from "phosphor-react"
import { useEffect, useState } from "react"
import { generateDatesFromYearBeginning } from "../utils/generateDatesFromYearBeginning"
import { HabitDay } from "./HabitDay"
import { api } from '../lib/axios'
import dayjs from "dayjs"

type Summary = {
  id: string, date: string, amount: number, completed: number
}[]

const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])
  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data)
    })
  }, [])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekdays.map((weekday, i) => {
          return <div key={`${weekday}-${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
            {weekday}
          </div>
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">

        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })
          return <HabitDay
            amount={dayInSummary?.amount}
            date={date}
            defaultCompleted={dayInSummary?.completed}
            key={date.toString()} />
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
          return <div key={i} className=" bg-zinc-900 w-10 h-10 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
        })}

      </div>

    </div>
  )
}