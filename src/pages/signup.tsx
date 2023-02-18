import React from 'react'
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
import { mdiAccount, mdiEmail, mdiFormTextboxPassword, mdiBallotOutline, mdiPhone, mdiAccountOutline, mdiEmailOutline, mdiTrackpadLock, mdiLockOutline, mdiPin} from '@mdi/js'
import SectionTitle from '../components/SectionTitle'
import {textInput, submitButton, formPText, formLink, moneyWayHeader} from  '../styles'


export default function Error() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/verify-link')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Signup')}</title>
      </Head>

      <SectionFullScreen bg="lightBlue">
        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
        
         <SectionTitle ><p style={moneyWayHeader}>Get Started with MoneyWay</p></SectionTitle>
          <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <FormField label="First Name" icons={[mdiAccountOutline]}>
                <Field style={textInput} name="firstName" placeholder="Type your first name"/>
              </FormField>
              <FormField label="Last Name" icons={[mdiAccountOutline]}>
                <Field style={textInput} name="lastName" placeholder="Type your last name" />
              </FormField>

              <FormField label="email" icons={[mdiEmailOutline]}>
                <Field style={textInput} name="email" placeholder="Type your email" />
              </FormField>
              <FormField label="Phone Number" icons={[mdiPhone]}>
                <Field style={textInput} name="phoneNumber" placeholder="Enter phone number"/>
              </FormField>

              <FormField label="Password" icons={[mdiLockOutline]}>
                <Field style={textInput} name="password" type="password" placeholder="Enter your password" />
              </FormField>
              <FormField  label="Confirm Password"  icons={[mdiLockOutline]}>
                <Field style={textInput} name="confirmPassword" type="password" placeholder="Confirm your password" />
              </FormField>
              <FormField  label="Pin"  icons={[mdiPin]}>
                <Field style={textInput} name="pin" type="password" placeholder="Enter pin" />
              </FormField>

              <BaseDivider />

              <FormField>
              <Field type="submit" value="Sign Up"  style={submitButton}/>
       
              </FormField>
            </Form>
            
          </Formik>
          <p style={formPText}>Already have an account? <a href='login' style={formLink}>Login</a></p>
        </CardBoxGeneral>
      </SectionFullScreen>
    </>
  )
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
