import { mdiAccount, mdiArrowUpDown, mdiBallotOutline, mdiDownloadCircle, mdiGithub, mdiMail, mdiMenu, mdiUpload } from '@mdi/js'
import { Icon } from '@mdi/react';
import { Field, Form, Formik, ErrorMessage } from 'formik'
import Head from 'next/head'
import { ReactElement, useState, useEffect } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBoxGeneral from '../components/CardBoxGeneral'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import {
  dashboardHeading,
  submitButton,
} from '../styles'
import axios, { decodeErrorStatus } from '../stores/hooks'

const AirtimeConfirmation = (props ) => {

    const router = useRouter();
  const { amount, phoneNumber, serviceId } = router.query;

  
  const BUY_AIRTIME_ENDPOINT = '/api/v1/bills/buy-airtime'

 

  const [errMsg, setErrMsg] = useState('')
  const [token, setAppToken] = useState('')

  
  useEffect(() => {
    setAppToken(localStorage.getItem('token'))
  }, [])

  const handleSubmit = async () => {
    const id = toast.loading("Proccessing...", {theme: 'light'})
       const customId = "buy-airtime-id";
       const values = {"amount": amount, "phoneNumber" : phoneNumber, "serviceId" : serviceId}

       console.log(values)
       console.log(token)
    try {
      
        const response = await axios.post(BUY_AIRTIME_ENDPOINT,
            values,
            {
                headers: { 'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + token
              },
                withCredentials: true
            }
        );
          if(response?.status == 200){
            
            toast.update(id, { render: "Your MTN recharge is successful!", type: "success", 
          toastId: customId, theme: "colored", isLoading: false,
           closeOnClick: true, position: "top-right",
           autoClose: 1000, });
            
          }
        console.log(JSON.stringify(response?.status));
        console.log(JSON.stringify(response?.data));
        
    } catch (err) {
         if (!err?.response) {
            setErrMsg('No Server Response');
         } 
         else  {
          setErrMsg(decodeErrorStatus(err?.response.status))
            }

            toast.update(id, { render: errMsg, type: "error", 
            toastId: customId, theme: "colored", isLoading: false,
            closeOnClick: true, position: "top-right",
            autoClose: 3000});
    }
}

  return (
    <>
      
      <div className="md:w-7/12 shadow-1xl md:mx-auto mt-5 border-white">
        <SectionMain>
          <CardBoxGeneral>
            <ToastContainer />
           
           
                <div className={`p-20 px-6 lg:px-0 lg:max-w-2xl lg:mx-auto text-center`}>
                <p style={dashboardHeading}>Confirm Transaction</p>
                <BaseDivider />

                <p > Amount</p>
                <p>N{amount}</p>

                <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Icon path={mdiDownloadCircle} size={4} color="gray" />
               </div>

               <div className='mb-5'>
               <p > To</p>
                <p>{phoneNumber}</p>
               </div>
              

        <table>
        <tbody>
          <tr key={1}>
              <td data-label="Name" style={{fontSize : "16px"}}>Description</td>
              <td data-label="Company" className="text-right" style={{fontSize : "16px"}}>
                Airtime Recharge
              </td>
            </tr>
            <tr key={2}>
              <td data-label="Name" style={{fontSize : "16px"}}>Network</td>
              <td data-label="Company" className="text-right" style={{fontSize : "16px"}}>
                {serviceId}
              </td>
            </tr>
         
        </tbody>
      </table>
      <BaseDivider />

                <BaseButtons>
                  <button type="button" style={submitButton} onClick={handleSubmit}>
                    Buy Airtime
                  </button>
                </BaseButtons>
                </div>

            
          </CardBoxGeneral>
        </SectionMain>
      </div>
    </>
  )
};

AirtimeConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default AirtimeConfirmation
