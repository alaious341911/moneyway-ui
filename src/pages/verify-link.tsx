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
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'

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

      <SectionFullScreen bg="purplePink">
      
        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Email Verification">
         
         </SectionTitleLineWithButton>
          <Formik
            initialValues={{ login: '', password: '', remember: true }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <p> Hi there, use the link below to verify your email snd start enjoin MoneyWay</p>

              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Verify email      " color="info" />
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
