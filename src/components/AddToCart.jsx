++ /workspaces/is-5600-week-07/src/components/AddToCart.jsx
import React from 'react'
import { useCart } from '../state/CartProvider'

export default function AddToCart({ product }) {
  const { addToCart } = useCart()

  if (!product) return null

  const handleClick = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  return (
    <button className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={handleClick}>
      Add to Cart
    </button>
  )
}
