import React from 'react'
import Image from 'next/image'
import type { ReactElement } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBoxGeneral from '../components/CardBoxGeneral'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { Field, Form, Formik} from 'formik'
import FormField from '../components/FormField'
import FormCheckRadio from '../components/FormCheckRadio'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import { mdiAccount, mdiMail, mdiBallotOutline, mdiEmail, mdiKey, mdiEmailAlertOutline, mdiEmailOutline} from '@mdi/js'
import SectionTitleLineWithoutButton from '../components/SectionTitleLineWithoutButton'
import {textInput, submitButton, formPText, formLink} from  '../styles'


export default function Error() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/dashboard')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Login')}</title>
      </Head>
     
      <SectionFullScreen bg="lightBlue">
      {/* <div style={ellipse}>
        <Image style={moneyIcon} src={profilePic} alt='icon'/>
        <p style={moneyWayText}>MoneyWay</p>
      </div> */}

        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
        <SectionTitleLineWithoutButton title="Hi, Welcome back" main={true}>
         
         </SectionTitleLineWithoutButton>
          <Formik
            initialValues={{ email: '', password: '', remember: true }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <FormField label="Email" icons={[mdiEmailOutline]}>
                <Field style={textInput} name="email" />
              </FormField>

              <FormField label="Password" help="forgot password?" icons={[mdiKey]}>
                <Field style={textInput} name="password" type="password" />
              </FormField>


              <BaseDivider />

              <BaseButtons>
                <button type="submit" style={submitButton} >Login</button>
              </BaseButtons>
            </Form>
          </Formik>
          <p style={formPText}>Don't have an account? <a href='#' style={formLink}>Create account</a></p>
        </CardBoxGeneral>
      </SectionFullScreen>
    </>
  )
}

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
