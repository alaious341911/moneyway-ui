import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiMenu, mdiUpload, mdiWalletOutline } from '@mdi/js'
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
import axios, { decodeErrorStatus } from '../stores/hooks'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import type { FundWalletForm } from '../interfaces'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'
import {
  cardBoxStyle,
  dashBoardField,
  dashboardFormPText,
  dashboardHeading,
  submitButton,
  submitButtonDashboard,
} from '../styles'
import CardBoxWidget from '../components/CardBoxWidget'

const MenuPage = () => {
  const CREATE_MENU_ENDPOINT = '/api/v1/menus'

  const [errMsg, setErrMsg] = useState('')
  const [token, setAppToken] = useState('')
  const[balance, setBalance] = useState(0);
  const[accountNumber, setAccountNumber] = useState('');
  
  const GET_BALANCE_ENDPOINT = '/api/v1/wallet/view_balance';

  const fundWalletValue: FundWalletForm = {
    amount: '',
    bank: '',
    pin: '',
    description: '',
  }

  useEffect(() => {
    setAppToken(localStorage.getItem('token'))
    fetchBalance()
  }, [])

  const fetchBalance = async()=> {
    
    try {
     
      const response = await axios.get(GET_BALANCE_ENDPOINT, 
        {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
          withCredentials: true
      });
         if(response?.status == 200 || response?.status==201){
          console.log(response?.data)
          setBalance(response?.data.data.balance);
          setAccountNumber(response?.data.data.accountNumber);
        }
           
    }catch (err) {
    if (!err || !err?.response) {
       setErrMsg('No Server Response');
    } 
    else  {
     setErrMsg(decodeErrorStatus(err?.response.status))
       }
       toast("Error fetching balance info. Please check your network!");
  }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Create-Menu')}</title>
      </Head>

      <SectionTitle>
        <p style={dashboardHeading}>Fund Wallet</p>
      </SectionTitle>

      <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
        <SectionMain>
          <CardBoxGeneral>
            <ToastContainer />
            <div>
              <p>To fund your wallet, send money to the account details below.</p>
              <CardBoxWidget
                //trendLabel="12%"
                trendType="up"
                trendColor="white"
                icon={mdiWalletOutline}
                iconColor="white"
                number={balance}
                label="Account State:"
                bankName="Wema bank"
                accountNumber={accountNumber}
                cardBoxColor="bg-[#3538CD] border-radius[24px]"
                cardBoxLight="yes"
              />
            </div>
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
