import { AppProps } from 'next/app'
import Head from 'next/head'
import { Container, Navbar } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'

export default function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>英語クイズ</title>
      </Head>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">英語クイズ</Navbar.Brand>
      </Navbar>
      <Container className="py-4">
        <Component {...pageProps} />
      </Container>
    </>
  )
}
