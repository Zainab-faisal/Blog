import Head from 'next/head';
import dbConnect from "../../utils/db-connect"
import BlogModel from '../../models/blog';



export default function Blog (props) {
    const blog = JSON.parse(props.blog);
    return (
        <>
        <Head>
       

        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no"/>
        <link rel="stylesheet" href="../css/post.css"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <title>{blog.title}</title>

        </Head>
        <main className="post">
            <div className="post-bg-wrapper">
            <div className="post-bg" style={{backgroundImage:url(`/api/blogs/images/${blog._id}`)}}></div></div>
            <div className="post-content">
                <h3 className="title">{blog.title}</h3>
                <div className="content" dangerouslySetInnerHTML={{__html:blog.content}}></div>
                
            </div>
        </main>
   

     </>
    
       
    )
}

export async function getStaticProps(context){
    const id = context.params.id;
    await dbConnect();
    const blog = JSON.stringify(
        await BlogModel.findById(id).exec()
    );
    return{
        props:{
            blog,
        },
    };
}


export async function getStaticPaths() {
    await dbConnect();
  
    const blogs = await BlogModel
    .find({}, { _id: 1 });
    const paths = blogs.map((item) => {
      return {
        params: { id: item._id.toString() },
      };
    });
  
    return {
      paths: paths,
      fallback: "blocking",
    };

}