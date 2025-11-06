"use client";
import React, { useEffect, useState, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import "ckeditor5/ckeditor5.css";


import {
  ClassicEditor,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Link,
  List,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableToolbar,
  TableCellProperties,
  TableProperties,
  TableCaption,
  TableColumnResize,
  BlockQuote,
  FontSize,
  FontColor,
  Alignment,
  Heading,
  SourceEditing,
  Image,
  ImageToolbar,
  ImageInsert,
  ImageStyle
} from "ckeditor5";

const MyEditor = ({ initialContent, onChange }) => {
  // const [content, setContent] = useState(initialContent);
  const editorRef = useRef(null);
  console.log("MyEditor is being rendered"); 

  return (
    <CKEditor
      editor={ClassicEditor}
      data={initialContent}
      config={{
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "fontsize",
            "fontColor",
            "|",
            "bold",
            "italic",
            "strikethrough",
            "subscript",
            "superscript",
            "|",
            "insertTable",
            "insertImage",
            "|",
            "link",
            "blockQuote",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "alignment",
            "|",
            "sourceEditing",
            
          ],
        },
        plugins: [
          Bold,
          Essentials,
          Italic,
          Mention,
          Paragraph,
          Undo,
          Link,
          List,
          Strikethrough,
          Subscript,
          Superscript,
          BlockQuote,
          FontSize,
          FontColor,
          Alignment,
          Heading,
          SourceEditing,
          Table,
          TableToolbar,
          TableCellProperties, 
          TableProperties,
          TableCaption,
          TableColumnResize,
          Image,
          ImageToolbar,
          ImageInsert,
          ImageStyle,
        ],
        // initialData: content,
        heading: {
          options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
          ]
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells", 'tableCellProperties', 'tableProperties'],
          defaultTableAttributes: {
            class: 'ck-editor-table'   
          }
        },
        image: {
        toolbar: [
          "imageStyle:alignLeft",
          "imageStyle:alignCenter",
          "imageStyle:alignRight",
          "|",
          "imageTextAlternative"
        ],
        styles: [
          'alignLeft', 'alignCenter', 'alignRight'
        ],
      },
      }}
      onReady={(editor) => {
        editorRef.current = editor;
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);  
      }}
      // data={content}
      // onChange={(event, editor) => {
      //   const data = editor.getData();
      //   setContent(data);
      //   onChange(content);
      // }}
    />
  );
};

export default MyEditor;
