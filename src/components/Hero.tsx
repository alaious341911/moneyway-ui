import React, { useMemo, ReactElement } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ButtonPrimary from './misc/ButtonPrimary'
import { motion } from 'framer-motion'
import getScrollAnimation from '../utils/getScrollAnimation'
import ScrollAnimationWrapper from './Layout/ScrollAnimationWrapper'
import heroImage from 'public/hero2.png'
import { heroHeadline, heroSubText, submitButtonDashboard, convenientText } from '../styles'
import {
  mdiAccount,
  mdiChatProcessing,
  mdiFuseAlert,
  mdiGraphql,
  mdiNetworkStrength1,
} from '@mdi/js'
import BaseIcon from './BaseIcon'
import { HomeMenus } from '../interfaces'

const Hero = ({
  listUser = [
    {
      name: 'Active Users',
      number: '390K',
      icon: mdiAccount,
    },
    {
      name: 'Locations',
      number: '6',
      icon: mdiNetworkStrength1,
    },
    {
      name: 'Transactions Proceessed',
      number: '50M',
      icon: mdiGraphql,
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), [])

  const router = useRouter()

  const handleStylePick = (e: React.MouseEvent, menu: HomeMenus) => {
    e.preventDefault()

    //dispatch(setStyle(style))

    router.push(menu)
  }

  return (
    <div className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto" id="about">
      <ScrollAnimationWrapper>
        <motion.div
          className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-2 gap-8 py-6 sm:py-16"
          variants={scrollAnimation}
        >
          <div className=" flex flex-col justify-center items-start row-start-2 sm:row-start-1">
            <h1 style={heroHeadline}>Quick and easy payment platform for all you transactions</h1>
            <p className="mt-4 mb-6" style={heroSubText}>
              Save and manage all your transaction in one place, easy payment anytime & anyday
            </p>
            <ButtonPrimary style={submitButtonDashboard} onclick={handleStylePick} href="signup">
              Create an account
            </ButtonPrimary>
          </div>
          <div className="flex w-full">
            <motion.div className="h-full w-full" variants={scrollAnimation}>
              <Image
                src={heroImage}
                alt="VPN Illustrasi"
                quality={100}
                width={212}
                height={483}
                layout="responsive"
              />
            </motion.div>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        <ScrollAnimationWrapper className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-40 sm:w-auto">
                <div className="flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full">
                  {/* <Image width={5} height={5} src={listUsers.icon} className="h-6 w-6" /> */}
                  <BaseIcon
                    path={listUsers.icon}
                    color={'#000'}
                    className={`flex-none`}
                    w="w-64"
                    size="24"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold">{listUsers.number}+</p>
                  <p className="text-lg text-black-500">{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollAnimationWrapper>
        <div
          className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: 'blur(114px)' }}
        ></div>
      </div>
    </div>
  )
}

export default Hero
