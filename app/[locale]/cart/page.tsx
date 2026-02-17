import CartLarge from "@/components/cart/CartLarge"
import CartSmall from "@/components/cart/CartSmall"
import Header from "@/components/layout/Header"
import MenuSidebar from "@/components/layout/menu-sidebar"

const page = () => {
  return (
    <>
    <Header page="cart" heading="Shopping cart" /> 
    <MenuSidebar />
    <CartLarge />
    <CartSmall />
    </>

  )
}

export default page