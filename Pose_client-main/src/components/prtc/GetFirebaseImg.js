import React, {useEffect, useState} from 'react';
import {storage} from '../../services/firebase'
import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'


function GetFirebaseImg(props) {
    const name='박지헌.jpgb8b6f498-7d04-4b80-8201-3f14802aefd6'

    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
const imageRef = ref(storage, `images/${name}`)
        getDownloadURL(imageRef).then(url=>{
            setImageUrl(url)
        })
    }, [name]);
    console.log(imageUrl)

    return (
        <div>
            {imageUrl && <img src={imageUrl} alt={name} />}
        </div>
    );
}

export default GetFirebaseImg;