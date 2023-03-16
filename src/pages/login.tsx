import React, { useState, useRef, useEffect } from 'react'
import type { ReactElement } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBox from '../components/CardBox'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import axios from '../stores/hooks'
import {useAppDispatch, useAppSelector, decodeErrorStatus} from '../stores/hooks'
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
import PagesTitle from '../components/PagesTitle'
import Image from 'next/image'

export default function Login() {
  const router = useRouter()
  const LOGIN_URL = "/api/v1/auth/login";
  const [errMsg, setErrMsg] = useState('Unknown error');

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    sessionStorage.clear();
  }, [])
  

  const handleSubmit = async (values) => {
    const id = toast.loading("Authenticating...", {theme: 'light'})
    const customId = "login-id";
    
    try {
        const response = await axios.post(LOGIN_URL,
            values,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        
        
          if(response.status == 200){

            localStorage.setItem('token',response?.data );
            console.log(response?.data )
            // localStorage.setItem('role',response?.data.role );
            // localStorage.setItem('userId',response?.data.userId );
            // localStorage.setItem('userName',response?.data.userName );
            
            toast.update(id, { render: "Authenticated! Loging in.....", type: "success", 
            toastId: customId, theme: "colored", isLoading: false,
             closeOnClick: true, position: "top-right",
             autoClose: 3000, });
           
            router.push('/dashboard')
          }
        console.log(JSON.stringify(response?.status));
        
    } catch (err) {
      if (!err?.response) {
         setErrMsg('No Server Response');
      } 
      else  {
       setErrMsg(decodeErrorStatus(err?.response.status))
         }

     //toast(errMsg || "Unknown error")
     toast.update(id, { render: errMsg, type: "error", 
     toastId: customId, theme: "colored", isLoading: false,
     closeOnClick: true, position: "top-right",
     autoClose: 3000});
 }
}

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>
      <PagesTitle>
        <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 pt-11">
          <Image src="moneyway-logo.png" width={200} height={100} alt="moneyway" className="inline" />
          
        </div>
      </PagesTitle>

      <SectionFullScreen bg="lightBlue">
      <ToastContainer />
        <CardBox className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
        
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values) => handleSubmit(values)}
          >
            
            <Form>
              <FormField label="Login" help="Please enter your login ID">
                <Field name="email" id="email" />
              </FormField>

              <FormField label="Password" help="Please enter your password">
                <Field name="password" id="password" type="password" />
              </FormField>


              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Login" color="info" />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionFullScreen>
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
