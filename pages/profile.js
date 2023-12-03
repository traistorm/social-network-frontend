import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./profile.module.scss"
import classNames from "classnames/bind";
const cx = classNames.bind(styles)
export default function Profile () {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://cors-anywhere.herokuapp.com/https://bongda24h.vn/");
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();

        //alert()
    }, []);
    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <div className={cx('p-2', '', '')} style={{ height: "100%", width: "100%" }}>
            <div className={cx('', '', 'profile-container')} style={{ height: "100%", width: "100%" }}>
                ABCD
            </div>
        </div>

    )
}
