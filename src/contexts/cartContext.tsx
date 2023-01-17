import { createContext, ReactNode, useState } from 'react'

interface Item {
  name: string
  imageUrl: string
  priceId: string
  unitAmount: number
}

interface CartContextData {
  items: Item[]
  addItem: (item: Item) => void
  removeItem: (priceId: string) => void
  clear: () => void
}

export const CartContext = createContext({} as CartContextData)

interface CartContextProviderProps {
  children: ReactNode | ReactNode[]
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [items, setItems] = useState([] as Item[])

  function addItem(item: Item) {
    const itemsAlreadyExists = items.find(
      (cartItem) => cartItem.priceId === item.priceId,
    )

    if (!itemsAlreadyExists) {
      setItems((state) => [...state, item])
    }
  }

  function removeItem(priceId: string) {
    const filteredItems = items.filter(
      (cartItem) => cartItem.priceId !== priceId,
    )

    setItems(filteredItems)
  }

  function clear() {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
