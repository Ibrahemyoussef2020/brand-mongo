import DetailsMayLik from "@/components/details/DetailsMayLik"
import SavedForLater from "@/components/general/SavedForLater"
import Header from "@/components/layout/Header"
import MenuSidebar from "@/components/layout/menu-sidebar"
import OrderResult from "@/components/orders/OrderResult"
import OrdersPageClient from "@/components/orders/OrdersPageClient"
import { Suspense } from "react"

const page = () => {

    return <>
    <Header page='details' heading='My Orders' /> 
    <MenuSidebar />
    <Suspense fallback={<div>Loading...</div>}>
        <OrdersPageClient>
            <div className="orders-page">
                <div className="container">
                    <div className="orders-wrapper">
                        <OrderResult />
                        <div className="may-like">
                            <DetailsMayLik />
                        </div>
                    </div>
                </div>
                <SavedForLater />
            </div>
        </OrdersPageClient>
    </Suspense>
    </>
}

export default page