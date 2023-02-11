import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartPie,
  mdiChartTimelineVariant,
  mdiGithub,
  mdiMonitorCellphone,
  mdiReload,
  mdiTransfer,
  mdiWallet,
} from '@mdi/js'
import Head from 'next/head'
import React, { useState } from 'react'
import type { ReactElement } from 'react'
import BaseButton from '../components/BaseButton'
import LayoutAuthenticated from '../layouts/Authenticated'
import SectionMain from '../components/SectionMain'
import SectionTitleLineWithButton from '../components/SectionTitleLineWithButton'
import CardBoxWidget from '../components/CardBoxWidget'
import { useSampleClients, useSampleTransactions } from '../hooks/sampleData'
import CardBoxTransaction from '../components/CardBoxTransaction'
import { Client, Transaction } from '../interfaces'
import CardBoxClient from '../components/CardBoxClient'
import CardBoxGeneral from '../components/CardBoxGeneral'
import CardBox from '../components/CardBox'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartLineSample from '../components/ChartLineSample'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'

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
      <SectionMain>
        <SectionTitleLineWithButton icon={mdiChartTimelineVariant} title="Dashboard" main>
          
        </SectionTitleLineWithButton>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
          <CardBoxWidget
            trendLabel="12%"
            trendType="up"
            trendColor="white"
            icon={mdiWallet}
            iconColor="success"
            number={60000}
            label="Account Balance"
            
           
          />
          <CardBoxWidget
            trendLabel="16%"
            trendType="down"
            trendColor="white"
            icon={mdiTransfer}
            iconColor="info"
            number={65000}
            numberPrefix="N"
            label="Amount spent"
            cardBoxLight="yes"
            
          />
         
        </div>


        <SectionTitleLineWithButton icon={mdiChartPie} title="Statistics showing your monthly spending">
          <BaseButton icon={mdiReload} color="whiteDark" onClick={fillChartData} />
        </SectionTitleLineWithButton>

        <CardBoxGeneral className="mb-6">{chartData && <ChartLineSample data={chartData} />}</CardBoxGeneral>

        <SectionTitleLineWithButton icon={mdiAccountMultiple} title="Transaction history" />

        <CardBoxGeneral hasTable>
          <TableSampleClients />
        </CardBoxGeneral>
      </SectionMain>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
