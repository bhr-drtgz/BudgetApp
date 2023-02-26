import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import GeneralModal from "../components/GeneralModal";


const EditCategory = () => {

    const { categoryId } = useParams()
    const [form, setForm] = useState(null)
    const [allCategories, setAllCategories] = useState(null)
    const [oldName, setOldName] = useState("")
    const [openModal, setOpenModal] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {

        axios.get(`http://localhost:3004/categories`)
            .then((res) => {
                setAllCategories(res.data)

                const myCat = res.data.find((item) => item.id === categoryId)

                setForm(myCat)
                setOldName(myCat.name)
            })
            .catch((err) => { })
    }, [])


    const EditSubmit = (event) => {
        event.preventDefault()

        if (form.name === "") {
            alert("Kategori İsmi Boş Bırakılamaz")
            return
        }
        const hasCategory = allCategories.find(item => item.name.toLowerCase() === form.name.toLowerCase())
        if (hasCategory !== undefined) {
            alert("Bu Kategori Mevcut")
            return
        }
        axios.put(`http://localhost:3004/categories/${categoryId}`,form)
            .then((res) => {

                setOpenModal(true)
             })
            .catch((err) => {

            })
    }

    if (form === null || allCategories === null)
        return null

    return (
        <div>
            <Header navigateTo={"/category-operations"} whichPage="editcategory" />
            <div className="formWrapper">
                <form onSubmit={EditSubmit} >
                    <div className="formElement">
                        <label htmlFor="name">Kategori İsmi</label>
                        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })}
                            id="name"
                            type={"text"}
                        />
                    </div>
                    <div className="submitBtnWrapper">
                        <button disabled={
                            form.name.toLowerCase() === oldName.toLowerCase() || form.name === "" ? true : false
                        } className="submitBtn" type="submit">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>
            {
                openModal === true && (
                    <GeneralModal
                        title='Güncelleme'
                        content='Kategori Başarı İle Güncellendi'
                        hasConfirm={false}
                        closeButtonText="Kategori İşlemlerine dön"
                        closeButtonClick={() =>navigate("/category-operations")}
                    />
                )
            }
        </div>
    )
}

export default EditCategory