import {
  mdiAccount,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiGithub,
  mdiMail,
  mdiUpload,
} from '@mdi/js'
import { Formik, Form, Field } from 'formik'
import Head from 'next/head'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import CardBoxComponentBody from '../components/CardBoxComponentBody'
import CardBoxComponentFooter from '../components/CardBoxComponentFooter'
import FormField from '../components/FormField'
import FormFilePicker from '../components/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import UserCard from '../components/UserCard'
import type { UserForm } from '../interfaces'
import { getPageTitle } from '../config'
import { useAppSelector } from '../stores/hooks'

const ProfilePage = () => {
  const firstName = useAppSelector((state) => state.main.firstName)
  const lastName = useAppSelector((state) => state.main.lastName)
  const phoneNumber = useAppSelector((state) => state.main.phoneNumber)
  const email = useAppSelector((state) => state.main.email)

  const userForm: UserForm = {
    firstName: firstName,
    lastName : lastName,
    email: email,
    phoneNumber : phoneNumber
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Profile')}</title>
      </Head>

      <SectionMain>
        {/* <SectionTitleLineWithButton icon={mdiAccount} title="Profile" main>
          <BaseButton
            href="https://github.com/justboil/admin-one-react-tailwind"
            target="_blank"
            icon={mdiGithub}
            label="Star on GitHub"
            color="contrast"
            roundedFull
            small
          />
        </SectionTitleLineWithButton> */}

        <UserCard className="mb-6"/>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="flex flex-col">
            {/* <CardBox className="mb-6">
              <FormField label="Avatar" help="Max 500kb">
                <FormFilePicker label="Upload" color="info" icon={mdiUpload} />
              </FormField>
            </CardBox> */}

            <CardBox className="flex-1" hasComponentLayout>
              <Formik
                initialValues={userForm}
                onSubmit={(values: UserForm) => alert(JSON.stringify(values, null, 2))}
              >
                <Form className="flex flex-col flex-1">
                  <CardBoxComponentBody>
                    <FormField
                      label="First Name"
                      help="Required. Your name"
                      labelFor="first name"
                      icons={[mdiAccount]}
                    >
                      <Field name="firstName" id="firstName" placeholder="First Name" />
                    </FormField>

                    <FormField
                      label="Last Name"
                      help="Required. Your name"
                      labelFor="last name"
                      icons={[mdiAccount]}
                    >
                      <Field name="lastName" id="lastName" placeholder="Last Name" />
                    </FormField>
                    <FormField
                      label="E-mail"
                      help="Required. Your e-mail"
                      labelFor="email"
                      icons={[mdiMail]}
                    >
                      <Field name="email" id="email" placeholder="E-mail" />
                    </FormField>
                    <FormField
                      label="Phone Number"
                      help="Required. Your name"
                      labelFor="first name"
                      icons={[mdiAccount]}
                    >
                      <Field name="phoneNumber" id="phoneNumber" placeholder="phone" />
                    </FormField>
                  </CardBoxComponentBody>
                  <CardBoxComponentFooter>
                    <BaseButtons>
                      <BaseButton color="info" type="submit" label="Submit" />
                      <BaseButton color="info" label="Options" outline />
                    </BaseButtons>
                  </CardBoxComponentFooter>
                </Form>
              </Formik>
            </CardBox>
          </div>

          {/* <CardBox hasComponentLayout>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form className="flex flex-col flex-1">
                <CardBoxComponentBody>
                  <FormField
                    label="Current password"
                    help="Required. Your current password"
                    labelFor="currentPassword"
                    icons={[mdiAsterisk]}
                  >
                    <Field
                      name="currentPassword"
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                    />
                  </FormField>

                  <BaseDivider />

                  <FormField
                    label="New password"
                    help="Required. New password"
                    labelFor="newPassword"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPassword"
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>

                  <FormField
                    label="Confirm password"
                    help="Required. New password one more time"
                    labelFor="newPasswordConfirmation"
                    icons={[mdiFormTextboxPassword]}
                  >
                    <Field
                      name="newPasswordConfirmation"
                      id="newPasswordConfirmation"
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormField>
                </CardBoxComponentBody>

                <CardBoxComponentFooter>
                  <BaseButtons>
                    <BaseButton color="info" type="submit" label="Submit" />
                    <BaseButton color="info" label="Options" outline />
                  </BaseButtons>
                </CardBoxComponentFooter>
              </Form>
            </Formik>
          </CardBox> */}
        </div>
      </SectionMain>
    </>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default ProfilePage
