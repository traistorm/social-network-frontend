import { useEffect, useState } from "react"
import images from "../public/images";
import styles from "./home.module.scss"
import classNames from "classnames/bind";
import { Box } from "@mui/system";
import { Button, FormControl, IconButton, InputLabel, MenuItem, NativeSelect, Select, TextField } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import GroupIcon from '@mui/icons-material/Group';
import ImageIcon from '@mui/icons-material/Image';
import { Delete } from "@mui/icons-material";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SettingsIcon from '@mui/icons-material/Settings';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as cheerio from 'cheerio';
import axios from "axios";
import Index from "../layout/defaultlayout";
import Image from "next/image";
const cx = classNames.bind(styles)
export default function Home () {
    const [minTemperature, setMinTemperature] = useState("0");
    const [maxTemperature, setMaxTemperature] = useState("0");
    const [currentTemperature, setCurrentTemperature] = useState("0");
    const [rainProbability, setRainProbability] = useState("");
    const [precipitation, setPrecipitation] = useState("");
    const [humidity, setHumidity] = useState("");
    const [time, setTime] = useState(1);
    const [hour, setHour] = useState(1);
    const [minute, setMinute] = useState(1);
    const [second, setSecond] = useState(1);
    const [date, setDate] = useState("");
    const [dayOfWeek, setDayOfWeek] = useState("");

    // const [useID, setUseID] = ""
    // const [userList, setUserList] = useState([{ userID: 1, status: 1 }, { userID: 2, status: 1 }, { userID: 3, status: 1 }, { userID: 4, status: 1 }])
    useEffect(() => {
        axios.get('https://www.accuweather.com/en/vn/hanoi/353412/current-weather/353412',)
            .then((response) => {
                if (response.status === 200) {
                    const html = response.data;
                    const $ = cheerio.load(html);
                    $(".temperature").map((i, section) => {
                        if (i === 2) {
                            setMaxTemperature($(section).text())
                        }
                        else if (i === 3) {
                            setMinTemperature($(section).text())
                        }

                    })
                    let result = "";
                    $(".half-day-card-content .panels .left .panel-item").map((i, section) => {

                        if (i === 3) {
                            result = $(section).text(); // Probability of Precipitation5%
                            result = result.substring(result.length - 2, result.length)
                            //alert(result)
                            setRainProbability(result)
                        }
                    })
                    $(".half-day-card-content .panels .right .panel-item").map((i, section) => {

                        if (i === 1) {
                            result = $(section).text(); // Probability of Precipitation5%
                            result = result.substring(result.length - 6, result.length)
                            setPrecipitation(result)
                            //alert(result)
                        }
                    })
                    $(".detail-item div").map((i, section) => {

                        if (i === 7) {
                            //alert($(section).text())
                            setHumidity($(section).text())
                        }
                        //console.log($(section).text());
                    })
                    $(".display-temp").map((i, section) => {

                        // if (i === 7) {

                        //     setHumidity($(section).text())
                        // }
                        setCurrentTemperature($(section).text());
                    })


                }
            }, (err) => console.log(err));
        //clearInterval(interval);
    }, []);
    useEffect(() => {
        const interval = setInterval(() => {
            let date = new Date()

            setHour(date.getHours());
            setMinute(date.getMinutes());
            setSecond(date.getSeconds());
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            let today = mm + '.' + dd + '.' + yyyy;
            setDate(today)
            setDayOfWeek(date.toLocaleDateString('en-US', {
                weekday: 'long',
            }),)
        }, 1000)

        return () => {
            clearInterval(interval);

        }
    }, [time])

    const test = () => {

    }
    const [age, setAge] = useState(10);

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const series = useState([{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }])
    const data = [
        {
            "name": "MON",
            "uv": 4000,
            "Temperature": 24,
            "amt": 2400
        },
        {
            "name": "TUE",
            "uv": 3000,
            "pv": 1398,
            "Temperature": 24,
            "amt": 2210
        },
        {
            "name": "WED",
            "uv": 2000,
            "Temperature": 16,
            "amt": 2290
        },
        {
            "name": "THU",
            "uv": 2780,
            "Temperature": 25,
            "amt": 2000
        },
        {
            "name": "FRI",
            "uv": 1890,
            "Temperature": 24,
            "amt": 2181
        },
        {
            "name": "SAT",
            "uv": 2390,
            "Temperature": 24,
            "amt": 2500
        },
        {
            "name": "SUN",
            "uv": 3490,
            "Temperature": 34,
            "amt": 2100
        }
    ]
    return (
        <div className={cx('p-2', 'grid grid-cols-8 gap-4')} style={{ height: "100%", width: "100%" }}>
            <div className={cx('col-span-6', 'news-feed-container')} style={{ borderRadius: "10px", height: "100%", width: "100%" }}>
                <div className={cx('p-3', 'post-status-container')} style={{ height: "30%" }}>
                    <div className="flex justify-start items-center p-1" style={{ height: "40%" }}>
                        <Image className="mr-4" src={images.avatar} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>

                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                    variant="standard"
                                    color="secondary"
                                >
                                    <MenuItem value={10}><PublicIcon color="secondary" className="mr-2" /> Public</MenuItem>
                                    <MenuItem value={20}><GroupIcon color="secondary" className="mr-2" /> Friends</MenuItem>
                                    <MenuItem value={30}><LockIcon color="secondary" className="mr-2" /> Only me</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                    </div>
                    <div className="p-1" style={{ height: "35%" }}>
                        <TextField
                            style={{ textAlign: 'left', minWidth: "200px", border: "" }}
                            hintText="Message Field"
                            floatingLabelText="MultiLine and FloatingLabel"
                            multiline
                            maxRows={1}
                            maxHeigh
                            fullWidth
                            placeholder="Typing somthing here....."
                            className={cx('')}
                            InputProps={{ disableUnderline: true }}
                            variant="standard"
                        />
                    </div>
                    <div className="" style={{ height: "25%" }}>
                        <Button variant="outlined" size="small" style={{ outline: "none" }}>
                            Post
                        </Button>
                        <IconButton style={{ outline: "none" }}>
                            <Image src={images.imageIcon} alt="img" style={{ width: "20px", height: "20px", outline: "none" }} />
                        </IconButton>
                    </div>
                </div>
                <div className={cx('status-container')} style={{ height: "70%", width: "100%" }}>
                    <div className={cx('status-item-container')} style={{ width: "100%" }}>
                        <div className="flex content-start items-center p-1" style={{ height: "40%", width: "100%" }}>
                            <Image className="mr-4" src={images.avatar} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                            <div style={{ width: "100%" }}>
                                <div className="" style={{ width: "100%" }}>
                                    <div className="d-flex" style={{ width: "100%" }}>
                                        <div className="">Traistorm</div>
                                        <div className="ml-auto">
                                            <IconButton style={{ outline: "none" }}>
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className="flex content-start items-center" style={{ marginTop: "-25px" }}>
                                        <div className="mr-1" style={{ fontSize: "14px", color: "gray" }}><strong>5h ago</strong></div>
                                        {/* <SettingsIcon style={{fontSize: "10px"}} /> */}
                                        <IconButton style={{ outline: "none" }}>
                                            <PublicIcon color="secondary" className="" />
                                        </IconButton>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="p-1" style={{ height: "" }}>
                            ABCD
                        </div>
                        <div className="p-1 " style={{ height: "20%" }}>

                            <IconButton style={{ outline: "none" }}>
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton style={{ outline: "none" }}>
                                <ThumbDownIcon />
                            </IconButton>
                            <IconButton style={{ outline: "none" }}>
                                <CommentIcon />
                            </IconButton>
                        </div>
                        <div className={cx('post-comment-item-container')}>
                            <TextField
                                style={{ textAlign: 'left', minWidth: "200px", border: "" }}
                                hintText="Message Field"
                                floatingLabelText="MultiLine and FloatingLabel"
                                multiline
                                maxRows={3}
                                maxHeigh
                                fullWidth
                                placeholder="Typing somthing here to comment....."
                                className={cx('')}
                                InputProps={{ disableUnderline: true }}
                                variant="standard"
                            />
                        </div>
                        <div className={cx('comment-item-container')}>
                            <div className="flex content-start items-center">
                                <Image className="mr-4" src={images.avatar} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                                <div>Traistorm<span style={{ fontSize: "12px", color: "gray" }}><strong>1h ago</strong></span></div>
                                <div className="ml-auto">
                                    <IconButton style={{ outline: "none" }}>
                                        <MoreHorizIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div>Good status</div>
                        </div>
                    </div>
                    <div className={cx('status-item-container')} style={{ width: "100%" }}>
                        <div className="d-flex justify-content-start align-items-center p-1" style={{ height: "40%", width: "100%" }}>
                            <Image className="mr-4" src={images.avatar} style={{ width: "30px", height: "30px", borderRadius: "50%" }}  alt={"img"}/>
                            <div style={{ width: "100%" }}>
                                <div className="" style={{ width: "100%" }}>
                                    <div className="d-flex" style={{ width: "100%" }}>
                                        <div className="">Traistorm</div>
                                        <div className="ml-auto">
                                            <IconButton style={{ outline: "none" }}>
                                                <MoreHorizIcon />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center" style={{ marginTop: "-25px" }}>
                                        <div className="mr-1"><strong>5h ago</strong></div>
                                        {/* <SettingsIcon style={{fontSize: "10px"}} /> */}
                                        <IconButton style={{ outline: "none" }}>
                                            <PublicIcon color="secondary" className="" />
                                        </IconButton>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="p-1" style={{ height: "" }}>
                            ABCD
                        </div>
                        <div className="p-1 " style={{ height: "20%" }}>

                            <IconButton style={{ outline: "none" }}>
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton style={{ outline: "none" }}>
                                <ThumbDownIcon />
                            </IconButton>
                            <IconButton style={{ outline: "none" }}>
                                <CommentIcon />
                            </IconButton>
                        </div>
                    </div>

                </div>

            </div>
            <div className="col-span-2 flex flex-col">
                <div className={cx('', 'weather-container', '')} style={{ borderRadius: "10px", height: "60%", width: "100%" }}>
                    <section class="weatherCard partialy-cloudy" style={{ height: "100%", width: "100%" }}>
                        <div style={{ height: "50%", width: "100%" }}>
                            <div class={cx('title', 'font-weight-bold', 'text-center')} style={{}}>Weather Today</div>
                            <div class={cx('title__container', 'flex', 'justify-center', 'items-center')}>
                                <div class={cx('weatherIcon')} ><i class="fa-solid fa-cloud-sun"></i></div>
                                <div>

                                    <div class="city">
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-standard-label" color="success" style={{ color: "orange" }}>City</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="demo-simple-select-standard"
                                                value={age}
                                                onChange={handleChange}
                                                label="Age"
                                                color="success"
                                                style={{ color: "yellow", backgroundColor: "rgb(40, 40, 40)", padding: "3px" }}
                                            >
                                                <MenuItem value={10}><strong>Hà Nội</strong></MenuItem>
                                                <MenuItem value={20}><strong>Bắc Ninh</strong></MenuItem>
                                                <MenuItem value={30}><strong>TP.HCM</strong></MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="main mb-2">
                                <div className={cx('temperature', 'flex', 'justify-center', 'space-x-10')}>
                                    <div className={cx('min-temperature', 'mb-1')}>
                                        <Image src={images.minTemp}  alt={"img"}/>
                                        <span>{minTemperature}C</span>
                                    </div>
                                    <div className={cx('current-temperature', 'mb-1')}>
                                        <Image src={images.currentTemp}  alt={"img"}/>
                                        <span>{currentTemperature}</span>
                                        {/* ºC */}
                                    </div>
                                    <div className={cx('max-temperature', 'mb-1')}>
                                        <Image src={images.maxTemp}  alt={"img"}/>
                                        <span>{maxTemperature}C</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('info__container', "p-1", 'flex', 'justify-center')}>
                                <div>
                                    <div className={cx('info', 'pressure', 'flex', 'justify-start')}>
                                        {/* <div class={cx('info-title')}><img src={images.Humidity} /></div> */}
                                        <span >Humidity : &nbsp;</span>
                                        <div className={cx('info-value')}>{humidity}</div>
                                    </div>
                                    <div className={cx('info', 'pressure', 'flex', 'justify-start')}>
                                        {/* <div class={cx('info-title')}><img src={images.Rain} /></div> */}
                                        <span >Probability of Precipitation : &nbsp;</span>
                                        <div className={cx('info-value')}>{rainProbability}</div>
                                    </div>
                                    <div className={cx('info', 'pressure', 'flex', 'justify-start')}>
                                        {/* <div class={cx('info-title')}><img src={images.Precipitation} /></div> */}
                                        <span >Precipitation : &nbsp;</span>
                                        <div className={cx('info-value')}>{precipitation}</div>
                                    </div>
                                </div>

                            </div>
                            <div className={cx('time-container', "p-1", 'flex', 'justify-center')}>
                                <div className={cx('time-container-info')}>
                                    <div className={cx('time')}>{hour + " : " + minute + " : " + second}</div>
                                    <div className={cx('weekday')}>{dayOfWeek + ", " + date}</div>
                                    {/* <div className={cx('date')}>{date}</div> */}

                                </div>

                            </div>
                        </div>
                    </section>

                </div>
                <div className={cx('terminal', 'mt-auto')} style={{ borderRadius: "10px", height: "38%", width: "100%" }}>
                    <div>Can I help you?</div>
                    <div className="flex justify-start items-center">
                        <div className="" style={{ width: "15%" }}>&gt;:</div>
                        <input autoFocus className="" type="text" placeholder="" style={{ width: "85%" }} />
                    </div>

                </div>
            </div>
        </div>
    )
}

Home.getLayout = function getLayout(page) {
    return (
        <Index>{page}</Index>
    )
}