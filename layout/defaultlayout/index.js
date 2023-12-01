import Footer from "../../components/footer";
import Header from "../../components/header";
import GroupIcon from '@mui/icons-material/Group';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import classNames from "classnames/bind";
import styles from "./defautLayout.module.scss";
import images from "../../public/images";
import Image from "next/image";

const cx = classNames.bind(styles)

export default function DefaultLayout({ children }) {
    return (
        <div className={cx('')} >
            <div className="" style={{ minHeight: "100vh" }} >
                <div className={cx('page-container', 'h-full')} >
                    <div style={{ height: "10%" }}>
                        <Header className="flex items-center" />
                    </div>

                    <div className="grid grid-cols-6 gap-4 mt-2" style={{ height: "80%" }}>
                        <div className={cx('col-span-1', 'friends-groups-container', 'p-2', 'flex', 'flex-col')} style={{ height: "100%" }}>
                            <div className={cx('friends-container', 'p-2')}>
                                <div className="flex justify-start" >
                                    <div className={cx('p-1', 'mr-2', 'friends-icon')} style={{ borderRadius: "4px" }}>
                                        <Diversity3Icon />
                                    </div>

                                    <div className="d-flex align-items-center font-weight-bold" style={{color: "teal"}}> FRIENDS</div>
                                </div>
                                <div className={cx('mt-2', 'friends-list-container')} >
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                                        <span>Friends A</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                                        <span>Friends B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                                        <span>Friends B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Friends B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Friends B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Friends B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Friends B</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('groups-container', 'p-2', 'mt-auto')}>
                                <div className="flex justify-start">
                                    <div className={cx('p-1', 'mr-2', 'groups-icon')} style={{ borderRadius: "4px" }}>
                                        <GroupIcon />
                                    </div>

                                    <div className="flex items-center font-weight-bold" style={{color: "teal"}}> GROUPS</div>
                                </div>
                                <div className={cx('mt-2', 'groups-list-container')} >
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.Group} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Group A</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.Group} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Group B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.Group} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Group B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.Group} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Group B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.Group} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Group B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.Group} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Group B</span>
                                    </div>
                                    <div className="mb-2">
                                        <Image className="mr-2" src={images.Group} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} />
                                        <span>Group B</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 h-full">
                            {/* <Sidebar /> */}
                            <div className={cx('content', 'h-full', 'w-full')} >
                                {children}
                            </div>
                        </div>

                    </div>
                    <div style={{ height: "10%" }}>
                        <Footer className="flex items-center h-full" />
                        {/* <div className="d-flex align-items-center" >Footer</div> */}
                    </div>

                </div>

            </div>

        </div>
    );
}