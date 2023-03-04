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
import { mdiAccount, mdiMail, mdiBallotOutline } from '@mdi/js'
import SectionTitle from '../components/SectionTitle'
import { textInput, submitButton, formPText, formLink, moneyWayHeader, pagesTitle } from '../styles'
import PagesTitle from '../components/PagesTitle'


export default function ForgotPassword() {
  const router = useRouter()

  const handleSubmit = () => {
    router.push('/email-check')
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Forgot-Password')}</title>
      </Head>

      <PagesTitle>
        <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 pt-10">
          <Image src="MONEYWAY-3.png" alt="moneyway" width={0} height={0} className="rounded-full inline w-14 h-14" />
          <span style={pagesTitle}>MoneyWay</span>
        </div>
      </PagesTitle>
      <SectionFullScreen bg="lightBlue">
        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl mt-20">
          <SectionTitle>
            <p style={moneyWayHeader}>Forgot Password</p>
          </SectionTitle>
          <Formik
            initialValues={{ login: 'john.doe', password: 'bG1sL9eQ1uD2sK3b', remember: true }}
            onSubmit={() => handleSubmit()}
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
