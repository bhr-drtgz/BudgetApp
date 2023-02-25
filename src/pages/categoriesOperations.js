import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../assets/styls/categoryOperations.css"
import axios from 'axios';
import addIcon from "../assets/imgs/add.png"
import addHover from "../assets/imgs/addHover.png"
import { useNavigate, Link } from "react-router-dom";
import GeneralModal from "../components/GeneralModal";


const CategoriesOperations = () => {

    const [categories, setCategories] = useState(null)
    const [addBtnHover, setAddBtnHover] = useState(false)
    const navigate = useNavigate()
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [willDeleteCategory, setWillDeleteCategoty] = useState()
    const [didUpdate, setDidUpdate] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3004/categories")
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => { })
    }, [didUpdate])

    const deleteCategory = (id) => {
        axios.delete(`http://localhost:3004/categories/${id}`)
            .then((res) => {
                setOpenDeleteModal(false)
                setDidUpdate(!didUpdate)

            })
            .catch((err) => { })
    }

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
                                            <div>
                                                <button onClick={() => {
                                                    setOpenDeleteModal(true)
                                                    setWillDeleteCategoty(category.id)
                                                }
                                                } className="deleteBtn">Sil</button>
                                                <Link to={`/edit-category/${category.id}`} className="editBtn">Güncelle</Link>
                                            </div>

                                        </div>
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
            {
                openDeleteModal && (
                    <GeneralModal
                        title="Kategori"
                        content="Kategori Silindiginde Kategoriye Ait Bütün Veriler Silinir. Silmek İstediğinize Emin Misiniz?"
                        closeButtonText="Vazgeç"
                        closeButtonClick={() => setOpenDeleteModal(false)}
                        hasConfirm={true}
                        confirmButtonText="Sil"
                        confirmButtonClick={() => deleteCategory(willDeleteCategory)}
                    />
                )
            }
        </div>
    )
}

export default CategoriesOperations