import { mdiAccount, mdiArrowUpDown, mdiBallotOutline, mdiDownloadCircle, mdiGithub, mdiMail, mdiMenu, mdiUpload } from '@mdi/js'
import { Icon } from '@mdi/react';
import { Field, Form, Formik, ErrorMessage } from 'formik'
import Head from 'next/head'
import { ReactElement, useState, useEffect } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBoxGeneral from '../components/CardBoxGeneral'
import FormCheckRadio from '../components/FormCheckRadio'
import FormCheckRadioGroup from '../components/FormCheckRadioGroup'
import FormField from '../components/FormField'
import FormFilePicker from '../components/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitle from '../components/SectionTitle'
import SectionTitleLineWithoutButton from '../components/SectionTitleLineWithoutButton'
import { getPageTitle } from '../config'
import axios, { decodeErrorStatus } from '../stores/hooks'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import type { AirtimeForm, InternetForm, InternetPayloadObject } from '../interfaces'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import {
  cardBoxStyle,
  dashBoardField,
  dashboardFormPText,
  dashboardHeading,
  dashBoardHText,
  submitButton,
  submitButtonDashboard,
  textInput,
} from '../styles'
import MySelect from '../components/MySelect'
import { render } from 'react-dom';
import { withFormik } from 'formik';
import PayBillTable from '../components/PayBillTable';
import FundWalletTable from '../components/FundWalletTable';
import SelectData from '../components/SelectData';
import SelectDataVariation from '../components/SelectDataVariation';
import { setServiceId } from '../stores/internetSlice'



const InternetService = (props ) => {

  const GET_DATAVARIATTION_ENDPOINT = "/api/v1/bills/data-Variations/";
  const BUY_DATA_ENDPOINT = "/api/v1/bills/buy-data/";
  
    const dispatch = useAppDispatch()
    const IserviceState = useAppSelector((state) => state.internet.serviceId)
  const router = useRouter()

  const styles = {
    formCheckInputChecked: {
      '& + .form-check-label:before': {
        backgroundColor: 'green',
      },
    },
  }

  const [errMsg, setErrMsg] = useState('')
  const [token, setAppToken] = useState('')
  const [cValues, setCValues] = useState(false);
  const[vstate, setVarationData] = useState([])
  const [showFields, setHow] = useState(false);
  

  

  const internetValue: InternetForm = {
    serviceID: '',
    variationCode: '',
       billersCode: "08033367789",
        amount: "200",
        phoneNumber: "08011111111",
        pin: "1234",
        saveBeneficiary: true
   
  }

  const options = [
    { value: 'mtn', label: 'MTN Data' },
    { value: 'glo', label: 'Glo Data' },
    { value: 'airtel', label: 'Airtel Data' },
    { value: 'etisalat', label: '9Mobile Data' }
  ];
  useEffect(() => {
    setAppToken(localStorage.getItem('token'))

    const ppt: InternetPayloadObject = {
        serviceId: [{}],
        // Add any additional properties from the interface as needed
      };
    dispatch(setServiceId(ppt))
    console.log(IserviceState)

    console.log(vstate)
  }, [vstate])

  
  const fetchDataVariation = async (dataType) => {
    
    try {
      const response = await axios.get(GET_DATAVARIATTION_ENDPOINT+dataType,
          {
              headers: {
                         'Authorization': 'Bearer ' + token
            },
              withCredentials: true
          }
      );
        if(response?.status == 200){
          console.log(response.data.data.content.varations)
          const variations = response.data.data.content.varations;
          setCValues(true)
          const mappedOption = variations.map((option) => {
            return { value: option.variation_code, label: option.name };
          });
          setVarationData(mappedOption)
         //setVarationData(variations)
         console.log(vstate)
         
        }
     console.log(JSON.stringify(response?.data.content));
      
  } catch (err) {
    if (!err || !err?.response) {
       setErrMsg('No Server Response');
    } 
    else  {
     setErrMsg(decodeErrorStatus(err?.response.status))
       }
    
       toast("Error fetching data variations. Please check your network!");
}
  }
  const handleSubmit = async (values) => {
    const id = toast.loading("Proccessing...", {theme: 'light'})
    const customId = "buy-data-id";
   
    console.log(values)
    console.log(token)
 try {
   
     const response = await axios.post(BUY_DATA_ENDPOINT,
         values,
         {
             headers: { 'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
           },
             withCredentials: true
         }
     );
       if(response?.status == 200){
         
         toast.update(id, { render: "Your Data purchase is successful!", type: "success", 
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
  
    console.log(values);
  };

 

  return (
    <>
      <Head>
        <title>{getPageTitle('Create-Menu')}</title>
      </Head>

      <SectionTitle>
        <p style={dashboardHeading}>Internet & Data Service</p>
      </SectionTitle>

      <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
        <SectionMain>
          <CardBoxGeneral>
            <ToastContainer />
            <p style={dashboardFormPText}>
              <a href="#">Beneficiaries</a>
            </p>
            <Formik
            initialValues={internetValue}
            onSubmit={(values) => handleSubmit(values)}
            
            >

{({ values, setFieldValue }) => (
  
              <Form>
               

<SelectData  name="serviceID"
            value={values.serviceID}
            setFieldValue={setFieldValue}
            fetchDataVariation = {fetchDataVariation}
           options={options}
           
           
          />

          {cValues && (
           <SelectDataVariation  name="variationCode"
           value={values.variationCode}
           setFieldValue={setFieldValue}
          options={vstate}
          
         />
          )}

            {showFields && (
  <>
  <FormCheckRadio type="switch" label="">
                  <Field type="checkbox" name="saveBeneficiary" id="saveBeneficiary" />
                </FormCheckRadio>
                <p style={dashboardFormPText}>
                  <a href="#">Save as beneficiary</a>
                </p>
<Field name="amount" id="amount" />
<Field name="billersCode" id="billersCode" />
<Field name="phoneNumber" id="phoneNumber" />
<Field name="pin" id="pin" />
</>
)}




                <BaseDivider />

                <BaseButtons>
                  <button type="submit" style={submitButton}>
                    Continue
                  </button>
                </BaseButtons>
              

              </Form>
              
              )}
              </Formik>
          </CardBoxGeneral>
        </SectionMain>
      </div>
    </>
  )
};

InternetService.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default InternetService
