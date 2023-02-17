import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GeneralModal from '../components/GeneralModal'

const EditExpense = () => {
    const params = useParams()
    const [expense, setExpense] = useState(null)
    const [showErorModal, setShowErorModal] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3004/expenses/${params.expenseId}`)
            .then((res) => {
                setExpense(res.data)
            })
            .catch((err) => {
                setShowErorModal(true)
            })

    }, [])

    if (expense === null && showErorModal === false)
        return null
    if (showErorModal === true){
        return (

            <GeneralModal
                title='Hata'
                content='Bir Hata Oluştu'
                closeButtonText='Ana Sayfaya Dön'
                closeButtonClick={() => navigate("/")}
            />

        )}
    return (
        <div>
            <Header whichPage={"editExpense"} navigateTo="/" />
            <h1>{params.expenseId}</h1>
        </div>
    )
}

export default EditExpense