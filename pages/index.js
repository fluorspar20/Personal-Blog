import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello World! I am <span style={{color: 'blueviolet'}}>Amogh Dixit</span>, a sophomore pursuing <span style={{color: 'blueviolet'}}>Electrical Engineering</span> from the <span style={{color: 'blueviolet'}}>Indian Institute of Technology, Indore</span>. I am passionate about programming and I am learning full stack web development using MERN stack.</p>
        <p>Intrigued by travelling, art, music, movies, sports and nature, I am also a hobbyist photographer and I love capturing moments.</p>
        <p>You can contact me on <a href="https://twitter.com/runtimeError20" target="_blank">Twitter</a></p>
        {/* <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p> */}
      </section>
    </Layout>
  )
}