import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import howItworks from "public/howItworks.png";
import {convenientText, descText, detailText, itemText} from '../styles'

const steps = [
    {
        item: "STEP ONE",
        desc: "Sign in or Sign up your account",
        detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent.",
      },
      {
        item: "STEP TWO",
        desc: "Click transfer on your dashboard",
        detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent.",
      },
      {
        item: "STEP THREE",
        desc: "Select your desire bank and send",
        detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent.",
      },
]

const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        
        <ScrollAnimationWrapper>

        <motion.div className="flex flex-col ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
          <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600" style={convenientText}>
          How it works
          </h3>
          <p className="my-2 text-black-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Feugiat eget ipsum, sed praesent.
          </p>
          <ul className="text-black-500 self-start list-inside ml-8">
            {steps.map((step, index) => (
              <motion.li
                className="relative circle-check custom-list"
                custom={{duration: 2 + index}}
                variants={scrollAnimation}
                key={step}
                whileHover={{
                scale : 1.1,
                transition: {
                  duration: .2
                }
                }}>
                  <p style={itemText} className="my-2 text-block-500">{step.item}</p>
                  <p style={descText} className="my-2 text-block-500">{step.desc}</p>
                  <p style={detailText} className="my-2 text-block-500">{step.detail}</p>
              </motion.li>
              )
            )}
          </ul>
        </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src={howItworks}
              alt="Illustration"
              layout="responsive"
              quality={100}
              height={414}
              width={308}
            />
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
  );
};

export default Feature;
