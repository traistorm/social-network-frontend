import styles from "./post.module.scss"
import classNames from "classnames/bind";
import images from "../public/images";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useEffect } from "react";
import { useState } from "react";
import { getPost } from "../../api/api";
const cx = classNames.bind(styles)

const markdown = `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
![markdown.png](https://www.trustedreviews.com/wp-content/uploads/sites/54/2018/02/Age-of-Empires_Enemies.png)
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`;
const Post = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([]);
    const tag = window.location.pathname.split("/")[2]
    const id = window.location.pathname.split("/")[3]
    useEffect(() => {
        getPost(tag, id).then((res) => {
            setPost(res.data)
            setIsLoading(false)
        }, (err) => {
            setIsLoading(false)
        })
    }, [])
    return (
        <div className={cx('p-2', '', '')} style={{ height: "100%", width: "100%" }}>
            <div className={cx('ml-1', '', 'post-container')} style={{ height: "100%", width: "100%" }}>
                <div className="" style={{ height: "100%", width: "100%" }}>
                    <div className="p-2" style={{ height: "100%", width: "100%" }}>
                        <div className={cx('p-2', '', 'content-container')} style={{ height: "100%", width: "100%" }}>

                            <div className={cx('d-flex', 'justify-content-center')} style={{ width: "100%" }}>
                                <div style={{ width: "80%" }}>
                                    <div><Link>AOE DE</Link> &gt; <Link>{post.title}</Link></div>

                                    <div className={cx('post-time')}>May 1, 2022 </div>
                                    <h3 className={cx('title')}>{post.title}</h3>
                                    <ReactMarkdown className={cx('')}>

                                    </ReactMarkdown>
                                    <ReactMarkdown children={post.content} className={cx('image-describe', 'd-flex', 'justify-content-start')} />

                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
export default Post