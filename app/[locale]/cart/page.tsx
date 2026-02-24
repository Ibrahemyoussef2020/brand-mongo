'use client'
import CartLarge from "@/components/cart/CartLarge"
import CartSmall from "@/components/cart/CartSmall"
import Header from "@/components/layout/Header"
import MenuSidebar from "@/components/layout/menu-sidebar"
import { useLang } from "@/context/LangContext"
import { dictionaries } from "@/lib/dictionaries"

const page = () => {
  const { translate } = useLang();

  return (
    <>
    <Header page="cart" heading={translate(dictionaries.cart.shoppingCart)} /> 
    <MenuSidebar />
    <CartLarge />
    <CartSmall />
    </>

  )
}

export default page