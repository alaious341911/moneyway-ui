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
      <Head>
        <title>{appTitle}</title>
      </Head>
      <div className={`flex min-h-screen items-center justify-center ${gradientBgPurplePink}`}>
        <SectionMain>
          <h1 className="text-4xl md:text-5xl text-center text-white font-bold mt-12 mb-3 lg:mt-0">
            MoneyWay&hellip;
          </h1>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-4 px-6 max-w-6xl mx-auto">
            {homeMenus.map((menu) => (
              <CardBoxGeneral
                key={menu}
                className="cursor-pointer bg-gray-50"
                isHoverable
                onClick={(e) => handleStylePick(e, menu)}
              >
                <div className="mb-3 md:mb-6">
                  <BaseButton href={menu} label={menu} color="info" />
                </div>
                {/* <h1 className="text-xl md:text-2xl font-black capitalize">{style}</h1>
                <h2 className="text-lg md:text-xl">& Dark mode</h2> */}
              </CardBoxGeneral>
            ))}
          </div>
        </SectionMain>
      </div>
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>
}

export default HomePage
