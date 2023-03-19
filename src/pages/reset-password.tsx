import React from 'react'
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
  confirmationTextBig,
} from '../styles'
import PagesTitle from '../components/PagesTitle'
import { setServiceId } from '../stores/internetSlice'

export default function ResetPassword() {

  const RESET_PASSWORD_ENDPOINT = "/api/v1/auth/reset-password/"

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

  const modalSampleContents = (
    <>
     
    <Image src="success-logo.png" width={50} height={50} alt="success-logo" className="inline" />
      <p>
        <b style={confirmationTextBig}>Successful</b>
      </p>
      <p>Your password has been changed successfully.<br/> Login to access your account</p>
      
    </>
  )

  const handleSubmit = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Reset-Password')}</title>
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
            initialValues={{ email: '', password: '', remember: true }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <FormField label="Password" icons={[mdiLockOutline]}>
                <Field
                  style={textInput}
                  name="password"
                  type="password"
                  placeholder="Enter your new password"
                />
              </FormField>
              <FormField label="Confirm Password" icons={[mdiLockOutline]}>
                <Field
                  style={textInput}
                  name="confirmPassword"
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
