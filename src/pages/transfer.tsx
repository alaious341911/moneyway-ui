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
import type {FundWalletForm} from '../interfaces'
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import * as Yup from 'yup';
  import {cardBoxStyle, dashBoardField, dashboardFormPText,
     dashboardHeading, submitButton, submitButtonDashboard, tabCss, tabBlock, activeTab} from  '../styles';
     import FundWalletTable from '../components/FundWalletTable'

const MenuPage = () => {
    const CREATE_MENU_ENDPOINT = "/api/v1/menus";
    
    
    const [errMsg, setErrMsg] = useState('');
    const [token, setAppToken] = useState('');
    const [toggleState, setToggleState] = useState(1);

    const fundWalletValue: FundWalletForm ={
      amount: '',
      bank: '',
      pin: '',
      description: '',

    }

    const toggleTab = (index)  => {
        console.log(index);
        setToggleState(index);
    };

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
      
       
        <SectionTitle ><p style={dashboardHeading}>Transfer</p></SectionTitle>
        
        <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
      <SectionMain>
       
        <CardBoxGeneral>
        <ToastContainer />
        
      <div className="px-2 mb-4">
  <div className="flex -mx-2">
    <div className="w-1/3 px-1">
      <div 
       className={toggleState === 1 ? 'border-4 border-white border-b-indigo-600' : 'border-4 border-white border-b-gray-400'}
       onClick={() => toggleTab(1)}
      >Local Transfer</div>
    </div>
    <div className="w-1/3 px-1">
      <div
       className={toggleState === 2 ? 'border-4 border-white border-b-indigo-600' : 'border-4 border-white border-b-gray-400'}
       onClick={() => toggleTab(2)}
      >Other Bank Transfer</div>
      
    </div>
    <div className="w-1/3 px-1">
      <div 
       className={toggleState === 3 ? 'border-4 border-white border-b-indigo-600' : 'border-4 border-white border-b-gray-400'}
       onClick={() => toggleTab(3)}
      >Beneficiaries</div>
    </div>
  </div>
</div>
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
            onSubmit= {(values, {setSubmitting}) => handleCreateMenu(values, {setSubmitting})}
          >
            
           
                
                <Form>
                {toggleState === 1 &&(
                    <>
              <FormField label="Email">
                <Field className='' style={dashBoardField}  type="email" name="email" placeholder="Enter email address" />
               </FormField>

               <FormField label="Amount">
                <Field className='' style={dashBoardField}  type="text" name="amount" placeholder="Enter an amount" />
               </FormField>
               

               <FormField label="Pin">
                <Field style={dashBoardField}  type="text" name="pin" placeholder="Enter pin" />
                 </FormField>

                 <FormField label="Description">
                <Field className='' style={dashBoardField}  type="text" name="description" placeholder="Write a short description" />
               </FormField>

               <p  style={dashboardFormPText}><a href='#'>Save as beneficiary</a></p>

              <BaseDivider />
             
              <BaseButtons>
                <button type='submit' style={submitButton}>Submit</button>
              </BaseButtons>
              </>
              ) }

{toggleState === 2 &&(
                    <>

               <FormField label="Bank">
                <select style={dashBoardField}  name="bank" >
                    <option disabled aria-readonly>Select</option>
                    <option>First Bank</option>
                    <option>Guarranty Trust Bank</option>
                    <option>Polaris Bank</option>
                    </select>
               </FormField>

               <FormField label="Amount">
                <Field className='' style={dashBoardField}  type="text" name="amount" placeholder="Enter an amount" />
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
              </>
              ) }

{toggleState === 3 &&(
                   <FundWalletTable />
              ) }

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
