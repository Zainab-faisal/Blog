import Head from "next/head";
import Intro from "../component/intro";
import About from "../component/about";
import Blog from "../component/blog";
import Content from "../component/content";
import Footer from "../component/footer";
import dbConnect from "../utils/db-connect";
import BlogModel from '../models/blog';


export default function Home(props) {
  const blogs = JSON.parse(props.blogs);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,shrink-to-fit=no"
        />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossorigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <title>Prsonal web page</title>
      </Head>
      <Intro/>
      <About/>
      <Blog blogs={blogs}/>
      <Content/>
      <Footer/>
      

      
    </>
  );
}


export async function getStaticProps(){
  await dbConnect();
  const res = await BlogModel.find().sort({_id:-1}).limit(3).exec()
  const blogs =JSON.stringify(res);
  return{props:{blogs}}
}