import React, { useState } from 'react'

import "../assets/styls/singleExpense.css"
import editIcon from "../assets/imgs/editIcon.gif"
import deleteIcon from "../assets/imgs/deleteIcon.gif"
import axios from "axios";

import GeneralModal from "./GeneralModal";
import { useNavigate } from 'react-router-dom';

const SingleExpense = ({ expense, categories = [], didUpdate, setDidUpdate }) => {
    const navigate = useNavigate()
    const [showDeleteModal, setShowDeleteModal] = useState()
    const myCategory = categories.find(item => item.id === expense.categoryId)

    const HandleDelete = () => {
        console.log(expense.id)
        axios.delete(`http://localhost:3004/expenses/${expense.id}`)
            .then(() => {
                setDidUpdate(!didUpdate)
                document.location.reload()
            })
            .catch((err) => {

            })
    }
    return (
        <div className="expenseWrapper">
            <h2 className="expenseTitle">{expense.title}</h2>
            <p className="expenseDescription">{expense.description}</p>
            <h1 className="expensePrice">{expense.price} &#8378;</h1>
            <div className="btnsWrapper">
                <div onClick={() => setShowDeleteModal(true)}>
                    <img className="expenseIcon" src={deleteIcon} alt="" />
                </div>
                <div onClick={() => navigate(`/edit-expense/${expense.id}`)}>
                    <img className="expenseIcon" src={editIcon} alt="" />
                </div>
            </div>
            <p className="expenseCategoryName">{myCategory.name}</p>
            {
                showDeleteModal === true && (
                    <GeneralModal
                        title="SİL"
                        content="Silmek İstediğinize Eminmisiniz?"
                        closeButtonText="Vazgeç"
                        hasConfirm={true}
                        confirmButtonText="Sil"
                        closeButtonClick={() => setShowDeleteModal(false)}
                        confirmButtonClick={HandleDelete}
                    />
                )
            }
        </div>
    )
}

export default SingleExpense