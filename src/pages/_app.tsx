import type { AppProps } from "next/app";


import logoImg from '../assets/logo.svg'
import { globalStyles } from "../styles/global"
import { Container, Header } from "../styles/pages/app";

import Image from "next/image";

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg} 
              width={130}
              height={52}
              alt="Picture of the author"
        />
      </Header>

        <Component {...pageProps} />
    </Container>
  )
}
