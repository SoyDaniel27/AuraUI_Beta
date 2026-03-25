import React from 'react'
import { useState } from 'react'
import TextLogo from '../../../assets/icons/text-icon.png'
import ImageLogo from '../../../assets/icons/image-icon.png'
import ButtonLogo from '../../../assets/icons/button.png'
import Down from '../../../assets/icons/down-point.png'
import './Widgets.css'

export default function Widgets({slot, onUpdate}) {

    const [text, setText] = useState(false);
    const [image, setImage] = useState(false);
    const [button, setButton] = useState(false)

    const toogleText = () => setText(!text);
    const toogleImage = () => setImage(!image);
    const toogleButton = () => setButton(!button);

    const applyText = () => {

        const UpdatedSlot = {
            ...slot,
            widget: [{type:'text', fontsize: 10, color:[0, 0, 0, 1], text:'Type something...'}]
        };
        onUpdate(UpdatedSlot)
    }

    const applyImage = () => {

        const UpdatedSlot = {
            ...slot,
            widget: [{type:'image', source:""}]
        };
        onUpdate(UpdatedSlot)
    }

    const applyButton = () => {
        const UpdatedSlot = {
            ...slot,
            widget: [{type:'button', backgroundColor: [255, 255, 255, 1], text:'Button', GoTo:'', textColor:[0, 0, 0, 1]}]
        }
        onUpdate(UpdatedSlot)
    }




    return (
    <div className='sidebar-componets'>
        <div className='tittle-components'>
            <h2>COMPONENTS LIBRARY</h2>
        </div>
        <div className='layout-components' onClick={toogleText}>
            <div className='section-details'>
                <img src={TextLogo} alt="404" className='text-logo'/>
                <h2>Text</h2>
            </div>
            <img src={Down} alt="404" className='down-pointer' />
        </div>
        {
            text && (
            <div className='dropdown-menu-text' onClick={()=> {applyText()}}>
                <div className='dropdown-item-objects text-aux'>
                    <p>Text</p>
                </div>
            </div> 
            )
        }
        <div className='layout-components' onClick={toogleImage}>
            <div className='section-details'>
                <img src={ImageLogo} alt="404" className='image-logo'/>
                <h2>Image</h2>
            </div>
            <img src={Down} alt="404" className='down-pointer' />
        </div>
        {
            image && (
            <div onClick={()=> {applyImage()}}>
                <div className='dropdown-menu-text' onClick={()=> {applyText()}}>
                    <div className='dropdown-item-objects text-aux'>
                        <p>Image</p>
                    </div>
                </div> 
            </div>
            )
        }
        <div className='layout-components' onClick={toogleButton}>
            <div className='section-details'>
                <img src={ButtonLogo} alt="404" className='image-logo'/>
                <h2>Button</h2>
            </div>
            <img src={Down} alt="404" className='down-pointer' />
        </div>
        {
            button && (
            <div className='dropdown-menu-text' onClick={applyButton}> 
                <div className='dropdown-item-objects text-aux'>
                    <p>Button</p>
                </div>
            </div>
            )
        }
    </div>
    
  )
}
