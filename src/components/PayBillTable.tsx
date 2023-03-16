import { mdiEye, mdiSendOutline, mdiTrashCan } from '@mdi/js'
import React, { useState } from 'react'
import { useSampleClients } from '../hooks/sampleData'
import { Client } from '../interfaces'
import BaseButton from './BaseButton'
import BaseButtons from './BaseButtons'
import CardBoxModal from './CardBoxModal'
import UserAvatar from './UserAvatar'
import { useRouter } from 'next/router'

const PayBillTable = () => {
  const router = useRouter()

  const internetService = (values) => {
  
     router.push({
      pathname: '/tv-service',
      query: values,
    });
  };

  return (
    <>
      
      <table>
        <tbody>

        <tr key= {2}>
              <td data-label="Name">Internet</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap text-right">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="void"
                    icon={mdiSendOutline}
                    onClick={() => (internetService("internet"))}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>
         
            <tr key= {2}>
              <td data-label="Name">TV</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap text-right">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="void"
                    icon={mdiSendOutline}
                    onClick={() => (internetService("tv"))}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>

            <tr key= {3}>
              <td data-label="Name">Electricity</td>
              <td className="before:hidden lg:w-1 whitespace-nowrap text-right">
                <BaseButtons type="justify-start lg:justify-end" noWrap>
                  <BaseButton
                    color="void"
                    icon={mdiSendOutline}
                    onClick={() => (internetService("electricity"))}
                    small
                  />
                </BaseButtons>
              </td>
            </tr>

            
          
        </tbody>
      </table>
      
    </>
  )
}

export default PayBillTable
