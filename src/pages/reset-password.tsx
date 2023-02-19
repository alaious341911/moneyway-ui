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
} from '../styles'
import PagesTitle from '../components/PagesTitle'

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

      <PagesTitle>
        <div className="text-center flex-1 lg:text-left lg:pl-6 xl:text-center xl:pl-0 pt-10">
          <Image src="MONEYWAY-3.png" alt="moneyway" className="rounded-full inline w-14 h-14" />
          <span style={pagesTitle}>MoneyWay</span>
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

Error.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
