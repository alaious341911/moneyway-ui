import { mdiAccount, mdiBallotOutline, mdiClose, mdiGithub, mdiMail, mdiMenu, mdiUpload } from '@mdi/js'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import Head from 'next/head'
import { ReactElement, useState, useEffect } from 'react'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBoxGeneral from '../components/CardBoxGeneral'
import FormCheckRadio from '../components/FormCheckRadio'
import FormField from '../components/FormField'
import FormFilePicker from '../components/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitle from '../components/SectionTitle'
import SectionTitleLineWithoutButton from '../components/SectionTitleLineWithoutButton'
import { getPageTitle } from '../config'
import axios, { decodeErrorStatus } from '../stores/hooks'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import type {LocalTransfer, ThirdPartyTransfer } from '../interfaces'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'
import {
  cardBoxStyle,
  confirmationTextBig,
  confirmationTextBigLight,
  confirmationTextSmall,
  dashBoardField,
  dashboardFormPText,
  dashboardHeading,
  submitButton,
  transferIntroBox,
  transferIntroText,
} from '../styles'
import FundWalletTable from '../components/FundWalletTable'
import CardBoxModal from '../components/CardBoxModal'
import SelectBankList from '../components/SelectBankList'
import {ClipLoader, MoonLoader } from "react-spinners";
import Image from 'next/image'

const SecuritySettings = () => {

  const [errMsg, setErrMsg] = useState('')
  const [token, setAppToken] = useState('')
  const [toggleState, setToggleState] = useState(1)
  const [headerState, setHeaderState] = useState("Local Transfer")
  
  const [thirdtranferState, setThirdTranferState] = useState({amount: null, account_bank: '', pin: 
  '', description: '', saveBeneficiary : true, bankCode: '', account_number: ''})
 
  
  const [loading, setLoading] = useState(false);
  const [thirdLoading, setThirdLoading] = useState(false);



  useEffect(() => {
    setAppToken(localStorage.getItem('token'))
   
  }, [])


  const errorMessage = {
    color: "red",
    fontSize : "11px",
  }
  const LOCAL_TRANSFER_ENDPOINT = '/api/v1/transfers/local-transfer'
  const THIRDPARTY_TRANSFER_ENDPOINT = '/api/v1/transfers/bank'
  
 
  const localTranferInitialValue: LocalTransfer = {
    amount: null,
    email: '',
    pin: '',
    description: '',
    saveBeneficiary : true,
  }

  const thirdPartyTranferInitialValue: ThirdPartyTransfer = {
    amount: null,
  account_bank: 'Access Bank',
  pin: '',
  description: '',
  bankCode: '',
  account_number : '',
  saveBeneficiary : true
  }

  const toggleTab = (index) => {
    console.log(index)
    setToggleState(index)
    let currentHeader = ""
    switch(index){
      
      case 1 :
       currentHeader = "Change Password"
       break
      case 2 :
       currentHeader = "Change Transaction PIN"
       break
    }

    setHeaderState(currentHeader)
  }


  
  const changePassword = async (values) => {
   
    setLoading(true)
    try {
      
        const response = await axios.post(LOCAL_TRANSFER_ENDPOINT,
            values,
            {
                headers: { 'Content-Type': 'application/json',
                           'Authorization': 'Bearer ' + token
              },
                withCredentials: true
            }
        );
          if(response?.status == 200){
            
           
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
            setLoading(false)
    }
  };


 const changePin = async (values) => {
  console.log(thirdtranferState)
   setThirdLoading(true)
   try {
     
       const response = await axios.post(THIRDPARTY_TRANSFER_ENDPOINT,
           values,
           {
               headers: { 'Content-Type': 'application/json',
                          'Authorization': 'Bearer ' + token
             },
               withCredentials: true
           }
       );
         if(response?.status == 200){
           
          setThirdLoading(false)
           
         }
       
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
           setThirdLoading(false)
   }
 };


  return (
    <>
      <Head>
        <title>{getPageTitle('Security')}</title>
      </Head>

      <SectionTitle>
        <p style={dashboardHeading}>{headerState}</p>
      </SectionTitle>

      <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
        <SectionMain>
          <CardBoxGeneral>
          
         
            <ToastContainer />

            <div className="px-2 mb-4">
              <div className="flex -mx-2">
                <div className="w-1/2 px-1">
                  <div
                    className={
                      toggleState === 1
                        ? 'border-4 border-white border-b-indigo-600'
                        : 'border-4 border-white border-b-gray-400'
                    }
                    onClick={() => toggleTab(1)}
                  >
                   Change Password
                  </div>
                </div>
                <div className="w-1/2 px-1">
                  <div
                    className={
                      toggleState === 2
                        ? 'border-4 border-white border-b-indigo-600'
                        : 'border-4 border-white border-b-gray-400'
                    }
                    onClick={() => toggleTab(2)}
                  >
                    Change Transaction PIN
                  </div>
                </div>
                
              </div>
            </div>
            
                {toggleState === 1 && (
                  
                  <Formik
                  initialValues={localTranferInitialValue}
                  validationSchema={Yup.object({
                   
                    currentPassword: Yup.string().email().required('this is required'),
                    newPassword: Yup.string().required('this is required'),
                    confirmNewPassword: Yup.string().required('this is required'),
                  })}
                  onSubmit={(values, event) => changePassword(values)}
                >
                  <Form>
                  <>
                         
                <div>
                {loading ? <ClipLoader color="#3538CD" size={25} /> : null}
                </div>
                    <FormField label="Current Password">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="password"
                        name="currentPassword"
                        placeholder="Enter current password"
                      />
                    </FormField>
                    <ErrorMessage name="currentPassword">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="New Password">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                      />
                    </FormField>
                    <ErrorMessage name="confirmNewPassword">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="confirm New Password">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="password"
                        name="confirmNewPassword"
                        placeholder="Enter password confirm"
                      />
                    </FormField>
                    <ErrorMessage name="confirmNewPassword">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>


                    <BaseDivider />

                    <BaseButtons>
                      <button type="submit" style={submitButton}>
                        Update Password
                      </button>
                    </BaseButtons>
                  </>
                  </Form>
                  </Formik>
                )}

                {toggleState === 2 && (
                  <Formik
                  initialValues={thirdPartyTranferInitialValue}
                  
                  onSubmit={(values) => changePin(values)}
                >
                  {({ values, setFieldValue }) => (
                  <Form>
                  <>
                  
                <div>
                {thirdLoading ? <ClipLoader color="#3538CD" size={25} /> : null}
                </div>
            
                <FormField label="Old PIN">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="password"
                        name="oldPin"
                        placeholder="Enter current pin"
                      />
                    </FormField>
                    <ErrorMessage name="oldPin">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="New pin">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="password"
                        name="newPin"
                        placeholder="Enter new password"
                      />
                    </FormField>
                    <ErrorMessage name="newPin">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="confirm New PIN">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="password"
                        name="confirmNewPin"
                        placeholder="Enter password confirm"
                      />
                    </FormField>
                    <ErrorMessage name="confirmNewPin">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <BaseDivider />

                    <BaseButtons>
                      <button type="submit" style={submitButton}>
                        Update Transaction PIN
                      </button>
                    </BaseButtons>
                  </>
                  </Form>
                  )}
                  </Formik>
                )}
       </CardBoxGeneral>
        </SectionMain>
      </div>
    </>
  )
}

SecuritySettings.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default SecuritySettings
