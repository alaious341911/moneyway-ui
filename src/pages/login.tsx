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
import {
  mdiAccount,
  mdiMail,
  mdiBallotOutline,
  mdiEmail,
  mdiKey,
  mdiEmailAlertOutline,
  mdiEmailOutline,
} from '@mdi/js'
import SectionTitle from '../components/SectionTitle'
import PagesTitle from '../components/PagesTitle'
import {
  textInput,
  submitButton,
  formPText,
  formLink,
  moneyWayHeader,
  forgotPText,
  pagesTitle,
} from '../styles'

export default function Login() {
  const textInput = {
    width: '100%',
    height: 40,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 40, // Add padding to the left to create space for the icon
    marginBottom: 20,
  };
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>

      <PagesTitle>
        <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 pt-11">
          <Image src="moneyway-logo.png" width={250} height={100} alt="moneyway" className="inline" />
          {/* <span style={pagesTitle}>MoneyWay</span> */}
        </div>
      </PagesTitle>

      <SectionFullScreen bg="lightBlue">
        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl mt-20">
          <SectionTitle>
            <p style={moneyWayHeader}>Hi, Welcome back</p>
          </SectionTitle>
          <Formik
            initialValues={{ email: '', password: '', remember: true }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <FormField label="Email" icons={[mdiEmailOutline]}>
                <Field style={textInput} name="email" placeholder="Enter your email" />
              </FormField>

              <FormField label="Password" icons={[mdiKey]}>
                <Field
                  style={textInput}
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </FormField>
              <a href="forgot-password" style={forgotPText}>
                forgot password?
              </a>

              <BaseDivider />

              <FormField>
                <Field type="submit" value="Submit" style={submitButton} />
              </FormField>
            </Form>
          </Formik>
          <p style={formPText}>
            Don't have an account?{' '}
            <a href="signup" style={formLink}>
              Create account
            </a>
          </p>
        </CardBoxGeneral>
      </SectionFullScreen>
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
