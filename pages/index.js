import Head from 'next/head';
import styles from './index.module.scss';
import { Backdrop, Box, CircularProgress, Modal, Typography } from "@mui/material";
import { login } from '../api/login.api.js';
import React, { useState } from 'react'
import Cookies from 'js-cookie';
import classNames from "classnames/bind";
const cx = classNames.bind(styles)

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = () => {
    setIsLoading(true)
    login(username, password).then((res) => {
      setIsLoading(false)
      //const obj = JSON.parse(res.data);
      console.log(res.data)

      // Set cookies
      Cookies.set("token", res.data.token)
      Cookies.set("roles", res.data.roles[0])
      Cookies.set("userId", res.data.userId)

      //console.log(Cookies.get("role"))
      if (res.data.roles[0] === "ROLE_USER" || res.data.roles[0] === "ROLE_ADMIN") {
        window.location.href = "/home"
      }
      //window.location.href = "/home"
    }, (err) => {
      setIsLoading(false)
    })
  }
  const handleChangeUsername = (e) => {
    setUsername(e.target.value)
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value)
  }
  return (
      <>
        <div className={cx('login-body')}>
          <div className={cx('login-container')}>
            <div className={cx('drop')}>
              <div className={cx('content')}>
                <h2 class='animate__heartBeat'>LOGIN</h2>
                <form action="">
                  <div className={cx('input-box')}>
                    <input value={username} type="text" name="username" placeholder="Username" onChange={handleChangeUsername} />
                  </div>
                  <div className={cx('input-box')}>
                    <input value={password} type="password" name="password" placeholder="Password" onChange={handleChangePassword} />
                  </div>
                  <div className={cx('input-box')}>
                    <input onClick={loginUser} className={cx('input-box-submit')} type="button" value="Login" />
                  </div>
                </form>
              </div>
            </div>
            <a href="#" className={cx('btn')}>Forgot Password</a>
            <a href="#" className={cx('btn', 'signup')}>Signup</a>
          </div>
          <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
              onClick={null}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </>
  );
}
