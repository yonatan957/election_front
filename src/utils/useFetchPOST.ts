// import { useEffect, useState } from "react";

// export function useFetchPOST<T>(key:string, initialValue:T){
//     const [link, setLind] = useState<T| null>(initialValue)
//     const send = async()=>{
//         try {
//           const response = await fetch("http://localhost:2222/api/users/register",{
//             method:"POST",
//             headers:{
//                 "Content-Type": "application/json"
//             },
//             body:JSON.stringify({
//               userName,
//               password,
//               isAdmin
//             })
//           })
//           if(!response.ok)throw new Error("faild to register")
//             else{console.log(await response.json())}
//         } catch (error) {
//           console.log((error as Error).message)
//         }
//       }
//     useEffect(()=>{
        
//     },[key])
// }