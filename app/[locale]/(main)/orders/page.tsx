import DetailsMayLik from "@/components/general/DetailsMayLik"
import SavedForLater from "@/components/general/SavedForLater"
import Header from "@/components/layout/Header"
import MenuSidebar from "@/components/layout/menu-sidebar"
import OrderResult from "@/components/orders/OrderResult"
import OrdersPageClient from "@/components/orders/OrdersPageClient"
import { Suspense } from "react"

import MayLikeSkelton from "@/skelton/general/MayLike"

import { Locale } from "@/types"

const page = ({ params: { locale } }: { params: { locale: Locale } }) => {

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
                            <Suspense fallback={<MayLikeSkelton />}>
                                <DetailsMayLik locale={locale} />
                            </Suspense>
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