import { Field, Form, Formik, ErrorMessage } from 'formik'
import Head from 'next/head'
import { ReactElement, useState, useEffect } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBoxGeneral from '../components/CardBoxGeneral'
import FormCheckRadio from '../components/FormCheckRadio'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitle from '../components/SectionTitle'
import SectionTitleLineWithoutButton from '../components/SectionTitleLineWithoutButton'
import { getPageTitle } from '../config'
import axios, { decodeErrorStatus } from '../stores/hooks'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import type { AirtimeForm, ElectricityForm, InternetForm, InternetPayloadObject } from '../interfaces'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import {
  dashBoardField,
  dashboardFormPText,
  dashboardHeading,
  submitButton,
} from '../styles'
import SelectData from '../components/SelectData';
import SelectDataVariation from '../components/SelectDataVariation';
import { setServiceId } from '../stores/internetSlice'
import FormField from '../components/FormField'
import SelectElectric from '../components/SelectElectric'
import { MoonLoader } from 'react-spinners'



const InternetService = (props ) => {


  const errorMessage = {
    color: "red",
    fontSize : "11px",
  }
  const reponseMessage = {
    color: "#3538CD"
  }

  const VERIFY_ELECTRICITY_METER_ENDPOINT = "api/v1/bills/verify-account";

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
  const [originalPayload, setPayLoad] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validatedAccountName, setValidatedAccountName] = useState('');

  

  

  const internetValue: ElectricityForm = {
    serviceID: '',
    variationCode: 'prepaid',
       billersCode: "",
        amount: "",
        phoneNumber: "",
        saveBeneficiary: true
   
  }

  const options = [
    { value: 'eko-electric', label: 'Eko Electric Distribution Company', icon: 'eko-logo.jpeg' },
    ];
  useEffect(() => {
    setAppToken(localStorage.getItem('token'))

    const ppt: InternetPayloadObject = {
        serviceId: [{}],
        // Add any additional properties from the interface as needed
      };
    dispatch(setServiceId(ppt))
    
    console.log(vstate)
  }, [vstate])

  
const handleSubmit = (values) => {
  
  console.log(values);
  router.push({
    pathname: '/electric-confirmation',
    query: values,
  });
};

 const handleAccountNumberChange = (event, fieldName, setFieldValue) => {
        const newValue = event.target.value;
        setFieldValue(fieldName, newValue);
       
        if (newValue.length === 13) {
          //     // Call your method here
               validateAccount(newValue, 'prepaid', 'eko-electric')
             }
      };
    
      const validateAccount = async (meterNumber, type, serviceId)  => {
        setLoading(true);
     const validatePayLoad = {"billersCode": meterNumber, "type": type, "serviceID" : serviceId};
       
    
        try {
          const response = await axios.post(VERIFY_ELECTRICITY_METER_ENDPOINT,
            validatePayLoad,
              {
                  headers: {
                             'Authorization': 'Bearer ' + token
                },
                  withCredentials: true
              }
          );
            if(response?.status == 200){
              
              const account_name = response.data.content.Customer_Name;
              
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
        
          setValidatedAccountName("meter number validation unsuccessful")
          setLoading(false);
          
    }
      }

 

  return (
    <>
      <Head>
        <title>{getPageTitle('Buy Electricity')}</title>
      </Head>

      <SectionTitle>
        <p style={dashboardHeading}>Electricity Purchase</p>
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
               

<SelectElectric  name="serviceID"
            value={values.serviceID}
            setFieldValue={setFieldValue}
            options={options}
           
           
          />

         
               <FormField label="Variation Code">
                  <select style={dashBoardField} name="variationCode">
                    <option value={values.variationCode}>Prepaid</option>
                  </select>
                </FormField>
         
<FormField label="Amount">
                 <Field
                   className=""
                   style={dashBoardField}
                   type="text"
                   name="amount"
                   placeholder="amount"
                   value={values.amount}
                 />
                
               </FormField>
               <FormField label="Phone number">
                 <Field
                   className=""
                   style={dashBoardField}
                   type="text"
                   name="phoneNumber"
                   placeholder="phone number"
                   value={values.phoneNumber}
                 />
                
               </FormField>

               <div>
                {loading ? <MoonLoader color="#3538CD" size={25} /> : null}
                </div>
                {validatedAccountName.length > 0 && (
               <span style={reponseMessage}>{validatedAccountName}</span>
              )}
               <FormField label="Meter number">
                 <Field
                   className=""
                   style={dashBoardField}
                   type="text"
                   name="billersCode"
                   placeholder="meter number"
                   value={values.billersCode}

                   onChange={(event) =>
                    handleAccountNumberChange(event, "billersCode", setFieldValue)
                  }
                 />
                
               </FormField>
               <ErrorMessage name="account_number">{msg => <span style={errorMessage}>{msg}</span>}</ErrorMessage>
               
       
  <FormCheckRadio type="switch" label="" className='mt-5'>
                  <Field type="checkbox" name="saveBeneficiary" id="saveBeneficiary" />
                </FormCheckRadio>
                <p style={dashboardFormPText}>
                  <a href="#">Save as beneficiary</a>
                </p>
                {showFields && (
  <>
<Field name="billersCode" id="billersCode" />
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
