import React from "react"
import { useShopname } from "./src/components/Account/accountHook"
import { useAppDispatch } from "./src/store/hooks"
import { checkUserAuth } from "./src/store/shop/shopSlice"

const CheckAuth = () => {
  const dispatch = useAppDispatch()
  const shopList = useShopname()
  React.useEffect(() => {
    dispatch(checkUserAuth(shopList))
  }, [])
  return <> </>
}
export default CheckAuth
