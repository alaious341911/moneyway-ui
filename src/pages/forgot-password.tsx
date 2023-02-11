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
        <title>{getPageTitle('Forgot-Password')}</title>
      </Head>

      <SectionFullScreen bg="purplePink">
      
        <CardBoxGeneral className="w-11/12 md:w-7/12 lg:w-6/12 xl:w-4/12 shadow-2xl">
        <SectionTitleLineWithButton icon={mdiBallotOutline} title="Forgot Password">
         
         </SectionTitleLineWithButton>
          <Formik
            initialValues={{ login: 'john.doe', password: 'bG1sL9eQ1uD2sK3b', remember: true }}
            onSubmit={() => handleSubmit()}
          >
            <Form>
              <FormField label="Email"  icons={[mdiMail]}>
                <Field name="email" placeholder="enter your email" />
              </FormField>


              <BaseDivider />

              <BaseButtons>
                <BaseButton type="submit" label="Reset Password" color="info" />
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
