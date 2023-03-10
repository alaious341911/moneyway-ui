import React from 'react'
import Image from 'next/image'
import type { ReactElement } from 'react'
import Head from 'next/head'
import BaseButton from '../components/BaseButton'
import CardBoxGeneral from '../components/CardBoxGeneral'
import SectionFullScreen from '../components/SectionFullScreen'
import LayoutGuest from '../layouts/Guest'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import FormField from '../components/FormField'
import FormCheckRadio from '../components/FormCheckRadio'
import BaseDivider from '../components/BaseDivider'
import BaseButtons from '../components/BaseButtons'
import { useRouter } from 'next/router'
import { getPageTitle } from '../config'
import { mdiAccount, mdiMail, mdiBallotOutline } from '@mdi/js'
import SectionTitle from '../components/SectionTitle'
import { textInput, submitButton, formPText, formLink, moneyWayHeader, pagesTitle, submitButtonDashboard } from '../styles'
import PagesTitle from '../components/PagesTitle'

export default function VerifyLink() {
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

  const handleSubmit = () => {
    router.push('/dashboard')
  }

  const initialValues = { email: '' };
  const handleVerify = () => {
    const gmailLink = `https://gmail.com`;
    window.open(gmailLink, '_blank');
    //resetForm();
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Verifiy-Email')}</title>
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
            <p style={moneyWayHeader}>Email Verification</p>
          </SectionTitle>
          
          <Formik
        initialValues={initialValues}
        onSubmit={() => handleVerify()}
      >
        {({ isSubmitting }) => (
          <Form>
            <p style={formPText}>
                {' '}
                Hi there, an email confirmation link has been sent to your email. Verify your mail and start enjoin MoneyWay
              </p>

              <BaseDivider />
            
            <BaseButtons>
                <BaseButton className='mt-3' type="submit" label="Verify email" color="info" />
              </BaseButtons>
            
          </Form>
        )}
      </Formik>
        </CardBoxGeneral>
      </SectionFullScreen>
    </>
  )

        }
VerifyLink.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}
