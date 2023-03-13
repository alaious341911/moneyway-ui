import { mdiEye, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../hooks/sampleData'
import { Beneficiary, Client } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'

const FundWalletTable = ({beneficiaries}) => {
  
  const perPage = 5

  const [currentPage, setCurrentPage] = useState(0)

  const clientsPaginated = beneficiaries.slice(perPage * currentPage, perPage * (currentPage + 1))

  const numPages = beneficiaries.length / perPage

  const pagesList = []

  for (let i = 0; i < numPages; i++) {
    pagesList.push(i)
  }

  return (
    <>
     

      <table>
        <tbody>
          {clientsPaginated.map((client: Beneficiary) => (
            <tr key={client.id}>
              <td data-label="Customer">{client.name} <br/>{client.phoneNumber}</td>
              <td data-label="Transaction" className="text-right">
                {client.transactionType}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between py-3 md:py-0">
          <BaseButtons>
            {pagesList.map((page) => (
              <BaseButton
                key={page}
                active={page === currentPage}
                label={page + 1}
                color={page === currentPage ? 'lightDark' : 'whiteDark'}
                small
                onClick={() => setCurrentPage(page)}
              />
            ))}
          </BaseButtons>
          <small className="mt-6 md:mt-0">
            Page {currentPage + 1} of {numPages}
          </small>
        </div>
      </div>
    </>
  )
}

export default FundWalletTable
