import React from "react"
import { Provider } from "react-redux"
import { store } from "./src/store/store"
import CheckAuth from "./CheckAuth"

// eslint-disable-next-line react/display-name,react/prop-types
export default function ({ element }) {
  if (typeof window !== "undefined") {
    window.store = store
  }
  // Instantiating store in `wrapRootElement` handler ensures:
  //  - there is fresh store for each SSR page
  //  - it will be called only once in browser, when React mounts
  return (
    <Provider store={store}>
      {element}
      <CheckAuth />
    </Provider>
  )
}
