import styles from "./discover.module.scss"
import classNames from "classnames/bind";
import images from "../public/images";
import React, { useEffect } from "react";
import { getCategoryPost } from "../api/post.api";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../layout/defaultlayout";
import Message from "./message";
const cx = classNames.bind(styles)


export default function Discover () {
    const [isLoading, setIsLoading] = useState(true);
    const [categoryPost, setCategoryPost] = useState([]);
    useEffect(() => {
        getCategoryPost().then((res) => {
            setCategoryPost(res.data)
            setIsLoading(false)
        }, (err) => {
            setIsLoading(false)
        })
    }, [])
    return (
        <div className={cx('p-2', '', '')} style={{ height: "100%", width: "100%" }}>
            {(() => {
                if (isLoading) {
                    return (
                        <div></div>
                    )
                }
                else {
                    return (
                        <div className={cx('ml-1', 'row', 'd-flex', 'justify-content-around', 'align-items-center', '', 'discover-container')}>
                            {categoryPost.map(item => (
                                <div className={cx('d-flex', 'justify-content-center', 'align-items-center', 'col-lg-4')} style={{ height: "100%" }}>
                                    <div className={cx('container')}>
                                        <div className={cx('card')}>
                                            <div className={cx('imgBx')}>
                                                <Image src={item.imageLink}  alt={"img"}/>
                                            </div>
                                            <div className={cx('contentBx')}>
                                                <h3 className="mb-2">{item.name}</h3>
                                                <div className={cx('color')}>
                                                    <p>{item.describe}</p>
                                                </div>
                                                <Link href={"/discover/" + item.tag}>Read now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )

                }
            })()}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={null}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>

    )
}

Discover.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}