import {
  mdiChartTimelineVariant,
  mdiSendOutline,
  mdiWalletOutline,
} from '@mdi/js'
import Head from 'next/head'
import React, {useState, useEffect } from 'react'
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
import CardBoxComponentEmpty from '../components/CardBoxComponentEmpty'
import CardBoxGeneral from '../components/CardBoxGeneral'
import CardBoxx from '../components/CardBoxx'
import { sampleChartData } from '../components/ChartLineSample/config'
import ChartLineSample from '../components/ChartLineSample'
import TableSampleClients from '../components/TableSampleClients'
import { getPageTitle } from '../config'
import { dashboardHeading, dashBoardHText, darkBlueBox } from '../styles'
import axios, { decodeErrorStatus } from '../stores/hooks'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector, useAppDispatch } from '../stores/hooks'
import { MoonLoader } from 'react-spinners'
import { setUser } from '../stores/mainSlice'

const Dashboard = () => {
  const { clients } = useSampleClients()
  //const { transactions } = useSampleTransactions()
  const GET_TRANSACTION_ENDPOINT = "/api/v1/transactions";
  const GET_PROFILE_ENDPOINT = "/api/v1/auth/user";

  const clientsListed = clients.slice(0, 3)
  const dispatch = useAppDispatch()
  

  const [chartData, setChartData] = useState(sampleChartData())
  // const [errMsg, setErrMsg] = useState('')
  const [token, setAppToken] = useState('')
  const [cValues, setCValues] = useState(false);
  const [transactions, setTransactions] = useState([]);
  // const [profile, setProfile] = useState({firstName: '', lastName: '', email: '',
  //  phoneNumber: '', avatar: ''});
  const [loading, setLoading] = useState(false);
  
  const pageNumber = useAppSelector((state) => state.transaction.pageNumber)
  const startDate = useAppSelector((state) => state.transaction.startDate)
  const endDate = useAppSelector((state) => state.transaction.endDate)

  useEffect(() => {
    setAppToken(localStorage.getItem('token'))
    handleAmountSpent()
  handleSearchClick()
  fetchProfile()

  }, [])

  const fillChartData = (e: React.MouseEvent) => {
    e.preventDefault()

    setChartData(sampleChartData())
  }
  const [errMsg, setErrMsg] = useState('Unknown error');

  const ACCOUNT_SUMMARY_ENDPOINT = "api/v1/financial/summary/"
  const [amountSpent, setAmountSpent] = useState(0);
  const [monthlyPercent, setMonthlyPercent] = useState('');

  const handleAmountSpent = async () => {
    const id = toast.loading("Authenticating...", {theme: 'light'})
    const customId = "login-id";
    
    try {
        const response = await axios.get(ACCOUNT_SUMMARY_ENDPOINT,
            
            {
                headers: { 
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
                 },
                withCredentials: true
            }
        )
            .then(response => setAmountSpent(response.data.total))
            console.log(amountSpent)
        
        
          
           
          }
        
       
        
     catch (err) {
      if (!err?.response) {
         setErrMsg('No Server Response');
      } 
      else  {
       setErrMsg(decodeErrorStatus(err?.response.status))
         }

     toast("Error fetching amount spent. please check your network")
        }           
}

  const fetchProfile = async () => {
    
     try {
      
       const response = await axios.get(GET_PROFILE_ENDPOINT,
         
           {
               headers: {
                          'Authorization': 'Bearer ' + localStorage.getItem('token')
             },
               withCredentials: true
           }
       );
         if(response?.status == 200 || response?.status==201){
          const userP = response.data.data;
           
            dispatch(setUser({firstName: userP.firstName, lastName: userP.lastName, 
              phoneNumber: userP.phoneNumber, email: userP.email, 
              avatar: 'https://api.dicebear.com/5.x/personas/svg?skinColor=623d36'}))
         }
      
       
   } catch (err) {
     if (!err || !err?.response) {
        setErrMsg('No Server Response');
     } 
     else  {
      setErrMsg(decodeErrorStatus(err?.response.status))
        }
     
        toast("Error fetching profile info. Please check your network!");
 }
   }

  const handleSearchClick = async () => {
   // alert("gg")
    //alert("start")
  //  alert(startDate)
  //  alert(endDate)
  //  alert(pageNumber)
   //console.log("end")
    const values = {pageNumber : pageNumber, startDate: startDate, endDate: endDate}
    console.log("values start here")
    console.log(values)

    setLoading(true);
    try {
     
      const response = await axios.post(GET_TRANSACTION_ENDPOINT,
        values,
          {
              headers: {
                         'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
              withCredentials: true
          }
      );
        if(response?.status == 200 || response?.status==201){
          console.log(response.data)
           const fetchedData =response.data.data;
          // const mappedOption = fetchedData.map((option) => {
          //   return { value: option.requestId, label: option.status };
          // });
          setTransactions([...response.data.data]); 
          console.log(transactions)
          setLoading(false);
        }
     //console.log(JSON.stringify(transactions));
      
  } catch (err) {
    if (!err || !err?.response) {
       setErrMsg('No Server Response');
    } 
    else  {
     setErrMsg(decodeErrorStatus(err?.response.status))
       }
    
       toast("Error fetching transactions. Please check your network!");
       setLoading(false);
}
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
                number={amountSpent}
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
          <div>
      {loading ? <MoonLoader color="#3538CD" size={20} /> : null}
      <SectionTitleLineWithButton handleSearchClick={handleSearchClick} />
      {transactions.length > 0 ? (
        <CardBoxGeneral hasTable>
          <TableSampleClients
            handleSearchClick={handleSearchClick}
            transactions={{ data: transactions }}
          />
        </CardBoxGeneral>
      ) : (
        <CardBoxComponentEmpty />
      )}
    </div>
        </SectionMain>
      </div>
    </>
  )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>
}

export default Dashboard
