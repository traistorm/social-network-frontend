import React from 'react';
import styles from "./message.module.scss"
import classNames from "classnames/bind";
import images from "../public/images";
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { getFriends, getFriendsOnline } from '../api/friend.api';
import { getMessage, getRoomSendMessage } from '../api/message.api';
import Cookies from "js-cookie";
import DefaultLayout from "../layout/defaultlayout";
import Home from "./home";
import Image from "next/image";

const cx = classNames.bind(styles)
var socket;
export default function Message() {
    const [lastPong, setLastPong] = useState(null);
    const [receiverId, setReceiverId] = useState(2)
    const [messages, setMessages] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendsFilter, setFriendsFilter] = useState([])
    const [friendsOnline, setFriendsOnline] = useState([]);
    const [friendsOnlineFilter, setFriendsOnlineFilter] = useState([])
    const [friendsSearchKeyword, setFriendsSearchKeyword] = useState()
    const [friendsOnlineSearchKeyword, setFriendsOnlineSearchKeyword] = useState()
    const [messageInput, setMessageInput] = useState()
    useEffect(() => {
        if (Cookies.get("userId") !== undefined) {
            var roomName = Cookies.get("userId") + "_" + receiverId
            //socket = io("127.0.0.1:8085?room=" + roomName + "&userId=1" + "&token=" + Cookies.get("token"));
            socket = io("127.0.0.1:8085?token=" + Cookies.get("token"));
            getMessage(Cookies.get("userId"), receiverId).then((res) => {
                setMessages(res.data)
                console.log(res.data);
            }, (err) => {
                console.log(err);
            })
            getFriends(Cookies.get("userId")).then((res) => {
                setFriends(res.data)
                setFriendsFilter(res.data)
                console.log(res.data);
            }, (err) => {
                console.log(err);
            })

        }

    }, []);
    useEffect(() => {
        if (Cookies.get("token") != undefined) {
            socket.on('get_message', data => {
                setMessages(prevMessage => [...prevMessage, { id: 3, senderId: data.senderId, receiverId: data.receiverId, content: data.message }])
                //test()
                //var prevMessage = [...messages]
                //prevMessage.push({ id: 3, senderId: 1, receiverId: 2, content: data.message })
                // setMessages(prevMessage)
            });
            return () => {
                socket.off('get_message');
            };
        }
    }, [])
    useEffect(() => {
        document.getElementById("message-content-container-id").scrollTo(0, document.getElementById("message-content-container-id").scrollHeight)
    }, [messages])
    //alert()
    useEffect(() => {
        //alert()
        if (Cookies.get("userId") !== undefined) {
            let roomName = Cookies.get("userId") + "_" + receiverId
            //setMessage([1])

            /* socket.emit("join_new_room", {
                "newRoom": Cookies.get("userId") + "_" + receiverId
            }); */
        }

    }, [receiverId]);
    const sendMessage = () => {
        getRoomSendMessage(Cookies.get("userId"), receiverId).then((res) => {
            socket.emit("send_message", {
                "type": "CLIENT",
                "message": messageInput,
                "room": res.data,
                "senderId": Cookies.get("userId"),
                "receiverId": receiverId
            });
            setMessages(prevMessage => [...prevMessage, {
                "senderId": Cookies.get("userId"),
                "receiverId": receiverId,
                "content": messageInput,
            }])
            setMessageInput("")
        }, (err) => {
            console.log(err);
        })

        //alert(message)
    }
    const handleSelectFriendToChat = (userId) => (e, data) => {
        //e.target.dataset.userid
        console.log(userId)
        if (Cookies.get("userId") !== undefined) {
            getMessage(Cookies.get("userId"), userId).then((res) => {
                setMessages(res.data)
                console.log(res.data);
                setReceiverId(userId)
            }, (err) => {
                console.log(err);
            })
        }
    }
    const handleChangeMessageInput = (e) => {
        setMessageInput(e.target.value)
    }
    const handleFriendsFilter = (e) => {
        setFriendsSearchKeyword(e.target.value)
        let results = []
        for (let i = 0; i < friends.length; i++) {
            const friend = friends[i];
            // Sử dụng phương thức indexOf() để tìm kiếm keyword trong tên thành phố
            if (friend.userInfo.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                results.push(friend);
            }
        }
        setFriendsFilter(results)
    }
    const handleClearFriendsOnlineSearch = () => {
        setFriendsOnlineSearchKeyword("")
    }

    return (
        <div className={cx('p-2', 'grid', 'grid-cols-12', 'gap-4')} style={{ height: "100%", width: "100%" }}>
            <div className={cx('col-span-3', 'p-1', 'contact-container')} style={{ height: "100%", width: "100%" }}>
                <div className={cx('search-contact-container', 'flex')}>
                    <div style={{ position: "relative" }}>
                        <input className={cx('search-contact-input')} type="text" value={friendsOnlineSearchKeyword} placeholder="Search contact..." onChange={handleFriendsFilter} />
                        <IconButton className={cx('clear-friends-online-search')} style={{ outline: "none" }} onClick={handleFriendsFilter}>
                            <CloseIcon />
                        </IconButton>
                    </div>

                </div>
                <div className={cx('contact-online-container')}>
                    <div className="flex" style={{ padding: "10px", overflowX: "auto" }}>
                        {friendsFilter.map(item => {
                            return (
                                <div className={cx('contact-online-item')} style={{ position: "relative", cursor: "pointer" }} data-userid={item.userId} onClick={handleSelectFriendToChat(item.userId)}>
                                    <Image className="mr-4" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%", position: "" }}  alt={"img"}/>
                                    <div style={{ position: "absolute", top: "13px", left: "20px" }}>
                                        <Image className={cx('icon-on-off')} src={images.circleGreen} style={{ width: "8px", height: "8px", borderRadius: "50%", position: "" }}  alt={"img"}/>
                                    </div>
                                    <div style={{ "fontSize": "12px" }}>{item.userInfo.name}</div>
                                </div>
                            )
                        })}
                    </div>

                </div>
                <div className={cx('contact-item-container')}>
                    <div className={cx('contact-item', 'mb-1')}>
                        <Image className="mr-4" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                        Hưng
                    </div>
                    <div className={cx('contact-item', 'mb-1')}>
                        <Image className="mr-4" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                        Hưng
                    </div>
                    <div className={cx('contact-item', 'mb-1')}>
                        <Image className="mr-4" src={images.thunder} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                        Hưng
                    </div>

                </div>
            </div>
            <div className={cx('col-span-9', 'flex', 'items-start', 'flex-col', '', 'message-container', 'h-full', 'w-full')} >
                <div className={cx('username-in-chat', 'flex', 'justify-center', 'items-center', 'mb-3', 'w-full')} >
                    <Image className="mr-2" src={images.thunder2} style={{ width: "30px", height: "30px", borderRadius: "50%", position: "" }}  alt={"img"}/>
                    <div className={cx('')} style={{ width: "100%" }}>
                        <div><strong>Hưng </strong></div>
                        <div className="" style={{ color: "green", fontSize: "12px" }}>(Active now)</div>
                    </div>
                    <IconButton style={{ outline: "none" }}>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className={cx('message-content-container', 'mb-2')} id='message-content-container-id' style={{ height: "100%", width: "100%" }}>
                    {messages.map(item => {
                        //alert(item.content)
                        if (item.senderId == 1) {
                            return (
                                <div className={cx('message-content-sender', 'ml-auto')} style={{ width: "70%" }}>
                                    <span >
                                        {item.content}
                                    </span>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className={cx('message-content-receiver')} style={{ width: "70%" }}>
                                    <span >
                                        {item.content}
                                    </span>
                                </div>
                            )
                        }
                    })}
                </div>

                <div style={{ height: "", width: "100%" }}>
                    <div className={cx('send-message-container')}>
                        <div style={{ position: "relative" }}>
                            <input className={cx('send-message-input')} id='send-message-input' type="text" value={messageInput} placeholder="Send something..." onChange={handleChangeMessageInput} />
                            <IconButton className={cx('emoji-message-button')}>
                                <Image className={cx('')} src={images.emoji} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                            </IconButton>
                            <IconButton className={cx('send-message-button')} style={{ outline: "none" }}>
                                <SendIcon color="primary" onClick={sendMessage} />
                            </IconButton>
                        </div>

                    </div>
                </div>


            </div>
        </div>

    )
}

Message.getLayout = function getLayout(page) {
    return (
        <DefaultLayout>{page}</DefaultLayout>
    )
}