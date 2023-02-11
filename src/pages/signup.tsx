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
import { mdiAccount, mdiEmail, mdiFormTextboxPassword, mdiBallotOutline, mdiPhone} from '@mdi/js'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'


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

      <SectionFullScreen bg="purplePink">
        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Get Started with MoneyWay">
         
         </SectionTitleLineWithButton>
          <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <FormField label="First Name" icons={[mdiAccount]}>
                <Field name="firstName" />
              </FormField>
              <FormField label="Last Name" icons={[mdiAccount]}>
                <Field name="lastName" />
              </FormField>

              <FormField label="email" icons={[mdiEmail]}>
                <Field name="email" />
              </FormField>
              <FormField label="Phone Number" icons={[mdiPhone]}>
                <Field name="phoneNumber" />
              </FormField>

              <FormField label="Password" icons={[mdiFormTextboxPassword]}>
                <Field name="password" type="password" />
              </FormField>
              <FormField label="Confirm Password"  icons={[mdiFormTextboxPassword]}>
                <Field name="confirmPassword" type="password" />
              </FormField>


              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Sign Up" color="info" />
              </BaseButtons>
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
