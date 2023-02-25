import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const EditCategory = () => {

    const { categoryId } = useParams()
    const [form, setForm] = useState(null)
    useEffect(() => {

        axios.get(`http://localhost:3004/categories/${categoryId}`)
            .then((res) => {
                setForm(res.data)
            })
            .catch((err) => { })
    }, [])

    if (form === null)
        return null

    return (
        <div>
            <Header navigateTo={"/category-operations"} whichPage="editcategory" />
            <div className="formWrapper">
                <form >
                    <div className="formElement">
                        <label htmlFor="name">Kategori İsmi</label>
                        <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })}
                            id="name"
                            type={"text"}
                        />
                    </div>
                    <div className="submitBtnWrapper">
                        <button className="submitBtn" type="submit">
                            Güncelle
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory