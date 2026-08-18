import React from 'react'

const CartError = ({error}: {error: string}) => {
  return (
    <div>{error}</div>
  )
}

export default CartError