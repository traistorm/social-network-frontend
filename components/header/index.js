import images from "../../public/images"
import classNames from "classnames/bind";
import styles from "./header.module.scss"
import { useEffect, useState } from "react";
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Tippy from '@tippyjs/react';
import "tippy.js/dist/tippy.css";
import Snowfall from "react-snowfall";
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import Image from "next/image";

const cx = classNames.bind(styles)
const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
        color: "red",
        backgroundColor: "pink"
    }
});
export default function Header () {

    const [selectHome, setSelectHome] = useState(false)
    const [selectDiscover, setSelectDiscover] = useState(false)
    const [selectMessage, setSelectMessage] = useState(false)
    const [isNotificationEnable, setIsNotificationEnable] = useState(false);
    const [isMenuEnable, setIsMenuEnable] = useState(false);
    const snowObject = <Snowfall style={{ zIndex: 5, position: "fixed" }} />
    const [snow, setSnow] = useState(null)
    const selectHomePage = () => {
        setSelectHome(true)
        setSelectDiscover(false)
        setSelectMessage(false)
    }
    const selectDiscoverPage = () => {
        setSelectHome(false)
        setSelectDiscover(true)
        setSelectMessage(false)
    }
    const selectMessagePage = () => {
        setSelectHome(false)
        setSelectDiscover(false)
        setSelectMessage(true)
    }
    const addClass = () => {
        setSelectHome(false)
        setSelectDiscover(false)
        setSelectMessage(true)
    }
    const handleOpenNotification = () => {
        setIsNotificationEnable(true)
    }
    const handleCloseNotification = () => {
        setIsNotificationEnable(false)
    }
    const handleOpenMenu = () => {
        setIsMenuEnable(true)
    }
    const handleCloseMenu = () => {
        setIsMenuEnable(false)
    }
    const handleEnableSnow = () => {
        setSnow(snowObject)
    }
    const handleDisableSnow = () => {
        setSnow(null)
    }

    useEffect(() => {
        let path = window.location.pathname;
        if (path === "/mome" || path === "/") {
            setSelectHome(true);
        }
        else if (path === "/message") {
            setSelectMessage(true);
        }
    }, [])
    return (
        <div className="grid grid-cols-6 mt-2 p-2 place-items-center" style={{ height: "100%" }}>
            <div className={cx('col-span-1', 'w-full')}>
                <div className={"flex justify-start items-center ml-2"}>
                    <div className={cx('page-logo')}>
                        <Image src={images.sun} alt="sun" />
                    </div>
                    <div className={cx('search-contact-container', 'flex')}>
                        <div style={{ position: "relative" }}>
                            <input className={cx('search-contact-input')} type="text" value="" placeholder="Search contact..." />
                            <IconButton className={cx('search-contact-button')} style={{ outline: "none" }}>
                                <SearchIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-4 grid grid-cols-6 place-items-center">
                <div className={selectHome ? cx('col-span-2', 'flex', 'justify-center', 'selected-tab', 'p-3') : cx('col-span-2', 'flex', 'justify-center', 'p-3')}>
                    <div className={cx('text-center', 'text-white', 'tab')} data-tabname={"Home"}><Link onClick={selectHomePage} href="/home">Home</Link></div>
                </div>
                <div className={selectMessage ? cx('col-span-2', 'flex', 'justify-center', 'selected-tab', 'p-3') : cx('col-span-2', 'flex', 'justify-center', 'p-3')}>
                    <div className={cx('text-center', 'text-white', 'tab')} data-tabname={"Discover"}><Link onClick={selectMessagePage} href="/message">Message</Link></div>
                </div>
                <div className={selectDiscover ? cx('col-span-2', 'flex', 'justify-center', 'selected-tab', 'p-3') : cx('col-span-2', 'flex', 'justify-center', 'p-3')}>
                    <div className={cx('text-center', 'text-white', 'tab')} data-tabname={"Message"}><Link onClick={selectDiscoverPage} href="/discover">Discover</Link></div>
                </div>

            </div>
            <div className="text-white col-span-1 w-full">
                <div className={"flex justify-end items-center mr-2"}>
                    <Tippy className={cx('notification', 'mr-2')}
                           interactive="true"
                           placement="bottom" arrow={false} onClickOutside={handleCloseNotification} visible={isNotificationEnable} content={
                        <div className="">
                            <div className={cx('p-2', 'unread-notification', 'mb-1')}><Image className="mr-2" src={images.thunder2} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/><span>Hung sent message to you!</span></div>
                            <div className={cx('p-2', 'unread-notification', 'mb-1')}><Image className="mr-2" src={images.thunder2} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} /><span>Hung sent message to you!</span></div>
                            <div className={cx('p-2', 'unread-notification', 'mb-1')}><Image className="mr-2" src={images.thunder2} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} /><span>Hung sent message to you!</span></div>
                            <div className={cx('p-2', 'read-notification', 'mb-1')}><Image className="mr-2" src={images.thunder2} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"} /><span>Hung sent message to you!</span></div>
                        </div>
                    }>
                        <Badge className="mr-3" badgeContent={5} color="success" style={{ color: "white" }} sx={{
                            "& .MuiBadge-badge": {
                                color: "lightgreen",
                                backgroundColor: "red"
                            }
                        }}>
                            <NotificationsIcon onClick={handleOpenNotification}></NotificationsIcon>
                        </Badge>
                    </Tippy>

                    <Tippy className={cx('menu', 'mr-2')}
                           interactive="true"
                           placement="bottom" arrow={false} onClickOutside={handleCloseMenu} visible={isMenuEnable} content={
                        <div className="">
                            {(() => {
                                if (snow == null) {
                                    return (
                                        <div onClick={handleEnableSnow} className={cx('p-1', 'menu-item')}><Image src={images.snow} className={cx('image-icon-menu')}  alt={"img"}/><span onClick={handleEnableSnow}> Enable snow</span></div>
                                    )
                                }
                                else {
                                    return (
                                        <div onClick={handleDisableSnow} className={cx('p-1', 'menu-item')}><Image src={images.snow} className={cx('image-icon-menu')}  alt={"img"} /><span onClick={handleEnableSnow}> Disable snow</span></div>
                                    )
                                }
                            })()}

                            <div className={cx('p-1', 'menu-item')}><Image src={images.changePassword} className={cx('image-icon-menu')}  alt={"img"} /><span>Change password</span></div>
                            <div className={cx('p-1', 'menu-item')}><Image src={images.logout} className={cx('image-icon-menu')}  alt={"img"} /><span>Logout</span></div>
                        </div>
                    }>
                        <div onClick={handleOpenMenu} className={cx('avatar-icon-container')}>
                            <Image src={images.avatar}  alt={"img"} />
                        </div>
                    </Tippy>
                </div>
            </div>
            {snow}
        </div>
    )
}