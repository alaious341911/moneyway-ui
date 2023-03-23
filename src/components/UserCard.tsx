import { mdiCheckDecagram } from '@mdi/js'
import { Field, Form, Formik } from 'formik'
import { capitalizeFirstLetter, useAppSelector } from '../stores/hooks'
import CardBox from './CardBox'
import FormCheckRadio from './FormCheckRadio'
import PillTag from './PillTag'
import UserAvatarCurrentUser from './UserAvatarCurrentUser'

type Props = {
  className?: string
}

const UserCard = ({ className }: Props) => {
  const firstName = useAppSelector((state) => state.main.firstName)
 //alert(firstName)
  return (
    <CardBox className={className}>
      <div className="flex flex-col lg:flex-row items-center justify-around lg:justify-center">
        <UserAvatarCurrentUser className="mb-6 lg:mb-0 lg:mx-12" />
        <div className="space-y-3 text-center md:text-left lg:mx-12">
          <div className="flex justify-center md:block">
            <Formik
              initialValues={{
                notifications: ['1'],
              }}
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
            >
              <Form>
               
              </Form>
            </Formik>
          </div>
          <h1 className="text-2xl">
            Howdy, <b>{capitalizeFirstLetter(firstName)}</b>!
          </h1>
         
          <div className="flex justify-center md:block">
            <PillTag label="Verified" color="info" icon={mdiCheckDecagram} />
          </div>
        </div>
      </div>
    </CardBox>
  )
}

export default UserCard
