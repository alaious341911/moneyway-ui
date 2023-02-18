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
    dashboardHeading, submitButton, submitButtonDashboard} from  '../styles';
    import PayBillTable from '../components/PayBillTable'

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
      
        {/* <SectionTitleLineWithoutButton icon={mdiMenu} title="Buy Airtime on-the-go!" main>  
        </SectionTitleLineWithoutButton> */}
        
        <SectionTitle ><p style={dashboardHeading}>Pay Bills</p></SectionTitle>
        
        <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
      <SectionMain>
       
        <CardBoxGeneral>
        <ToastContainer />
        <PayBillTable /> 
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
