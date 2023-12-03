import styles from "./discover-content.scss"
import classNames from "classnames/bind";
import images from "../../public/images";
import { Link } from "react-router-dom";
import { addPost, getAllPost } from "../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { Backdrop, Button, CircularProgress, IconButton, Modal, TextField, Typography } from "@mui/material";
import Cookies from "js-cookie";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from "react";
import TurndownService from "turndown";
import $ from 'jquery';
import { AddShoppingCart } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const cx = classNames.bind(styles)

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80vw",
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "10px"
};

export default function DiscoverContent () {
    const turndownService = new TurndownService()
    /* const markdown = turndownService.turndown(`
    <h1>JavaScript for Beginners</h1>
    <p>Follow <a href="https://attacomsian.com/blog">Atta</a> to learn <b>JavaScript</b> from scratch!</p>`)
    console.log(markdown) */
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState([]);
    const [isOpenModalAddPost, setIsOpenModalAddPost] = useState(false)
    const tag = window.location.pathname.split("/")[2]

    const [title, setTitle] = useState("");
    const [imageLink, setImageLink] = useState("")
    const [describe, setDescribe] = useState("")
    //alert(tag)
    useEffect(() => {
        getAllPost(tag).then((res) => {
            setPost(res.data)
            setIsLoading(false)
        }, (err) => {
            setIsLoading(false)
        })
    }, [])
    const handleOpenModalAddPost = () => {
        /* $(document).on('focusin', function (e) {
            if ($(e.target).closest(".mce-window").length) {
                e.stopImmediatePropagation();
            }
        }); */
        console.log(document.getElementsByClassName("cke_contents_ltr"))
        setIsOpenModalAddPost(true)
    }
    const handleCloseModalAddPost = () => {
        setIsOpenModalAddPost(false)
    }
    const handleSetTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleSetDescribe = (e) => {
        setDescribe(e.target.value)
    }
    const handleSetImageLink = (e) => {
        setImageLink(e.target.value)
    }
    const test = (event, editor) => {
        console.log(editor.getData())
    }
    const createPost = () => {
        let markdownData = turndownService.turndown(editorRef.current.getContent());
        console.log(editorRef.current.getContent())
        console.log(markdownData)
        addPost(markdownData, title, describe, imageLink).then((res) => {

        }, (err) => {

        })
    }

    return (
        <div className={cx('p-2', '', '')} style={{ height: "100%", width: "100%" }}>
            <div className={cx('ml-1', '', 'discover-content-container')}>

                {/* <button onClick={log}>Log editor content</button> */}
                {(() => {
                    if (Cookies.get("role") === "ROLE_ADMIN") {
                        return (
                            <div className="p-2">
                                {/* <Editor
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
                                    init={{
                                        plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable export',
                                        menubar: 'file edit view insert format tools table tc help',
                                        toolbar: 'undo redo | bold italic underline | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | insertfile image media link codesample',

                                    }}

                                />
                                <Button className="mt-2" variant="contained" style={{ backgroundColor: "green" }} onClick={createPost} endIcon={<AddIcon />}>
                                    Đăng bài
                                </Button> */}
                                <Button variant="contained" style={{ backgroundColor: "teal" }} onClick={handleOpenModalAddPost} endIcon={<AddIcon />}>
                                    Tạo bài viết
                                </Button>
                            </div>
                        )
                    }
                })()}
                <div className="">
                    {(() => {
                        if (isLoading) {
                            return (
                                <div></div>
                            )
                        }
                        else {
                            if (post.length == 0) {
                                return (
                                    <div className="p-2">Không có bài viết nào hiện tại</div>
                                )
                            }
                            else {
                                return (
                                    <div>
                                        {post.map(item => (
                                            <div className="p-2">
                                                <div className="mr-auto p-2" to={"/discover/aoe/" + item.id}>
                                                    <div className={cx('row', '', 'content-container')} style={{ position: "relative" }} >
                                                        <Link className={cx('col-lg-2')} to={"/discover/aoe/" + item.id}>
                                                            <div className={cx('p-2', 'image-content')}>
                                                                <img src={item.imageLink} />
                                                            </div>
                                                        </Link>
                                                        <div className={cx('col-lg-10')}>
                                                            <div className={cx('title', 'font-weight-bold')}>{item.title}</div>
                                                            <div className={cx('post-time')}>1 month ago</div>
                                                            <div className={cx('info')}>{item.describe}</div>
                                                            <div className={cx('author')}>By: <span>Traistorm</span></div>
                                                        </div>
                                                        <div style={{ position: "absolute", right: 0, top: 0 }}>
                                                            <IconButton color="primary" aria-label="add to shopping cart">
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton color="primary" aria-label="add to shopping cart">
                                                                <DeleteIcon />
                                                            </IconButton>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }

                        }
                    })()}
                    {/* <div className="p-2">
                        <Link to="/discover/aoe/1">
                            <div className={cx('row', '', 'content-container')}>
                                <div className={cx('col-lg-2')}>
                                    <div className={cx('p-2', 'image-content')}>
                                        <img src="https://tm.ibxk.com.br/2017/06/14/14110930589588.jpg" />
                                    </div>
                                </div>
                                <div className={cx('col-lg-10')}>
                                    <div className={cx('title', 'font-weight-bold')}>Death match AOE DE?</div>
                                    <div className={cx('post-time')}>1 month ago</div>
                                    <div className={cx('info')}>Strategy, unit counter and tip!</div>
                                    <div className={cx('author')}>By: <span>Traistorm</span></div>
                                </div>
                            </div>
                        </Link>

                    </div>


                    <div className="p-2">
                        <div className={cx('row', '', 'content-container')}>
                            <div className={cx('col-lg-2')}>
                                <div className={cx('p-2', 'image-content')}>
                                    <img src="https://i.guim.co.uk/img/media/eea6ec1c48fcc2dc3203dc5873cd9dd7feac84cd/0_130_5120_3072/master/5120.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=85db3293fcd91bee3e45ff705c9b05ba" />
                                </div>
                            </div>
                            <div className={cx('col-lg-10')}>
                                <div className={cx('title', 'font-weight-bold')}>Egypt in DM?</div>
                                <div className={cx('post-time')}>1 month ago</div>
                                <div className={cx('info')}>Strategy, courter units and tip!</div>
                                <div className={cx('author')}>By: <span>Traistorm</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className={cx('row', '', 'content-container')}>
                            <div className={cx('col-lg-2')}>
                                <div className={cx('p-2', 'image-content')}>
                                    <img src="https://www.north-korea-travel.com/image-files/choson-dynasty.jpg" />
                                </div>
                            </div>
                            <div className={cx('col-lg-10')}>
                                <div className={cx('title', 'font-weight-bold')}>Choson in DM?</div>
                                <div className={cx('post-time')}>1 month ago</div>
                                <div className={cx('info')}>Strategy, unit counter and tip!</div>
                                <div className={cx('author')}>By: <span>Traistorm</span></div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
                onClick={null}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Modal
                open={isOpenModalAddPost}
                onClose={handleCloseModalAddPost}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableEnforceFocus="true"
            >
                <Box sx={style}>
                    <h3 className="text-center">THÊM BÀI VIẾT</h3>
                    <TextField className="" id="outlined-basic" label="Title" variant="outlined" value={title} onChange={handleSetTitle} />
                    <br></br>
                    <TextField className="mt-2" id="outlined-basic" label="Describe" variant="outlined" value={describe} onChange={handleSetDescribe} />
                    <br></br>
                    <TextField className="mt-2 mb-2" id="outlined-basic" label="Image link demo" variant="outlined" value={imageLink} onChange={handleSetImageLink} />
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{
                            plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap mentions quickbars linkchecker emoticons advtable export',
                            menubar: '',
                            toolbar: 'undo redo | bold italic underline | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | insertfile image media link codesample',

                        }}
                    />
                    <Button className="mt-2" variant="contained" style={{ backgroundColor: "green" }} onClick={createPost} endIcon={<AddIcon />}>
                        Đăng bài
                    </Button>
                </Box>
            </Modal>
        </div>

    )
}
