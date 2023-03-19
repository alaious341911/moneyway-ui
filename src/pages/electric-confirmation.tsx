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
  confirmationTextBig,
  confirmationTextBigLight,
  confirmationTextSmall,
  dashboardHeading,
  submitButton,
} from '../styles'
import axios, { decodeErrorStatus } from '../stores/hooks'
import CardBoxModal from '../components/CardBoxModal';
import Image from 'next/image';
import { ClipLoader, MoonLoader } from 'react-spinners';

const ElectricConfirmation = (props ) => {

  const router = useRouter();
  const { amount, phoneNumber, serviceID, variationCode, billersCode, saveBeneficiary } = router.query;

  const BUY_ELECTRICITY_ENDPOINT = "/api/v1/bills/purchase-EKEDC-electricity";

 

  const [errMsg, setErrMsg] = useState('')
  const [token, setAppToken] = useState('')

  
  useEffect(() => {
    setAppToken(localStorage.getItem('token'))
  }, [])

  
  const modalSampleContents = (
    <>
     
    <Image src="success-logo.png" width={50} height={50} alt="success-logo" className="inline" />
      <p>
        <b style={confirmationTextBig}>Successful</b>
      </p>
      <p>Your {serviceID} Electricity Purchase was successful!</p>
      
    </>
  )

  

  const handleModalAction = () => {
    setIsModalSuccessActive(false)
  }
const [isModalSuccessActive, setIsModalSuccessActive] = useState(false)
const [loading, setLoading] = useState(false);

  
   


  const handleSubmit = async () => {
    setLoading(true)
       const values = {"amount": amount, "phoneNumber" : phoneNumber, "serviceID" : serviceID, 
       "billersCode": billersCode, "variationCode": variationCode, "saveBeneficiary": saveBeneficiary}

       console.log(values)
       console.log(token)
    try {
      
        const response = await axios.post(BUY_ELECTRICITY_ENDPOINT,
            values,
            {
                headers: { 'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + token
              },
                withCredentials: true
            }
        );
          if(response?.status == 200){
            
           
          setIsModalSuccessActive(true)
          setLoading(false)
            
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

           
            toast.loading(errMsg, {theme: 'colored', type: "error", isLoading: false,
            closeOnClick: true, position: "top-right",
            autoClose: 3000})
            setIsModalSuccessActive(false)
            setLoading(false)
    }
}

  return (
    <>
      
      <div className="md:w-7/12 shadow-1xl md:mx-auto mt-5 border-white">
        <SectionMain>
          
          <CardBoxGeneral>
         
            <CardBoxModal
        title=""
        buttonColor="lightDark"
        buttonLabel="Cancel"
        isActive={isModalSuccessActive}
        onConfirm={handleModalAction}
      >
        {modalSampleContents}
      </CardBoxModal>
           
         
            <ToastContainer />
           
           
                <div className={`p-20 px-6 lg:px-0 lg:max-w-2xl lg:mx-auto text-center`}>
                <p style={dashboardHeading}>Confirm Transaction</p>
                <BaseDivider />

                <p style={confirmationTextSmall}> Amount</p>
                <p style={confirmationTextBig}>N{amount}</p>

                <div className='mt-5' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Icon path={mdiDownloadCircle} size={4} color="gray" />
               </div>

               <div className='mb-5'>
               <p style={confirmationTextSmall}> To</p>
                <p style={confirmationTextBig}>{billersCode}</p>
               </div>
              

        <table>
        <tbody>
          <tr key={1}>
              <td style={confirmationTextBigLight}>Service Type</td>
              <td className="text-right" style={confirmationTextBigLight}>
               {variationCode}
              </td>
            </tr>
            <tr key={2}>
              <td style={confirmationTextBigLight}>Service Description</td>
              <td className="text-right" style={confirmationTextBigLight}>
                {serviceID}
              </td>
            </tr>
         
        </tbody>
      </table>
      <BaseDivider />

                <BaseButtons>
                <div>
                {loading ? <ClipLoader color="#3538CD" size={25} /> : null}
                </div>
                  <button type="button" style={submitButton} onClick={handleSubmit}>
                    Purchase Electricity
                  </button>
                </BaseButtons>
                </div>

            
          </CardBoxGeneral>
        </SectionMain>
      </div>
    </>
  )
};

ElectricConfirmation.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ElectricConfirmation
