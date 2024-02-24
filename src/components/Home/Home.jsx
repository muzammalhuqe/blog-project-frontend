import { useEffect, useState } from "react";
import { Card } from 'primereact/card';
const apiURL = import.meta.env.VITE_REST_API_URL;

const initialBlog = [
    {
        title: 'Blog title',
        category: 'blog category',
        image: 'https://primefaces.org/cdn/primereact/images/logo.png'
    },
    {
        title: 'Blog title',
        category: 'blog category',
        image: 'https://primefaces.org/cdn/primereact/images/logo.png'
    },
    {
        title: 'Blog title',
        category: 'blog category',
        image: 'https://primefaces.org/cdn/primereact/images/logo.png'
    },
    {
        title: 'Blog title',
        category: 'blog category',
        image: 'https://primefaces.org/cdn/primereact/images/logo.png',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur molestiae enim molestias animi in praesentium magni accusamus, et architecto cupiditate repellendus rerum nam facilis sit tempore mollitia nihil vero sed dolores ab quia. At quisquam officiis vero quasi ipsam incidunt!',
    },
    {
        title: 'Blog title',
        category: 'blog category',
        image: 'https://primefaces.org/cdn/primereact/images/logo.png'
    },
    {
        title: 'Blog title',
        category: 'blog category',
        image: 'https://primefaces.org/cdn/primereact/images/logo.png'
    },
];
const Home = () => {
    const [blogData, setBlogData] = useState(initialBlog);
    useEffect(() => {
        (async () => {
            const response = await fetch(`${apiURL}/blog`, {
                mode: 'no-cors',
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            // const resData = await response.json();
            // console.log(resData)
            if (response.ok) setBlogData([])
            console.log(response)
        })()
    }, [])


    return (
        <div className="container mx-auto">
            <h1 className="text-center text-5xl my-5">Welcome to the famous blogs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {
                    blogData?.map((blog, i) => {
                        return <div key={i}>
                            <Card
                                title={blog?.title}
                                subTitle={blog?.category}
                                header={<img alt="Card" className="" src={blog?.image} />}
                                footer={<div></div>}
                                className="md:w-25rem">
                            </Card>
                        </div>
                    })
                }
            </div>
        </div>
    );
};

export default Home;