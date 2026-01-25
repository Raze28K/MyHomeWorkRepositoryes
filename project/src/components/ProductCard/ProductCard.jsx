import { useNavigate } from "react-router-dom"

function ProductCard({ product }) {
  const navigate = useNavigate()

  return (
    <div>
      <h3>{product.title}</h3>
      <p>Цена: {product.price}</p>

      <button onClick={() => navigate(`/shop/${product.id}`)}>
        Подробнее
      </button>
    </div>
  )
}

export default ProductCard
