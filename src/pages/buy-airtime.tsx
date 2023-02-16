import { mdiAccount, mdiBallotOutline, mdiGithub, mdiMail, mdiMenu, mdiUpload } from '@mdi/js'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import Head from 'next/head'
import { ReactElement, useState, useEffect } from 'react'
import BaseButton from '../components/BaseButton'
import BaseButtons from '../components/BaseButtons'
import BaseDivider from '../components/BaseDivider'
import CardBox from '../components/CardBox'
import FormCheckRadio from '../components/FormCheckRadio'
import FormCheckRadioGroup from '../components/FormCheckRadioGroup'
import FormField from '../components/FormField'
import FormFilePicker from '../components/FormFilePicker'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitle from '../components/SectionTitle'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import { getPageTitle } from '../config'
import axios from '../stores/hooks'
import {useAppDispatch, useAppSelector, decodeErrorStatus} from '../stores/hooks'
import type {MenuForm} from '../interfaces'
import { toast, ToastContainer } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";
  import * as Yup from 'yup'

const MenuPage = () => {
    const CREATE_MENU_ENDPOINT = "/api/v1/menus";
    
    
    const [errMsg, setErrMsg] = useState('');
    const [token, setAppToken] = useState('');

    const newMenuForm: MenuForm ={
      name: '',
      costPrice: null,
      sellingPrice: null,
      description: '',

    }

    useEffect(() => {
      setAppToken(localStorage.getItem("token"));
    }, [])



    const handleCreateMenu = async (values, {setSubmitting}) => {
      try {
          const response = await axios.post(CREATE_MENU_ENDPOINT,
              values,
              {
                  headers: { 'Content-Type': 'application/json',
                             'Authorization': 'Bearer ' + token
                },
                  withCredentials: true
              }
          );
            if(response?.status == 200){
              
              toast("Menu item added!");
              
            }
          console.log(JSON.stringify(response?.status));
          
      } catch (err) {
           if (!err?.response) {
              setErrMsg('No Server Response');
           } 
           else  {
            setErrMsg(decodeErrorStatus(err?.response.status))
              }
  
          toast(errMsg || "Unknown error")
      }
  }
  return (
    <>
      <Head>
        <title>{getPageTitle('Create-Menu')}</title>
      </Head>

      <SectionMain>
        <SectionTitleLineWithButton icon={mdiMenu} title="Add Menu Item" main>
         
        </SectionTitleLineWithButton>

        <CardBox>
        <ToastContainer />
          <Formik
            initialValues={newMenuForm}
            validationSchema={Yup.object({
              name: Yup.string()
                .required('Required'),
              costPrice: Yup.number()
                .min(100, 'can\'t be less than 100 naira')
                .max(10000, 'can\'t be more than 10,000 naira')
                .required('Required'),
                sellingPrice: Yup.number()
                .min(100, 'can\'t be less than 100 naira')
                .max(10000, 'can\'t be more than 10,000 naira')
                .required('Required'),
                description: Yup.string()
                .required('Required'),
              
            
            })}
            onSubmit= {(values, {setSubmitting}) => handleCreateMenu(values, {setSubmitting})}
          >
            <Form>
              <FormField label="Required Fields" icons={[mdiAccount, mdiMail]}>
                <Field  type="text" name="name" placeholder="menu item name" />
                <ErrorMessage name="name" />
                <Field type="number" name="costPrice" placeholder="cost price" />
                <ErrorMessage name="costPrice" />
                <Field type="number" name="sellingPrice" placeholder="selling price" />
                <ErrorMessage name="sellingPrice" />
              </FormField>

              <FormField
                label="Item Description"
                labelFor="description"
                help="give short descripton for the created menu"
              >
                <Field name="description" placeholder="menu description" id="description" />
                <ErrorMessage name="description" />
              </FormField>


              <BaseDivider />
    
              <BaseButtons>
                <BaseButton type="submit" color="info" label="Add" />
                <BaseButton type="reset" color="info" outline label="Reset" />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>

      
    </>
  )
}

MenuPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default MenuPage
