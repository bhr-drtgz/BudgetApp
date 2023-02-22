import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        id: String(new Date().getTime()),
        name: ""
    })
    const [categories, setCategoris] = useState()
    useEffect(() => {
        axios.get("http://localhost:3004/categories")
            .then(res => {
                setCategoris(res.data)
            })
            .catch(err => {

            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()

        if (form.name === null) {
            alert("Kategori İsmi Boş Bırakılamaz")
            return
        }

        const hasCategory = categories.find(item => item.name.toLowerCase() === form.name.toLowerCase())
        console.log(hasCategory)
        if (hasCategory !== undefined) {
            alert("Bu Kategori Mevcut")
            return
        }
        axios.post("http://localhost:3004/categories", form)
            .then(res => {
                navigate("/category-operations")
            })
            .catch(err => {

            })

    }

    if (categories === null)
        return null

    return (
        <div>

            <Header whichPage={"addCategory"} navigateTo="/category-operations" />

            <div className="formWrapper">
                <form onSubmit={handleSubmit}  >
                    <div className="formElement">
                        <label htmlFor="name">Kategori İsmi</label>
                        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })}
                            id="name"
                            type={"text"}
                        />
                    </div>
                    <div className="submitBtnWrapper">
                        <button className="submitBtn" type="submit">
                            Kaydet
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddCategory