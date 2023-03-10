import React from 'react'
import Image from 'next/image'
import type { ReactElement } from 'react'
import { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBoxGeneral from '../components/CardBoxGeneral'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import FormCheckRadio from '../components/FormCheckRadio'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import axios, { decodeErrorStatus } from '../stores/hooks'
import { toast, ToastContainer } from 'react-toastify';
import { mdiLockOutline } from '@mdi/js'
import SectionTitle from '../components/SectionTitle'
import {
  textInput,
  submitButton,
  formPText,
  formLink,
  moneyWayHeader,
  forgotPText,
  pagesTitle,
} from '../styles'
import PagesTitle from '../components/PagesTitle'
import { ResetPasswordForm } from '../interfaces'

export default function ResetPassword() {

  const RESETPASSWORD_URL = "/api/v1/auth/reset-password";
  const [errMsg, setErrMsg] = useState('Unknown error');
  const [token, setAppToken] = useState('');


  const signupFormInitialValues: ResetPasswordForm ={
    currentPassword: '',
    newPassword: ''
    
  }


  const textInput = {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 40, // Add padding to the left to create space for the icon
    marginBottom: 20,
  }

  useEffect(() => {
    setAppToken(localStorage.getItem("token"));
    
  }, [])

  const router = useRouter()

  const handleSubmit = async(values, {setSubmitting}) => {
    const id = toast.loading("Please wait...")
    const customId = "custom-id-yes";
    try {
      const response = await axios.put(RESETPASSWORD_URL,
        values,
        {
            headers: { 'Content-Type': 'application/json',
                        'Authorization': 'Bearer' + token 
          },
            withCredentials: true
        }
    )

    if(response.status == 200){

      // localStorage.setItem('role',response?.data.role );
      // localStorage.setItem('userId',response?.data.userId );
      // localStorage.setItem('userName',response?.data.userName );
      
      toast.update(id, { render: "Your password has been reset successfully", type: "success", 
      toastId: customId, theme: "colored", isLoading: false });
     
      // router.push('/dashboard')
    } 
    } catch (err) {
      if (!err?.response) {
         setErrMsg('No Server Response');
      } 
      else  {
       setErrMsg(decodeErrorStatus(err?.response.status))
         }

     //toast(errMsg || "Unknown error")
     toast.update(id, { render: errMsg, type: "error", theme: "colored", toastId: customId, isLoading: false });
 }


    
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <PagesTitle>
        <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 pt-10">
          <Image
            src="moneyway-logo.png"
            width={250}
            height={100}
            alt="moneyway"
            className="inline"
          />
        </div>
      </PagesTitle>

      <SectionFullScreen bg="lightBlue">
        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl mt-20">
          <SectionTitle>
            <p style={moneyWayHeader}>Reset Password</p>
          </SectionTitle>
          <Formik
            initialValues={{ currentPassword: '', newPassword: '' }}
            // onSubmit={() => handleSubmit()}
            onSubmit= {(values, {setSubmitting}) => handleSubmit(values, {setSubmitting})}
          >
            <Form>
              <FormField label="Password" icons={[mdiLockOutline]}>
                <Field
                  style={textInput}
                  name="currentPassword"
                  type="password"
                  placeholder="Enter your new password"
                />
              </FormField>
              <FormField label="Confirm Password" icons={[mdiLockOutline]}>
                <Field
                  style={textInput}
                  name="newPassword"
                  type="password"
                  placeholder="Confirm password"
                />
              </FormField>
              <BaseDivider />

              <FormField>
                <Field type="submit" value="Reset Password" style={submitButton} />
              </FormField>
            </Form>
          </Formik>
        </CardBoxGeneral>
      </SectionFullScreen>
    </>
  )
}

ResetPassword.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
