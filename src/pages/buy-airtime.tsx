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
import axios from '../stores/hooks'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import type { AirtimeForm } from '../interfaces'
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


const BuyAirtime = (props ) => {
  
  
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
  //const [cValues, setCValues] = useState({})

  const airTimeValue: AirtimeForm = {
    amount: null,
    serviceId: '',
    phoneNumber: '',
  }

  const options = [
    { value: 'mtn', label: 'MTN', icon: 'mtn-logo.png' },
    { value: 'glo', label: 'Glo', icon: 'glo-logo.png' },
    { value: 'airtel', label: 'Airtel', icon: 'airtel-logo.png' },
    { value: '9mobile', label: '9Mobile', icon: '9mobile-logo.png' }
  ];
  useEffect(() => {
    setAppToken(localStorage.getItem('token'))
  }, [])

  const handleSubmit = (values) => {
  
    console.log(values);
    router.push({
      pathname: '/airtime-confirmation',
      query: values,
    });
  };


  return (
    <>
      <Head>
        <title>{getPageTitle('Create-Menu')}</title>
      </Head>

      <SectionTitle>
        <p style={dashboardHeading}>Buy Airtime on-the-go!</p>
      </SectionTitle>

      <div className="md:w-7/12 shadow-1xl md:mx-auto border-white">
        <SectionMain>
          <CardBoxGeneral>
            <ToastContainer />
            <p style={dashboardFormPText}>
              <a href="#">Beneficiaries</a>
            </p>
            <Formik
            initialValues={airTimeValue}
            onSubmit={(values) => handleSubmit(values)}
            
            >

{({ values, setFieldValue }) => (
              <Form>
                <FormField label="Amount">
                  <Field
                    className=""
                    style={dashBoardField}
                    type="number"
                    name="amount"
                    placeholder="Enter an amount"
                  />
                </FormField>

<MySelect  name="serviceId"
            value={values.serviceId}
            setFieldValue={setFieldValue}
           options={options}
           
          />

                <FormField label="Phone Number">
                  <Field
                    style={dashBoardField}
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter a phone number"
                  />
                </FormField>
                <FormCheckRadio type="switch" label="">
                  <Field type="checkbox" name="beneficiary" id="beneficiary" />
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
              

              </Form>
              
              )}
              </Formik>
          </CardBoxGeneral>
        </SectionMain>
      </div>
    </>
  )
};

BuyAirtime.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default BuyAirtime
