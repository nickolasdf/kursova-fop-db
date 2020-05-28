import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./style.scss";

class Editor extends Component {
    render() {
        return (
            <div className="editor">
                <div>Навички текстом</div>
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onInit={editor => {
                        console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                    }}
                />
            </div>
        );
    }
}

export default Editor;
