import { useEditor } from "@tiptap/react";
import React, { useState, useRef } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from 'react-quill';
import { Editor } from 'react-draft-wysiwyg';
import 'react-quill/dist/quill.snow.css';
import './CreateRoom.css';

const CreateRoom = () => {
    const { useState } = React;

    const [userInfo, setuserInfo] = useState({
        title: '',
    });
    const onChangeValue = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }

    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }
    const modules = {
        toolbar: [[{ header: [1, 2, 3, 4, 5, 6, false], font: [], size: [] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ],

    };
    const [value, setValue] = useState("");


    const [files, setFile] = useState([]);
    const [message, setMessage] = useState();
    const handleFile = (e) => {
        setMessage("");
        let file = e.target.files;

        for (let i = 0; i < file.length; i++) {
            const fileType = file[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
            if (validImageTypes.includes(fileType)) {
                setFile([...files, file[i]]);
            } else {
                setMessage("only images accepted");
            }

        }
    };
    const removeImage = (i) => {
        setFile(files.filter(x => x.name !== i));
    }

    return (<>
        <div> <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4  lg:py-16">
                <form action="#">
                    <div className="flex w-[90%] mx-auto">
                        <div class="w-[50%] grid gap-4 sm:grid-cols-2 sm:gap-6 px-6">
                            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                            <div class="sm:col-span-2">
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                            </div>
                            <div class="w-full">
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                <input type="text" name="brand" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="" />
                            </div>
                            <div class="w-full">
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                            </div>
                            <div>
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected="">Select category</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div>
                            <div>
                                <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                                <input type="number" name="item-weight" id="item-weight" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="12" required="" />
                            </div>
                            <div class="sm:col-span-2">
                                <div className='editor'>
                                    <ReactQuill theme='snow' value={value}
                                        onChange={setValue}
                                        className='editor-input'
                                        modules={modules}
                                    />
                                </div>
                            </div>
                            <button type="submit" class="bg-blue-500 hover:bg-blue-700 w-[30%] rounded-lg py-2 text-white font-medium">
                                Add product
                            </button>
                        </div>
                        <div className="w-[50%] px-6 mt-[6%]">
                            <div class="flex items-center justify-center w-full">
                                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                                    </div>
                                    <input id="dropzone-file" onChange={handleFile} type="file" class="hidden" />
                                </label>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2 relative">
                                {files.map((file, key) => {
                                    return (
                                        <div key={key} className="overflow-hidden relative">
                                            <i onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:text-white cursor-pointer">X</i>
                                            <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </section>
        </div>
    </>);
}

export default CreateRoom;
