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

const FundTransfer = () => {

  const [errMsg, setErrMsg] = useState('')
  const [token, setAppToken] = useState('')
  const [toggleState, setToggleState] = useState(1)
  const [headerState, setHeaderState] = useState("Local Transfer")
  const [localtranferState, setlocalTranferState] = useState({amount: null, email: '', pin: 
  '', description: '', saveBeneficiary : true})

  const [thirdtranferState, setThirdTranferState] = useState({amount: null, account_bank: '', pin: 
  '', description: '', saveBeneficiary : true, bankCode: '', account_number: ''})
  const [isModalInfoActive, setIsModalInfoActive] = useState(false)
  const [isTModalInfoActive, setIsTModalInfoActive] = useState(false)


  const [bankList, setBankList] = useState([])
  const [isBankListFetched, setIsBankListFetched] = useState(false)
  const [showAccountFiled, setShowAccountFiled] = useState(false)
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [thirdLoading, setThirdLoading] = useState(false);
const [validatedAccountName, setValidatedAccountName] = useState('');
const [beneficiaries, setBeneficiares] = useState([])
const [isModalSuccessActive, setIsModalSuccessActive] = useState(false)
const [isThirdModalSuccessActive, setIsThirdModalSuccessActive] = useState(false)

  useEffect(() => {
    setAppToken(localStorage.getItem('token'))
    if (!isBankListFetched && token) {
      fetchBankList()
      fetchBeneficiaries()
      setIsBankListFetched(true)
    }
  }, [isBankListFetched, token])


  const reponseMessage = {
    color: "#3538CD"
  }
    const modalSampleContents = (
        <>
        <div style={transferIntroBox}>
        <p style={transferIntroText}>
        Please confirm transaction details before clicking send as any transaction
made would be at owner’s descretion, it cannot be reversed.
          </p>
          </div>
          
          <div className='mb-5 mt-5'>
          <p  style={confirmationTextSmall}>Email</p>
          <p  style={confirmationTextBigLight}>{localtranferState.email}</p>

         
          <p style={confirmationTextSmall} >Amount</p>
          <p  style={confirmationTextBigLight}>N{localtranferState.amount}</p>
          </div>
         
        </>
      )

      const thirdModalSampleContents = (
        <>
        <div style={transferIntroBox}>
        <p style={transferIntroText}>
        Please confirm transaction details before clicking send as any transaction
made would be at owner’s descretion, it cannot be reversed.
          </p>
          </div>
          <div className='mb-5 mt-5'>
          <p  style={confirmationTextSmall}>Bank Name</p>
          <p  style={confirmationTextBigLight}>{thirdtranferState.account_bank}</p>

         
          
          <p style={confirmationTextSmall}>Account Number</p>
          <p  style={confirmationTextBigLight}>{thirdtranferState.account_number}</p>

          <p style={confirmationTextSmall} >Amount</p>
          <p  style={confirmationTextBigLight}>N{thirdtranferState.amount}</p>
          </div>
       
         
        </>
      )

      const successContents = (
        <>
         
        <Image src="success-logo.png" width={50} height={50} alt="success-logo" className="inline" />

        <div className='mb-5 mt-5'>
          <p>
            <b style={confirmationTextBigLight}>Successful</b>
          </p>
          <p style={confirmationTextSmall}>Your local transfer was successful!</p>
          </div>
        </>
      )

      const thirdSuccessContents = (
        <>
         
        <Image src="success-logo.png" width={50} height={50} alt="success-logo" className="inline" />
          
          <div className='mb-5 mt-5'>
          <p>
            <b style={confirmationTextBigLight}>Successful</b>
          </p>
          <p style={confirmationTextSmall}>Your third party transfer was successful!</p>
          </div>
          
        </>
      )

     

  const handleModalAction = () => {
    setIsModalInfoActive(false)
    setIsModalSuccessActive(false)
    
  }

  const handleThirdModalAction = () => {
    setIsTModalInfoActive(false)
    setIsThirdModalSuccessActive(false)
    
  }

 
  const errorMessage = {
    color: "red",
    fontSize : "11px",
  }
  const LOCAL_TRANSFER_ENDPOINT = '/api/v1/transfers/local-transfer'
  const THIRDPARTY_TRANSFER_ENDPOINT = '/api/v1/transfers/bank'
  const GET_BANKLIST_ENDPOINT = '/api/v1/banks'
  const VALIDATE_ACCOUNT_ENDPOINT = 'api/v1/wallet/validate-account'
  const GET_BENEFICIARY_ENDPOINT = '/api/v1/beneficiaries?type=LocalTransfer'

 
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
       currentHeader = "Local Transfer"
       break
      case 2 :
       currentHeader = "Bank Transfer"
       break

      case 3 :
        currentHeader = "Beneficiaries"
        break
    }

    setHeaderState(currentHeader)
  }

  // function handleAccountNumberChange(name, setFieldValue) {
  //   const newValue = event.target.value;
  //   setAccountNumber(newValue);
  //   setFieldValue()

  //   if (newValue.length === 10) {
  //     // Call your method here
  //     validateAccount(newValue, '044')
  //   }
  // }

  const handleAccountNumberChange = (event, fieldName, setFieldValue) => {
    const newValue = event.target.value;
    setFieldValue(fieldName, newValue);
   
    if (newValue.length === 10) {
      //     // Call your method here
           validateAccount(newValue, '044')
         }
  };

  const validateAccount = async (accountNumber, bankCode)  => {
    setLoading(true);
 const validatePayLoad = {"accountNumber": accountNumber, "accountBank": bankCode};
   

    try {
      const response = await axios.post(VALIDATE_ACCOUNT_ENDPOINT,
        validatePayLoad,
          {
              headers: {
                         'Authorization': 'Bearer ' + token
            },
              withCredentials: true
          }
      );
        if(response?.status == 200){
          const account_name = response.data.data.account_name;
          
          setValidatedAccountName(account_name)
          setLoading(false);
        }
     
      
  } catch (err) {
    if (!err || !err?.response) {
       setErrMsg('No Server Response');
    } 
    else  {
     setErrMsg(decodeErrorStatus(err?.response.status))
       }
    
      setValidatedAccountName("account validation unsuccessfyl")
      setLoading(false);
}
  }


  


  const fetchBankList = async () => {
    
    try {
      const response = await axios.get(GET_BANKLIST_ENDPOINT,
          {
              headers: {
                         'Authorization': 'Bearer ' + token
            },
              withCredentials: true
          }
      );
        if(response?.status == 200){
          console.log(response.data.content)
          const banks = response.data.content;
          
          const mappedOption = banks.map((option) => {
            return { value: option.bankCode, label: option.bankName };
          });
          setBankList(mappedOption)
          console.log(mappedOption)
        }
     
      
  } catch (err) {
    if (!err || !err?.response) {
       setErrMsg('No Server Response');
    } 
    else  {
     setErrMsg(decodeErrorStatus(err?.response.status))
       }
    
       toast("Error fetching bank list. Please check your network!"+err?.response.status);
}
  }

  const fetchBeneficiaries = async () => {
    
    try {
      const response = await axios.get(GET_BENEFICIARY_ENDPOINT,
          {
              headers: {
                         'Authorization': 'Bearer ' + token
            },
              withCredentials: true
          }
      );
        if(response?.status == 200){
         
          setBeneficiares(response.data.data)
          
        }
     
      
  } catch (err) {
    if (!err || !err?.response) {
       setErrMsg('No Server Response');
    } 
    else  {
     setErrMsg(decodeErrorStatus(err?.response.status))
       }
    
       toast("Error fetching bank list. Please check your network!"+err?.response.status);
}
  }

  const handleLocalTransfer = async (values) => {
  
   
     setIsModalInfoActive(true)
     setlocalTranferState(values)
  };

  const submitLocalTransfer = async () => {
   
    setLoading(true)
    const values = localtranferState
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
            
            setIsModalInfoActive(false)
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
  };


  const handleThirdTransfer = (values) => {
  
   
    setIsTModalInfoActive(true)
    setThirdTranferState(values)
 };

 const submitThirdTransfer = async () => {
  console.log(thirdtranferState)
   setThirdLoading(true)
   const values = thirdtranferState
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
           
           setIsTModalInfoActive(false)
         setIsThirdModalSuccessActive(true)
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
           setIsThirdModalSuccessActive(false)
           setThirdLoading(false)
   }
 };


  return (
    <>
      <Head>
        <title>{getPageTitle('Fund-Transfer')}</title>
      </Head>

      <SectionTitle>
        <p style={dashboardHeading}>{headerState}</p>
      </SectionTitle>

      <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
        <SectionMain>
          <CardBoxGeneral>
          <CardBoxModal
        title=""
        buttonColor="lightDark"
        buttonLabel="Cancel"
        isActive={isModalSuccessActive}
        onConfirm={handleModalAction}
      >
        {successContents}
      </CardBoxModal>

      <CardBoxModal
        title=""
        buttonColor="lightDark"
        buttonLabel="Cancel"
        isActive={isThirdModalSuccessActive}
        onConfirm={handleThirdModalAction}
      >
        {thirdSuccessContents}
      </CardBoxModal>
         
            <ToastContainer />

            <div className="px-2 mb-4">
              <div className="flex -mx-2">
                <div className="w-1/3 px-1">
                  <div
                    className={
                      toggleState === 1
                        ? 'border-4 border-white border-b-indigo-600'
                        : 'border-4 border-white border-b-gray-400'
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Local Transfer
                  </div>
                </div>
                <div className="w-1/3 px-1">
                  <div
                    className={
                      toggleState === 2
                        ? 'border-4 border-white border-b-indigo-600'
                        : 'border-4 border-white border-b-gray-400'
                    }
                    onClick={() => toggleTab(2)}
                  >
                    Other Bank Transfer
                  </div>
                </div>
                <div className="w-1/3 px-1">
                  <div
                    className={
                      toggleState === 3
                        ? 'border-4 border-white border-b-indigo-600'
                        : 'border-4 border-white border-b-gray-400'
                    }
                    onClick={() => toggleTab(3)}
                  >
                    Beneficiaries
                  </div>
                </div>
              </div>
            </div>
            
                {toggleState === 1 && (
                  
                  <Formik
                  initialValues={localTranferInitialValue}
                  validationSchema={Yup.object({
                    amount: Yup.number().required('amount is required'),
                    email: Yup.string().email().required('email field is required'),
                    pin: Yup.string().required('pin is required'),
                    description: Yup.string().required('description is required'),
                  })}
                  onSubmit={(values, event) => handleLocalTransfer(values)}
                >
                  <Form>
                  <>
                          <CardBoxModal
                title="Transaction Confirmation"
                buttonColor="info"
                buttonLabel="Send money"
                isActive={isModalInfoActive}
                onConfirm={submitLocalTransfer}
                onCancel={handleModalAction}
              >
                {modalSampleContents}
                <div>
                {loading ? <ClipLoader color="#3538CD" size={25} /> : null}
                </div>
              </CardBoxModal>
                    <FormField label="Email">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                      />
                    </FormField>
                    <ErrorMessage name="email">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="Amount">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="number"
                        name="amount"
                        placeholder="Enter an amount"
                      />
                    </FormField>
                    <ErrorMessage name="amount">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="Pin">
                      <Field
                        style={dashBoardField}
                        type="text"
                        name="pin"
                        placeholder="Enter pin"
                      />
                     
                    </FormField>
                    <ErrorMessage name="pin">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="Description">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="text"
                        name="description"
                        placeholder="Write a short description"
                      />
                      
                    </FormField>
                    <ErrorMessage name="description">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormCheckRadio type="switch" label="">
                  <Field type="checkbox" name="saveBeneficiary" id="saveBeneficiary" />
                </FormCheckRadio>
                    <p style={dashboardFormPText}>
                      <a href="#">Save as beneficiary</a>
                    </p>

                    <BaseDivider />

                    <BaseButtons>
                      <button type="submit" style={submitButton}>
                        Continue
                      </button>
                    </BaseButtons>
                  </>
                  </Form>
                  </Formik>
                )}

                {toggleState === 2 && (
                  <Formik
                  initialValues={thirdPartyTranferInitialValue}
                  // validationSchema={Yup.object({
                  //   amount: Yup.number().required('this field is required'),
                  //   account_number: Yup.string().required('this field is required'),
                  //   pin: Yup.string().required('Required'),
                  //   description: Yup.string().required('Required'),
                  // })}
                  onSubmit={(values) => handleThirdTransfer(values)}
                >
                  {({ values, setFieldValue }) => (
                  <Form>
                  <>
                  <CardBoxModal
                title="Transaction Confirmation"
                buttonColor="info"
                buttonLabel="Send money"
                isActive={isTModalInfoActive}
                onConfirm={submitThirdTransfer}
                onCancel={handleThirdModalAction}
              >
                {thirdModalSampleContents}
                <div>
                {thirdLoading ? <ClipLoader color="#3538CD" size={25} /> : null}
                </div>
              </CardBoxModal>
                        <SelectBankList  name="bankCode"
                value={values.bankCode}
                setFieldValue={setFieldValue}
                options={bankList}
                setShowAccountFiled={setShowAccountFiled}
                 
              />
              
              {showAccountFiled && (
                <>
                <div>
                {loading ? <MoonLoader color="#3538CD" size={25} /> : null}
                </div>
             
                 <FormField label="Account number">
                 <Field
                   className=""
                   style={dashBoardField}
                   type="text"
                   name="account_number"
                   placeholder="account number"
                   value={values.account_number}
                   
                   onChange={(event) =>
                    handleAccountNumberChange(event, "account_number", setFieldValue)
                  }
                 />
                
                
               </FormField>
               <ErrorMessage name="account_number">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>
               {validatedAccountName.length > 0 && (
               <span style={reponseMessage}>{validatedAccountName}</span>
              )}
               </>
              )}
               

                    <FormField label="Amount">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="number"
                        name="amount"
                        value={values.amount}
                        placeholder="Enter an amount"
                      />
                    </FormField>
                    <ErrorMessage name="amount">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="Pin">
                      <Field
                        style={dashBoardField}
                        type="text"
                        name="pin"
                        value={values.pin}
                        placeholder="Enter pin"
                      />
                    </FormField>
                    <ErrorMessage name="pin">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormField label="Description">
                      <Field
                        className=""
                        style={dashBoardField}
                        type="text"
                        name="description"
                        value={values.description}
                        placeholder="Write a short description"
                      />
                    </FormField>
                    <ErrorMessage name="description">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>

                    <FormCheckRadio type="switch" label="">
                  <Field type="checkbox" name="saveBeneficiary" id="saveBeneficiary" />
                </FormCheckRadio>
                    <p style={dashboardFormPText}>
                      <a href="#">Save as beneficiary</a>
                    </p>

                    <BaseDivider />

                    <BaseButtons>
                      <button type="submit" style={submitButton}>
                        Continue
                      </button>
                    </BaseButtons>
                  </>
                  </Form>
                  )}
                  </Formik>
                )}

                {toggleState === 3 && <FundWalletTable beneficiaries={beneficiaries} />}
              
          </CardBoxGeneral>
        </SectionMain>
      </div>
    </>
  )
}

FundTransfer.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default FundTransfer
