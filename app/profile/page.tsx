import DetailsMayLik from "@/components/details/DetailsMayLik"
import SavedForLater from "@/components/general/SavedForLater"
import Header from "@/components/layout/Header"
import ProgressNav from "@/components/layout/ProgressNav"
import MenuSidebar from "@/components/layout/menu-sidebar"
import OrderResult from "@/components/orders/OrderResult"
import ProfileInfo from "@/components/profile/profileInfo"

const Profile = () => {
  return (
    <>
      <Header page='profile' heading='Profile info' /> 
      <MenuSidebar />
      <div className="profile">
      <div className="container">
          <ProgressNav page="profile" category="no category" item="no item" />
          <ProfileInfo />
          <div className="orders-wrapper">
            <OrderResult />
            <div className="may-like">
              <DetailsMayLik />
            </div>
        </div>
      </div>
      <SavedForLater />
    </div>
    </>
  )
}

export default Profile