import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import CardBoxGeneral from '../components/CardBoxGeneral'
import LayoutGuest from '../layouts/Guest'
import SectionMain from '../components/SectionMain'
import { HomeMenus } from '../interfaces'
import { gradientBgPurplePink } from '../colors'
import { appTitle } from '../config'
import { useAppDispatch } from '../stores/hooks'
import { setDarkMode, setStyle } from '../stores/styleSlice'
import BaseButton from '../components/BaseButton'
import Layout from '../components/Layout/Layout'
import Footer from '../components/Layout/Footer'
import Feature from '../components/Feature'
import HowItWork from '../components/HowItWork'
import Pricing from '../components/Pricing'
import SeoHead from '../components/SeoHead'
import Hero from '../components/Hero'

const HomePage = () => {
  const dispatch = useAppDispatch()

  dispatch(setDarkMode(false))

  const homeMenus: HomeMenus[] = ['login', 'Create an account', 'forgot-password', 'verify-link']

  const router = useRouter()

  const handleStylePick = (e: React.MouseEvent, menu: HomeMenus) => {
    e.preventDefault()

    //dispatch(setStyle(style))

    router.push(menu)
  }

  return (
    <>
      <SeoHead title="MoneyWay -Index " />
      <Layout>
        <Hero />
        <Feature />
        <HowItWork />
        {/* <Pricing /> */}
      </Layout>
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default HomePage
