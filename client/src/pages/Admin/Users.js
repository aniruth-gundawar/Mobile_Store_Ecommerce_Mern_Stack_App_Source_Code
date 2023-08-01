import React from 'react';
import AdminMenu from '../../components/AdminMenu';

const Users = () => {
  return (
    <div className='container m-3 p-3 '> 
       <div className='row '>
         <div className='col-md-3 '>
          <AdminMenu/>
         </div>

         <div  className='col-md-9 bg-warning '>
         <h1>users</h1>

         </div>
       </div>
    </div>
  )
}

export default Users;