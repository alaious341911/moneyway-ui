import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiMenu, mdiUpload } from '@mdi/js'
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
import axios from '../stores/hooks'
import {useAppDispatch, useAppSelector, decodeErrorStatus} from '../stores/hooks'
import type {AirtimeForm} from '../interfaces'
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import * as Yup from 'yup';
  import {cardBoxStyle, dashBoardField, dashboardFormPText, dashboardHeading, submitButton} from  '../styles';

const MenuPage = () => {
    const CREATE_MENU_ENDPOINT = "/api/v1/menus";
    
    
    const [errMsg, setErrMsg] = useState('');
    const [token, setAppToken] = useState('');

    const airTimeValue: AirtimeForm ={
      amount: '',
      network: '',
      phoneNumber: '',
    }

    useEffect(() => {
      setAppToken(localStorage.getItem("token"));
    }, [])



    const handleCreateMenu = async (values, {setSubmitting}) => {
      try {
          const response = await axios.post(CREATE_MENU_ENDPOINT,
              values,
              {
                  headers: { 'Content-Type': 'application/json',
                             'Authorization': 'Bearer ' + token
                },
                  withCredentials: true
              }
          );
            if(response?.status == 200){
              
              toast("Menu item added!");
              
            }
          console.log(JSON.stringify(response?.status));
          
      } catch (err) {
           if (!err?.response) {
              setErrMsg('No Server Response');
           } 
           else  {
            setErrMsg(decodeErrorStatus(err?.response.status))
              }
  
          toast(errMsg || "Unknown error")
      }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Create-Menu')}</title>
      </Head>

      <SectionMain>
        <div style={dashboardHeading}>
        <SectionTitleLineWithoutButton icon={mdiMenu} title="Buy Airtime on-the-go!" main>  
        </SectionTitleLineWithoutButton>
        </div>
        
         
         <div style={cardBoxStyle}>
        <CardBoxGeneral>
        <ToastContainer />
        <p  style={dashboardFormPText}><a href='#'>Beneficiaries</a></p>
          <Formik
            initialValues={airTimeValue}
            validationSchema={Yup.object({
              phoneNumber: Yup.string()
                .required('Required'),
             network: Yup.string()
                .required('Required'),
                amount: Yup.string()
                .required('Required'),
              
            
            })}
            onSubmit= {(values, {setSubmitting}) => handleCreateMenu(values, {setSubmitting})}
          >
            <Form>
              <FormField label="Amount">
                <Field style={dashBoardField}  type="text" name="amount" placeholder="Enter an amount" />
                <ErrorMessage name="amount" />
               </FormField>

               <FormField label="Network">
                <select style={dashBoardField}  name="amount" >
                    <option>MTN</option>
                    <option>Airtel</option>
                    <option>Etisalat</option>
                    </select>
                <ErrorMessage name="amount" />
               </FormField>

               <FormField label="Phone Number">
                <Field style={dashBoardField}  type="text" name="phoneNumber" placeholder="Enter a phone number" />
                <ErrorMessage name="phoneNumber" />
               </FormField>

               <p  style={dashboardFormPText}><a href='#'>Save as beneficiary</a></p>

              <BaseDivider />
             
              <BaseButtons>
                <button type='submit' style={submitButton}>Submit</button>
              </BaseButtons>
            </Form>
          </Formik>

 
        </CardBoxGeneral>
        </div>
      </SectionMain>

      
    </>
  )
}

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default MenuPage
