import { useParams } from "react-router-dom"
import { fetchProducts } from "../data/products"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LikeButton from "../components/LikeButton/LikeButton"
import { toggleLike } from "../features/likes/likesSlice"
import { selectIsLiked, selectLikesCount } from "../features/likes/likesSelectors"

function ProductPages() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const isLiked = useSelector((state) => selectIsLiked(state, id))
  const likesCount = useSelector((state) => selectLikesCount(state, id))

  useEffect(() => {
    fetchProducts().then(products => {
      const found = products.find(p => p.id === Number(id))
      setProduct(found)
      setLoading(false)
    })
  }, [id])

  const handleToggleLike = () => {
    dispatch(toggleLike(Number(id)))
  }

  if (loading) return <p>Загрузка...</p>
  if (!product) return <p>Товар не найден</p>

  return (
    <>
      <h1>{product.title}</h1>
      <p>Цена: {product.price}</p>
      <p>ID товара: {id}</p>
      <LikeButton
        isLiked={isLiked}
        likesCount={likesCount}
        onToggle={handleToggleLike}
      />
    </>
  )
}

export default ProductPages
