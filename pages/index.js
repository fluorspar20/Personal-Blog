import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'

export async function getStaticProps(){
  const allPostsData = getSortedPostsData()
  return{
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello World! I am <span style={{color: 'blueviolet'}}>Amogh Dixit</span>, a sophomore pursuing <span style={{color: 'blueviolet'}}>Electrical Engineering</span> from the <span style={{color: 'blueviolet'}}>Indian Institute of Technology, Indore</span>. I am passionate about programming and I am learning full stack web development using MERN.</p>
        <p>Intrigued by travelling, art, music, movies, sports and nature, I am also a hobbyist photographer and I love capturing moments.</p>
        <p>You can contact me on <a href="https://twitter.com/runtimeError20" target="_blank">Twitter</a></p>
      </section>
      <section>
      <h2 className={utilStyles.headingLg}>My Blogs</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href='/posts/[id]' as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}