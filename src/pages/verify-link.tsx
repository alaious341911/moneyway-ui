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
import { mdiAccount, mdiMail, mdiBallotOutline} from '@mdi/js'
import SectionTitle from '../components/SectionTitle'
import {textInput, submitButton, formPText, formLink, moneyWayHeader} from  '../styles'

export default function Error() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Verifiy-Email')}</title>
      </Head>

      <SectionFullScreen bg="lightBlue">
      
        <CardBoxGeneral className="w-11/12 md:w-/12 lg:w-6/12 xl:w-4/12 shadow-2xl">

         <SectionTitle ><p style={moneyWayHeader}>Email Verification</p></SectionTitle>
          <Formik
            initialValues={{ login: '', password: '', remember: true }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <p style={formPText}> Hi there, use the link below to verify your email and start enjoin MoneyWay</p>

              <BaseDivider />

              <FormField>
              <Field type="submit" value="Verify email"  style={submitButton}/>
       
              </FormField>
            </Form>
          </Formik>
        </CardBoxGeneral>
      </SectionFullScreen>
    </>
  )
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
