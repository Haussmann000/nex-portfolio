import Link from "next/link"
import Image from 'next/image'
import matter from "gray-matter"
import Layout from '../components/layout'
import * as style from '../styles/blog.module.scss'

const Blog = (props) => {
  console.log(props)
  return (
    <Layout>
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>Blog</h1>
        <p>気づいたことなどを書いていきます</p>
        {props.blogs.map((blog, index) =>{
        return(
          <div key={index} className={style.blogCard}>
            <div className={style.textContainer}>
            <h3>{blog.frontmatter.title}</h3>
            <p>{blog.frontmatter.date}</p>
            <Link href={`/blog/${blog.slug}`}><a>Read More</a></Link>
          </div>
          <div className={style.cardImg}>
            <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} />
          </div>
          </div>
          )}
        )}
        </div>
      </div>
    </Layout>
  )
}

export default Blog

// https://qiita.com/matamatanot/items/1735984f40540b8bdf91
// getStaticPropsはサーバーサイドで実行されてレンダリング前に静的なファイルを生成する
// ビルドごとに実行される
export async function getStaticProps() {
  // asyncを指定するとSSG（ビルド時に実行）
  // https://nextjs.org/docs/basic-features/pages
  // https://nextjs.org/docs/basic-features/data-fetching
  const blogs = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0,-3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        slug: slug
      }
    })
    return data
  })
  (require.context('../data', true, /\.md$/))
  
  const orderedBlogs = blogs.sort((a, b) => {
    return b.frontmatter.id - a.frontmatter.id
  })

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(orderedBlogs))
    },
  }
}