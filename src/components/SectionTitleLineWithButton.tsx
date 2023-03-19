import { mdiCog, mdiFilter, mdiHead, mdiMagnify } from '@mdi/js'
import React, { Children, ReactNode, useState } from 'react'
import BaseButton from './BaseButton'
import BaseIcon from './BaseIcon'
import IconRounded from './IconRounded'
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Icon from '@mdi/react';
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { setTransaction } from '../stores/transactionSlice'



type Props = {
  icon?: string
  title?: string
  main?: boolean
  children?: ReactNode
  handleSearchClick?: () => void
}

export default function SectionTitleLineWithButton({handleSearchClick, icon, title, main = false, children }: Props) {
  const hasChildren = !!Children.count(children)
  const [showDatePickers, setShowDatePickers] = useState(false);
  const [showSearch, setSearch] = useState(false);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [ovalue, setOValue] = React.useState<Dayjs | null>(dayjs());
  const dispatch = useAppDispatch()

  
  const pageNumber = useAppSelector((state) => state.transaction.pageNumber)
  
  function handleFilterClick() {
    setShowDatePickers(!showDatePickers);
    setSearch(!showSearch)
    }

    // function handleSearchClick() {
    //   alert(dateFormatter(ovalue));
    //   alert(dateFormatter(value));
    // }

    const dateFormatter = (dateValue) => {
      const date = new Date(dateValue);
      const options = { timeZone: 'Africa/Lagos' };
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
    
      return formattedDate;
    }
    dispatch(setTransaction({ startDate: dateFormatter(ovalue), endDate: dateFormatter(value), pageNumber: pageNumber }))
  

  return (
    <section className={`${main ? '' : 'pt-6'} mb-6 flex items-center justify-between`}>
      <div className="flex items-center justify-start">
        {icon && main && <IconRounded icon={icon} color="light" className="mr-3" bg />}
        {icon && !main && <BaseIcon path={icon} className="mr-2" size="20" />}
        <h1 className={`leading-tight ${main ? 'text-3xl' : 'text-2xl'}`}>Transaction History</h1>
      </div>
      {children}
      {!hasChildren 
      && (
        <>
        <BaseButton icon={mdiFilter} iconSize={20} color="whiteDark" onClick={handleFilterClick} />
        {showDatePickers && (
         <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Start Date"
         value={value}
         onChange={(oldValue) => setValue(oldValue)}
        />
        <DatePicker label="End Date"
         value={ovalue}
         onChange={(newValue) => setOValue(newValue)}
        />
        </LocalizationProvider>
        )}

{showDatePickers && (
  <div onClick={handleSearchClick}>
 <Icon 
  path={mdiMagnify} 
  size={1} 
  style={{ cursor: 'pointer' }} 
/>
</div>
               )}    
        </>
        )}

    </section>
  )
}
