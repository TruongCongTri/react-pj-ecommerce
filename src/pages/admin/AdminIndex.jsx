import React, { useConte} from 'react'
import { Route, Routes } from "react-router-dom";
import Header from "../../components/layouts/admin/Header"
import Sidebar from "../../components/layouts/admin/Sidebar"

import NotiProvider from "../../contexts/NotiContext.jsx";
import SnackBar from "../../components/layouts/SnackBar";

export default function AdminIndex({ ...props }) {
//   return (
//     <>
//         <SnackBar />
//       <div className="flex">
//         <Sidebar />
//         <div className="bg-[#F9F9FC] w-full">
//           <NotiProvider>
//             <Header />
//           </NotiProvider>
//           {/* <ListRoutes /> */}
//         </div>
//       </div>
//     </>
//   )

    const {path, match, component: Component, render, ...rest} = props;
    const {user, isLoading} = useContext(AuthContext); // Assuming you use context to store route, you can actually get this values from redux store too.
    return (
       <Route
           {...rest}
           path={`${match.path}${path}`}
           render={(routerProps) => {
                if(isLoading) return <div>Loading...</div>
                 if(!user) return <div>Not Authenticated</div>
                return Component? <Component {...rest} {...routerProps} /> : render(routerProps)
           }}
       />
    )
}
