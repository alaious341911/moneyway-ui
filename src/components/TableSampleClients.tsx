import { mdiArrowBottomLeft, mdiArrowBottomRight, mdiCallReceived, mdiEye, mdiSend, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../hooks/sampleData'
import { Client, Transactions } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { useAppDispatch } from '../stores/hooks'
import { setTransaction } from '../stores/transactionSlice'

const TableSampleClients = ({transactions, handleSearchClick}) => {
  const { clients } = useSampleClients()
  const dispatch = useAppDispatch()


  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)
  

  const clientsPaginated = transactions.data.slice(perPage * currentPage, perPage * (currentPage + 1))
console.log(clientsPaginated.data)
  let numPages = transactions.data.length / perPage
  
  if (numPages <=1) {
    numPages = 1;
  }

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isModalTrashActive, setIsModalTrashActive] = useState(false)

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalTrashActive(false)
  }

  const setsCurrentPage = (currentP)=> {
    currentP === "next"?   setCurrentPage(currentPage +1) :  setCurrentPage(currentPage - 1)
    dispatch(setTransaction({ pageNumber: currentPage }))
    handleSearchClick()
  }

  const dateFormatter = (dateValue) => {
    const originalDate = new Date('2023-03-18T10:05:15.900+00:00');

    const year = originalDate.getFullYear();
    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    const day = ('0' + originalDate.getDate()).slice(-2);
    const hour = originalDate.getHours() % 12 || 12;
    const minute = ('0' + originalDate.getMinutes()).slice(-2);
    const ampm = originalDate.getHours() >= 12 ? 'PM' : 'AM';
    
    const formattedDate = `${month}/${day}/${year} ${hour}:${minute}${ampm}`;

    return formattedDate
    
  }

  return (
    <>
      <CardBoxModal
        title="Sample modal"
        buttonColor="info"
        buttonLabel="Done"
        isActive={isModalInfoActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <CardBoxModal
        title="Please confirm"
        buttonColor="danger"
        buttonLabel="Confirm"
        isActive={isModalTrashActive}
        onConfirm={handleModalAction}
        onCancel={handleModalAction}
      >
        <p>
          Lorem ipsum dolor sit amet <b>adipiscing elit</b>
        </p>
        <p>This is sample modal</p>
      </CardBoxModal>

      <table>
        <tbody>
          {clientsPaginated.map((client: Transactions) => (
            <tr key={client.requestId}>
              
              <td data-label="Name">{client.accountName} {client.paymentType}</td>

              <td data-label="Created" className="lg:w-1 whitespace-nowrap">
                <p className="text-gray-700 dark:text-slate-600">{dateFormatter(client.date)}<br></br> {client.currency}{client.amount}</p>
              </td>
              <td className="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color = {client.paymentType === 'BILL' ? 'danger' : 'success'}
                    icon={client.paymentType === 'BILL' ? mdiArrowBottomRight : mdiArrowBottomLeft }
                    
                    onClick={() => setIsModalInfoActive(true)}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          {/* <BaseButtons>
            
              <BaseButton
                key={1}
                active={true}
                label="next"
                color="info"
                small
                onClick={() => setsCurrentPage("next")}
              />

               <BaseButton
                key={2}
                active={true}
                label="next"
                color="info"
                small
                onClick={() => setsCurrentPage("prev")}
              />
           
          </BaseButtons> */}
          {/* <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small> */}
        </div>
      </div>
    </>
  )
}

export default TableSampleClients
