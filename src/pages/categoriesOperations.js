import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../assets/styls/categoryOperations.css"
import axios from 'axios';
import addIcon from "../assets/imgs/add.png"
import addHover from "../assets/imgs/addHover.png"
import { useNavigate } from "react-router-dom";



const CategoriesOperations = () => {

    const [categories, setCategories] = useState(null)
    const [addBtnHover, setAddBtnHover] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3004/categories")
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => { })
    }, [])

    if (categories === null)
        return null

    return (
        <div>
            <Header whichPage={CategoriesOperations} navigateTo="/" />
            <div className='categoryOparetionsContainer'>
                <button className="addBtn"
                    onClick={() => navigate("/add-category")}
                    onMouseEnter={() => setAddBtnHover(true)}
                    onMouseLeave={() => setAddBtnHover(false)}
                >
                    {
                        addBtnHover === false ? (
                            <img src={addIcon} />
                        ) : (
                            <img src={addHover} />
                        )
                    }
                </button>

                <div className='categoryOperationsContentWrap'>
                    {
                        categories.length === 0 && (
                            <p>Henüz Kayıtlı Bir Kategori Yok</p>
                        )
                    }
                    {
                        categories.length > 0 && (
                            <>
                                {
                                    categories.map(category => (
                                        <div className="categoryOperationCotegoryWrap" key={category.id}>
                                            <p>{category.name}</p>

                                        </div>
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoriesOperations