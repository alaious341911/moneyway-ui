import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiMenu, mdiUpload } from '@mdi/js'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import Image from 'next/image'
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
import {useAppDispatch, useAppSelector} from '../stores/hooks'
import type {FundWalletForm} from '../interfaces'
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import * as Yup from 'yup';
  import {cardBoxStyle, dashBoardField, dashboardFormPText, dashboardHeading, submitButton, submitButtonDashboard} from  '../styles';

const MenuPage = () => {
    const CREATE_MENU_ENDPOINT = "/api/v1/menus";
    
    
    const [errMsg, setErrMsg] = useState('');
    const [token, setAppToken] = useState('');

    const fundWalletValue: FundWalletForm ={
      amount: '',
      bank: '',
      pin: '',
      description: '',

    }

    useEffect(() => {
      setAppToken(localStorage.getItem("token"));
    }, [])


  return (
    <>
      <Head>
        <title>{getPageTitle('Create-Menu')}</title>
      </Head>
      
        
        <SectionTitle ><p style={dashboardHeading}>Fund Wallet</p></SectionTitle>
        
        <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
      <SectionMain>
       
        <CardBoxGeneral>
        <ToastContainer />
         <Formik 
            initialValues={fundWalletValue}
            validationSchema={Yup.object({
              amount: Yup.string()
                .required('Required'),
             bank: Yup.string()
                .required('Required'),
                pin: Yup.string()
                .required('Required'),
                description: Yup.string()
                .required('Required'),
              
            
            })}
            onSubmit= {(values, {setSubmitting}) => console.log(values)}
          >
            
            <Form>
              <FormField label="Amount">
                <Field className='' style={dashBoardField}  type="text" name="amount" placeholder="Enter an amount" />
               </FormField>

               <FormField label="Bank">
                <select style={dashBoardField}  name="bank" >
                    <option disabled>Select</option>
                    <option>First Bank</option>
                    <option>Guarranty Trust Bank</option>
                    <option>Polaris Bank</option>
                    </select>
               </FormField>

               <FormField label="Pin">
                <Field style={dashBoardField}  type="text" name="pin" placeholder="Enter pin" />
                 </FormField>

                 <FormField label="Description">
                <Field className='' style={dashBoardField}  type="text" name="description" placeholder="Write a short description" />
               </FormField>


              <BaseDivider />
             
              <BaseButtons>
                <button type='submit' style={submitButton}>Submit</button>
              </BaseButtons>
            </Form>
          </Formik>
            
        </CardBoxGeneral>
      </SectionMain>
      </div>
      
    </>
  )
}

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default MenuPage
