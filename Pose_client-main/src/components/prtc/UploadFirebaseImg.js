import React, {useState, useEffect} from 'react';
import {storage} from '../../services/firebase'
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
import {v4} from 'uuid'
function UploadFirebaseImg(props) {
    const [imageUpload, setImageUpload] = useState(null)
    const [imageList, setImageList] = useState([])

    const imageListRef=ref(storage, 'images/')
    const uploadImage = async () => {
        if(imageUpload==null) return
        const imageRef = ref(storage, `images/${imageUpload.name+v4()}`)
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            // console.log('Uploaded a blob or file!');
            // alert('Uploaded a blob or file!')
            getDownloadURL(snapshot.ref).then(url=>{
                setImageList(prev=>[...prev, url])
            })

        }
        );
    }
    useEffect(() => {
        listAll(imageListRef).then(res=>{
            // console.log(res)
            res.items.forEach(item=>{
                        // console.log(item)
                getDownloadURL(item).then(url=>{
                        // console.log(item)
                    setImageList(prev=>[...prev, url])
                }
                )
            })
        })
    }, []);
    return (
        <>
            <input type="file" onChange={e=>setImageUpload(e.target.files[0])}/>
            <button onClick={uploadImage}>Upload Image</button>
            {imageList.map(url=>{
                return <img src={url} alt=""/>
            })}
        </>
    );
}

export default UploadFirebaseImg;