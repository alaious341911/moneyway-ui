import React, { useState } from 'react'
import Image from 'next/image'
import type { ReactElement } from 'react'
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
import { mdiAccount, mdiMail, mdiBallotOutline } from '@mdi/js'
import SectionTitle from '../components/SectionTitle'
import { textInput, submitButton, formPText, formLink, moneyWayHeader, pagesTitle } from '../styles'
import PagesTitle from '../components/PagesTitle'
import { EmailForm } from '../interfaces'
import axios, { decodeErrorStatus } from '../stores/hooks'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

export default function ForgotPassword() {

  const GET_FORGOT_PASSWORD_ENDPOINT = '/api/v1/auth/forgot-password';

  const emailValue: EmailForm = {
    email: ''
  }

  const [errMsg, setErrMsg] = useState('')

  const textInput = {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 40, // Add padding to the left to create space for the icon
    marginBottom: 20,
  }
  const router = useRouter()

  // const handleSubmit = () => {
  //   router.push('/email-check')
  // }

  const handleForgotPassword = async (values, { setSubmitting }) => {
    const id = toast.loading('Proccessing...', { theme: 'light' })
    const customId = 'sign-up-id'
    try {
      const response = await axios.post(GET_FORGOT_PASSWORD_ENDPOINT, values, {
        withCredentials: true,
      })
      if (response?.data.status == 200) {
        toast.update(id, {
          render: 'email is registered',
          type: 'success',
          toastId: customId,
          theme: 'colored',
          isLoading: false,
          closeOnClick: true,
          position: 'top-right',
          autoClose: 10000,
        })

        router.push('/email-check')

        //alert (JSON.stringify(response.data))
      }
      console.log(JSON.stringify(response?.status))
      console.log(JSON.stringify(response?.data))
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else {
        setErrMsg(decodeErrorStatus(err?.response.status))
      }

      toast.update(id, {
        render: errMsg,
        type: 'error',
        toastId: customId,
        theme: 'colored',
        isLoading: false,
        closeOnClick: true,
        position: 'top-right',
        autoClose: 1000,
      })
    }
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Forgot-Password')}</title>
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
            <p style={moneyWayHeader}>Forgot Password</p>
          </SectionTitle>
          <Formik
            initialValues={emailValue}
            validationSchema={Yup.object({
              email: Yup.string().email().required('email is required'),
            })}
            onSubmit={(values, { setSubmitting }) => handleForgotPassword(values, { setSubmitting })}
          >
            <Form>
              <p style={formPText}>
                Enter the email associated with your account and we'll send an email with
                instruction to reset your password
              </p>
              <FormField label="Email" icons={[mdiMail]}>
                <Field name="email" placeholder="enter your email" />
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

ForgotPassword.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
