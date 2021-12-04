import 'tailwindcss/tailwind.css'
import '../style/style.scss'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
  <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
