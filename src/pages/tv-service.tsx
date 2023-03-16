import axios from '../stores/hooks'
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import BaseButtons from "../components/BaseButtons";
import BaseDivider from "../components/BaseDivider";
import CardBoxGeneral from "../components/CardBoxGeneral";
import FormCheckRadio from "../components/FormCheckRadio";
import FormField from "../components/FormField";
import SectionMain from "../components/SectionMain";
import SectionTitle from "../components/SectionTitle";
import SelectData from "../components/SelectData";
import SelectTv from "../components/SelectTv";
import SelectTvVariation from "../components/SelectTvVariation";
import { getPageTitle } from "../config";
import { TvForm, TvPayloadObject } from "../interfaces";
import LayoutAuthenticated from "../layouts/Authenticated";
import { decodeErrorStatus, useAppDispatch } from "../stores/hooks";
import { dashBoardField, dashboardFormPText, dashboardHeading, submitButton } from "../styles";


const TvService = (props ) => {

    const GET_TVVARIATTION_ENDPOINT = "/api/v1/bills/tv-variations/";
    const VERIFY_CABLETV_ENDPOINT = "api/v1/bills/verify-cabletv";


    const dispatch = useAppDispatch();

    const router = useRouter();

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


    const tvValue: TvForm = {
        decoderName: '',
        decoderOrSmartCardNumber: '',
        subscriptionPackage: '',
        amount: '',
        pin: '',
        phone: '',
        numberOfMonthlySubscription: '',
        subscriptionType: '',
        saveBeneficiary: false,
    }


    const options = [
        { value: 'dstv', label: 'DSTV', icon: 'dstv-logo.png' },
        { value: 'gotv', label: 'GOTV', icon: 'gotv-logo.png' },
        { value: 'startimes', label: 'STARTIMES', icon: 'startimes-logo.jpeg' },
        { value: 'showmax', label: 'SHOWMAX', icon: 'showmax-logo.png' },
        
      ];

      useEffect(() => {
        setAppToken(localStorage.getItem('token'))
    
        const ppt: TvPayloadObject = {
            serviceId: [{}],
            // Add any additional properties from the interface as needed
          };
        //  dispatch(setServiceId(ppt))
        
        console.log(vstate)
      }, [vstate])


      const fetchTvVariation = async (dataType) => {
        try {
            const response = await axios.get(GET_TVVARIATTION_ENDPOINT+dataType,
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
                setPayLoad(variations);
               //setVarationData(variations)
               console.log(vstate)
               console.log(originalPayload)
               
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

      const handleSubmit = (values) => {
  
        console.log(values);
        router.push({
          pathname: '/tv-confirmation',
          query: values,
        });
      };



      return(
        <>
         <head>
            <title>{getPageTitle('Tv service')}</title>
         </head>

         <SectionTitle>
         <p style={dashboardHeading}>TV Service</p>
         </SectionTitle>

         <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
        <SectionMain>
          <CardBoxGeneral>
            <ToastContainer />
            <p style={dashboardFormPText}>
              <a href="#">Beneficiaries</a>
            </p>
            <Formik
            initialValues={tvValue}
            onSubmit={(values) => handleSubmit(values)}
            
            >

{({ values, setFieldValue }) => (
  
              <Form>
               

<SelectTv  name="subscriptionType"
            value={values.subscriptionType}
            setFieldValue={setFieldValue}
            fetchTvVariation = {fetchTvVariation}
           options={options}
           
           
          />

          {cValues && (
            <>
           <SelectTvVariation  name="subscriptionPackage"
           value={values.subscriptionPackage}
           setFieldValue={setFieldValue}
          options={vstate}
          originalPayload = {originalPayload}
          amount = "amount"
          
         />

         
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
               <FormField label="Smart Card Number">
                 <Field
                   className=""
                   style={dashBoardField}
                   type="text"
                   name="decoderOrSmartCardNumber"
                   placeholder="smart card number"
                   value={values.decoderOrSmartCardNumber}
                 />

                 
                
               </FormField>

               <FormField label="Transaction pin">
                 <Field
                   className=""
                   style={dashBoardField}
                   type="text"
                   name="pin"
                   placeholder="pin"
                   value={values.pin}
                 />

                 
                
               </FormField>
         </>
          )}

            {showFields && (
  <>
  <FormCheckRadio type="switch" label="">
                  <Field type="checkbox" name="saveBeneficiary" id="saveBeneficiary" />
                </FormCheckRadio>
                <p style={dashboardFormPText}>
                  <a href="#">Save as beneficiary</a>
                </p>

<Field name="billersCode" id="billersCode" />

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

TvService.getLayout = function getLayout(page: ReactElement) {
    return <LayoutAuthenticated>{page}</LayoutAuthenticated>        

}
export default TvService