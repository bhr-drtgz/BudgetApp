import React from 'react'
import "../assets/styls/Modal.css"

const GeneralModal = ({ title = "", content = "", closeButtonText = "", closeButtonClick = () => { }, confirmButtonText = "", confirmButtonClick = () => { }, hasConfirm = false }) => {
   return (

        <div className='modalContainer'>
            <div className='modalContentContainer'>
                <h2 className='modaltitle'>{title}</h2>
                <p className='modalContent'>{content}</p>
                <div className='buttonContainer'>
                    <button className='buttonCancel' onClick={closeButtonClick}>{closeButtonText}</button>
                    {
                        hasConfirm === true && (
                            <button className='buttonDelete' onClick={confirmButtonClick}>{confirmButtonText}</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default GeneralModal