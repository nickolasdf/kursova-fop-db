import React, { memo } from "react";
import "./style.scss";
import { uploadUserImage } from "../../../reducers/Profile/actions";
import connect from "react-redux/es/connect/connect";
import requests from "../../../requests";

class UploadImageDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image_selected: false,
            model: {
                crop_height: 250,
                error_dialog: false,
                dropArea: null,
                highlight_class: false,
                image_selected: false,
                img_src: "",
                zoom_ratio: 100,
                result: null,
                avatar_margin_top: 0,
                avatar_margin_left: 0,
                show_spiner: false,
                loaded: false,
                previewFile: null
            },
            zoom_ratio: 100
        };

        this.dialog = React.createRef();
        this.zoom_ratio = React.createRef();
        this.drop_down = React.createRef();
        this.hole = React.createRef();
        this.zoom_ratio = React.createRef();

        this.preventDefaults = this.preventDefaults.bind(this);
        this.highlight = this.highlight.bind(this);
        this.unhighlight = this.unhighlight.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.changeZoom = this.changeZoom.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
        this.getFiles = this.getFiles.bind(this);
        this.previewFile = this.previewFile.bind(this);
        this.reset = this.reset.bind(this);
        this.crop = this.crop.bind(this);
        this.upload = this.upload.bind(this);
        this.ontouchmove = this.ontouchmove.bind(this);
    }

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    highlight(e) {
        // this.highlight_class = true;
        // $("#drop_down").addClass("highlight");
        let dropArea = this.drop_down.current;
        dropArea.classList.add("highlight");
        console.log("highlight_class true");
    }

    unhighlight(e) {
        // this.highlight_class = false;
        // $("#drop_down").removeClass("highlight");
        let dropArea = this.drop_down.current;
        dropArea.classList.remove("highlight");
        console.log("highlight_class false");
    }

    handleDrop(e) {
        var dt = e.dataTransfer;
        var files = dt.files;

        this.handleFiles(files);
    }

    changeZoom() {
        let zoom_value = document.querySelector("#zoom_ratio").value;

        // console.log(zoom_value.value);

        this.setState(prevState => {
            let model = Object.assign({}, prevState.model);
            model.zoom_ratio = zoom_value;
            return { model };
        });
        this.setStyle();
    }

    handleFiles(files) {
        files = [...files];

        if (files.length === 1) {
            // model.image_selected = true;
            this.setState({
                image_selected: true
            });
            this.previewFile(files[0]);
        }
    }

    getFiles() {
        let files = document.querySelector("#upload-image-input").files;

        if (files.length === 1) {
            this.setState({
                image_selected: true
            });
            this.previewFile(files[0]);
        }
    }

    setStyle() {
        let img = document.querySelector("#photo_zoom_image");
        img.style.height = this.state.model.zoom_ratio + "%";
        img.style.marginTop = this.state.model.avatar_margin_top + "px";
        img.style.marginLeft = this.state.model.avatar_margin_left + "px";
    }

    ontouchmove(e) {
        console.log("e", e);
        // 1. отследить нажатие

        let start_x = null;
        let start_y = null;
        let start_margin_top = null;
        let start_margin_left = null;
        const crop_height = this.state.model.crop_height;

        if (!start_x) {
            start_x = e.pageX;
            start_margin_top = this.state.model.avatar_margin_top;
            start_margin_left = this.state.model.avatar_margin_left;
        }

        if (!start_y) {
            start_y = e.pageY;
        }

        var moveAt = e => {
            let img = document.querySelector("#photo_zoom_image");

            let image_height = img.clientHeight;
            let image_width = img.clientWidth;
            let max_margin_y = Math.abs(image_height - crop_height) / 2;
            let max_margin_x = Math.abs(image_width - crop_height) / 2;

            // console.log(image_width);

            this.setState(prevState => {
                let model = Object.assign({}, prevState.model);

                model.avatar_margin_top =
                    Math.abs(start_margin_top + e.pageY - start_y) <=
                    max_margin_y
                        ? start_margin_top + e.pageY - start_y
                        : max_margin_y *
                          Math.sign(start_margin_top + e.pageY - start_y);
                model.avatar_margin_left =
                    Math.abs(start_margin_left + e.pageX - start_x) <=
                    max_margin_x
                        ? start_margin_left + e.pageX - start_x
                        : max_margin_x *
                          Math.sign(start_margin_left + e.pageX - start_x);

                return { model };
            });

            this.setStyle();
        };

        // 3, перемещать по экрану
        document.onmousemove = e => {
            moveAt(e);
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            hole.onmouseup = null;
        };
    }

    previewFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            let img = document.querySelector("#photo_zoom_image");
            this.setState(prevState => {
                let model = Object.assign({}, prevState.model);
                model.img_src = reader.result;
                return { model };
            });
            img.src = this.state.model.img_src;
        };

        //drag image

        const hole = document.querySelector("#hole");

        if (hole) {
            hole.onmousedown = e => {
                console.log("e", e);
                // 1. отследить нажатие

                let start_x = null;
                let start_y = null;
                let start_margin_top = null;
                let start_margin_left = null;
                const crop_height = this.state.model.crop_height;

                if (!start_x) {
                    start_x = e.pageX;
                    start_margin_top = this.state.model.avatar_margin_top;
                    start_margin_left = this.state.model.avatar_margin_left;
                }

                if (!start_y) {
                    start_y = e.pageY;
                }

                var moveAt = e => {
                    let img = document.querySelector("#photo_zoom_image");

                    let image_height = img.clientHeight;
                    let image_width = img.clientWidth;
                    let max_margin_y = Math.abs(image_height - crop_height) / 2;
                    let max_margin_x = Math.abs(image_width - crop_height) / 2;

                    // console.log(image_width);

                    console.log("img", img.clientHeight);
                    console.log("img", img.clientWidth);

                    this.setState(prevState => {
                        let model = Object.assign({}, prevState.model);

                        model.avatar_margin_top =
                            Math.abs(start_margin_top + e.pageY - start_y) <=
                            max_margin_y
                                ? start_margin_top + e.pageY - start_y
                                : max_margin_y *
                                  Math.sign(
                                      start_margin_top + e.pageY - start_y
                                  );
                        model.avatar_margin_left =
                            Math.abs(start_margin_left + e.pageX - start_x) <=
                            max_margin_x
                                ? start_margin_left + e.pageX - start_x
                                : max_margin_x *
                                  Math.sign(
                                      start_margin_left + e.pageX - start_x
                                  );

                        return { model };
                    });

                    this.setStyle();
                };

                // 3, перемещать по экрану
                document.onmousemove = e => {
                    moveAt(e);
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    hole.onmouseup = null;
                };
            };

            hole.ontouchstart = e => {
                console.log("e", e.changedTouches[0].pageX);
                // 1. отследить нажатие

                let start_x = null;
                let start_y = null;
                let start_margin_top = null;
                let start_margin_left = null;
                // const crop_height = this.state.model.crop_height;
                let img = document.querySelector("#hole");
                const crop_height = img.clientHeight;

                if (!start_x) {
                    start_x = e.changedTouches[0].pageX;
                    start_margin_top = this.state.model.avatar_margin_top;
                    start_margin_left = this.state.model.avatar_margin_left;
                }

                if (!start_y) {
                    start_y = e.changedTouches[0].pageY;
                }

                var moveAt = e => {
                    console.log("move", e.changedTouches[0].pageX);
                    let img = document.querySelector("#photo_zoom_image");

                    // console.log("img", img.clientHeight);
                    // console.log("img", img.offsetHeight);

                    let image_height = img.clientHeight;
                    let image_width = img.clientWidth;
                    let max_margin_y = Math.abs(image_height - crop_height) / 2;
                    let max_margin_x = Math.abs(image_width - crop_height) / 2;

                    // console.log(image_width);

                    this.setState(prevState => {
                        let model = Object.assign({}, prevState.model);

                        model.avatar_margin_top =
                            Math.abs(
                                start_margin_top +
                                    e.changedTouches[0].pageY -
                                    start_y
                            ) <= max_margin_y
                                ? start_margin_top +
                                  e.changedTouches[0].pageY -
                                  start_y
                                : max_margin_y *
                                  Math.sign(
                                      start_margin_top +
                                          e.changedTouches[0].pageY -
                                          start_y
                                  );
                        model.avatar_margin_left =
                            Math.abs(
                                start_margin_left +
                                    e.changedTouches[0].pageX -
                                    start_x
                            ) <= max_margin_x
                                ? start_margin_left +
                                  e.changedTouches[0].pageX -
                                  start_x
                                : max_margin_x *
                                  Math.sign(
                                      start_margin_left +
                                          e.changedTouches[0].pageX -
                                          start_x
                                  );

                        return { model };
                    });

                    this.setStyle();
                };

                // 3, перемещать по экрану
                document.ontouchmove = e => {
                    moveAt(e);
                };

                document.ontouchend = () => {
                    document.ontouchmove = null;
                    hole.ontouchend = null;
                };
            };
        }
    }

    reset() {
        let upload_image_form = document.querySelector("#upload_image_form");
        upload_image_form.reset();

        this.setState(
            (this.state = {
                model: {
                    crop_height: 250,
                    error_dialog: false,
                    dropArea: null,
                    highlight_class: false,
                    image_selected: false,
                    img_src: "",
                    zoom_ratio: 100,
                    result: null,
                    avatar_margin_top: 0,
                    avatar_margin_left: 0,
                    show_spiner: false,
                    loaded: false,
                    previewFile: null
                },
                zoom_ratio: 100
            })
        );
        this.setStyle();
        this.setState(
            (this.state = {
                image_selected: false
            })
        );
    }

    crop() {
        const crop_canvas = document.createElement("canvas");
        // const ctx = crop_canvas.getContext('2d');
        const img = new Image();
        img.src = this.state.model.img_src;

        let crop_img = document.querySelector("#hole");

        let Width = crop_img.clientHeight;
        let Height = crop_img.clientHeight;
        let sWidth = img.width / (this.state.model.zoom_ratio / 100);
        let sHeight = img.height / (this.state.model.zoom_ratio / 100);
        let dWidth = (Height / img.height) * img.width;
        let dHeight = (Height / img.height) * img.height;
        let sLeft =
            (img.width - sWidth) / 2 -
            (this.state.model.avatar_margin_left * (img.height / Height)) /
                (this.state.model.zoom_ratio / 100);
        let sTop =
            (img.height - sHeight) / 2 -
            (this.state.model.avatar_margin_top * (img.height / Height)) /
                (this.state.model.zoom_ratio / 100);
        let dLeft = -(dWidth - Width) / 2;
        let dTop = -(dHeight - Height) / 2;

        crop_canvas.width = Width;
        crop_canvas.height = Height;
        crop_canvas
            .getContext("2d")
            .drawImage(
                img,
                sLeft,
                sTop,
                sWidth,
                sHeight,
                dLeft,
                dTop,
                dWidth,
                dHeight
            );

        this.setState(prevState => {
            let model = Object.assign({}, prevState.model);
            model.result = crop_canvas.toDataURL("image/jpeg");
            return { model };
        });

        if (!!this.props.userId) {
            requests.User.changeImage(this.props.userId, {
                image: crop_canvas.toDataURL("image/jpeg")
            }).then(res => this.props.setImage(res.data.data.image));
        } else {
            this.props.dispatch(
                uploadUserImage({
                    image: crop_canvas.toDataURL("image/jpeg")
                })
            );
        }

        //Preview
        // let result_img = document.querySelector("#result");
        // result_img.src = this.state.model.result;
        // result_img.src = crop_canvas.toDataURL("image/jpeg");
    }

    upload() {
        this.crop();
        this.reset();
        this.props.closeForm();
    }

    initListeners() {
        let dropArea = this.drop_down.current;

        console.log(1);

        if (dropArea) {
            console.log(2);

            // Prevent default drag behaviors
            ["dragenter", "dragover", "dragleave", "drop"].forEach(
                eventName => {
                    dropArea.addEventListener(
                        eventName,
                        this.preventDefaults,
                        false
                    );
                    document.body.addEventListener(
                        eventName,
                        this.preventDefaults,
                        false
                    );
                }
            );

            // Highlight drop area when item is dragged over it
            ["dragenter", "dragover"].forEach(eventName => {
                dropArea.addEventListener(eventName, this.highlight, false);
            });

            ["dragleave", "drop"].forEach(eventName => {
                dropArea.addEventListener(eventName, this.unhighlight, false);
            });

            dropArea.addEventListener("drop", this.handleDrop, false);
        }
    }

    componentDidMount() {
        this.initListeners();
    }

    render() {
        console.log(!!this.props.userId, "tralala");
        return (
            <div className="upload-image-dialog__wrapper">
                <div className="header">Загрузить аватар</div>
                <div className="body">
                    <div
                        v-show="!image_selected"
                        className="popup-body"
                        style={{
                            display: this.state.image_selected ? "none" : "flex"
                        }}
                    >
                        <label
                            id="drop_down"
                            ref={this.drop_down}
                            htmlFor="upload-image-input"
                            className="drop-down"
                        >
                            <i className="fa fa-arrow-up"></i>
                        </label>
                        <form id="upload_image_form" ref="upload_image_form">
                            <div className="nav">
                                <label>
                                    Перетащите изображение для загрузки или
                                </label>
                                <label
                                    htmlFor="upload-image-input"
                                    className="choose-file"
                                >
                                    Выберите изображение
                                </label>
                                <input
                                    id="upload-image-input"
                                    ref="upload_image_input"
                                    type="file"
                                    hidden
                                    onChange={this.getFiles}
                                />
                            </div>
                        </form>
                    </div>

                    <div
                        v-show="image_selected"
                        className="popup-body-crop"
                        style={{
                            display: !this.state.image_selected
                                ? "none"
                                : "flex"
                        }}
                    >
                        <div className="photo-zoom">
                            <img
                                id="photo_zoom_image"
                                ref="photo_zoom_image"
                                className="photo_zoom_image"
                            />
                            <div
                                id="hole"
                                ref={this.hole}
                                className="hole"
                            ></div>
                        </div>
                        <div className="range">
                            <label>Zoom</label>
                            <input
                                id="zoom_ratio"
                                ref="zoom_ratio"
                                type="range"
                                min="100"
                                max="1000"
                                step="10"
                                value={this.state.model.zoom_ratio}
                                onChange={this.changeZoom}
                            />
                        </div>
                        <div className="nav">
                            <div className="reset" onClick={this.reset}>
                                Ресет
                            </div>
                            <button
                                type="submit"
                                className="choose-file"
                                onClick={this.upload}
                            >
                                Загрузить
                            </button>
                        </div>
                    </div>

                    {/*<div>*/}
                    {/*<img*/}
                    {/*id="result"*/}
                    {/*ref="result"*/}
                    {/*className="result_image"*/}
                    {/*/>*/}
                    {/*</div>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.Profile.userInfo
});

export default connect(mapStateToProps)(memo(UploadImageDialog));
