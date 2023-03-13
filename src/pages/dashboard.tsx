import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiReload,
  mdiSendOutline,
  mdiTransfer,
  mdiWallet,
  mdiWalletOutline,
} from '@mdi/js'
import Head from 'next/head'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import SectionTitleLineWithoutButton from '../components/SectionTitleLineWithoutButton'
import SectionTitle from '../components/SectionTitle'
import CardBoxWidget from '../components/CardBoxWidget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBoxTransaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBoxClient'
import CardBoxGeneral from '../components/CardBoxGeneral'
import CardBoxx from '../components/CardBoxx'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartLineSample from '../components/ChartLineSample'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import { dashboardHeading, dashBoardHText, darkBlueBox } from '../styles'

const Dashboard = () => {
  const { clients } = useSampleClients()
  const { transactions } = useSampleTransactions()

  const clientsListed = clients.slice(0, 3)

  const [chartData, setChartData] = useState(sampleChartData())

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }

  return (
    <>
      <Head>
        <title>{getPageTitle('Dashboard')}</title>
      </Head>
      <div className="md:w-9/12 shadow-1xl md:mx-auto border-white">
        <SectionMain>
          <SectionTitleLineWithoutButton
            icon={mdiChartTimelineVariant}
            title="Dashboard"
            main={true}
          ></SectionTitleLineWithoutButton>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 mb-6">
            <div>
              <CardBoxWidget
                // trendLabel="12%"
                trendType="up"
                trendColor="white"
                icon={mdiWalletOutline}
                iconColor="white"
                number={60000}
                label="Account Balance"
                bankName="Wema bank"
                accountNumber="3089434692"
                cardBoxColor="bg-[#3538CD] border-radius[24px]"
                cardBoxLight="yes"
              />
            </div>
            <div>
              <CardBoxWidget
                trendType="down"
                trendColor="white"
                icon={mdiSendOutline}
                iconColor="dark"
                number={65000}
                numberPrefix="N"
                label="Amount spent"
                cardBoxColor="bg-[#FEFDF0] border-radius[24px]"
                bankName="Monthly percentage"
                accountNumber="0.5% - 2%"
              />
            </div>
          </div>

          {/* <SectionTitleLineWithButton icon={mdiChartPie} title="Statistics showing your monthly spending">
          <BaseButton icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton> */}
          <p style={dashBoardHText}>Statistics showing your monthly spending</p>
          <CardBoxGeneral className="mb-6">
            {chartData && <ChartLineSample data={chartData} />}
          </CardBoxGeneral>

          <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Transaction history" />

          <CardBoxGeneral hasTable>
            <TableSampleClients />
          </CardBoxGeneral>
        </SectionMain>
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
