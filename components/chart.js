import dynamic from 'next/dynamic'

export default dynamic(() => import('react-apexcharts'), {
  ssr: false
})
