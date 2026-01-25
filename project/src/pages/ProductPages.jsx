import { useParams } from "react-router-dom"
import { fetchProducts } from "../data/products"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import LikeButton from "../components/LikeButton/LikeButton"
import { initLike, toggleLike, selectLike } from "../features/likes/likesSlice"

function ProductPages() {
  const { id } = useParams()
  const productId = Number(id)
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const like = useSelector((state) => selectLike(state, productId))
  const { isLiked, likesCount } = like

  useEffect(() => {
    fetchProducts().then(products => {
      const found = products.find(p => p.id === productId)
      setProduct(found)
      setLoading(false)
      
      // Инициализируем лайк для товара при загрузке
      if (found) {
        dispatch(initLike({
          productId: productId,
          initialLikesCount: found.likesCount || 0,
          initialIsLiked: found.isLiked || false
        }))
      }
    })
  }, [id, productId, dispatch])

  const handleToggleLike = () => {
    dispatch(toggleLike(productId))
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
