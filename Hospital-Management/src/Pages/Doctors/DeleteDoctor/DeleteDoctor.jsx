// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Typography } from "@mui/material";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// export default function DeleteDoctor() {
//   const queryClient = useQueryClient();

//   const fetchApprovedDoctors = async () => {
//     let response = await fetch("http://localhost:5000/approvedDoctors")
//     const data = await response.json()
//     return data;
//   }

//   const { isLoading, isError, data } = useQuery({
//     queryKey: ['approvedDoctors'],
//     queryFn: fetchApprovedDoctors,
//   });

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/doctors/${id}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete doctor');
//       }
//       queryClient.refetchQueries(['approvedDoctors'])
//       alert('Deleted doctor Successfully');
//     } catch (error) {
//       console.error('Error deleting doctor:', error.message);
//       alert('Failed to delete doctor');
//     }
//   };

//   const handleUpdate = async (id, updatedData) => {
//     try {
//       const response = await fetch(`http://localhost:5000/doctors/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedData), // Make sure to send the updated data
//       });
  
//       if (!response.ok) {
//         console.error('Failed to update doctor details. Server responded with:', response);
//         throw new Error('Failed to update doctor details');
//       }
  
//       queryClient.refetchQueries(['approvedDoctors']);
//       alert('Doctor details updated successfully');
//     } catch (error) {
//       console.error('Error updating doctor details:', error.message);
//       alert('Failed to update doctor details');
//     }
//   };

//   const { mutate: deleteMutate } = useMutation(handleDelete);

//   if (isLoading) {
//     return <span>Loading doctors</span>;
//   }
//   if (isError) {
//     return <span>Internal server error</span>;
//   }
//   if (!data) {
//     return <span>No data available</span>;
//   }

//   return (
//     <TableContainer component={Paper}>
//       <Typography variant="h6" sx={{ my: 3 }}>
//         NUMBER OF AVAILABLE DOCTORS: {data?.length}
//       </Typography>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center">Name</TableCell>
//             <TableCell align="center">Specialist</TableCell>
//             <TableCell align="center">Available</TableCell>
//             <TableCell align="center">Fee</TableCell>
//             <TableCell align="center">Phone</TableCell>
//             <TableCell align="center">Gender</TableCell>
//             <TableCell align="center">Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data?.map((doctorData) => (
//             <TableRow key={doctorData._id}>
//               <TableCell align="center">{doctorData.name}</TableCell>
//               <TableCell align="center">{doctorData.specialist}</TableCell>
//               <TableCell align="center">{doctorData.time}</TableCell>
//               <TableCell align="center">{doctorData.fee}</TableCell>
//               <TableCell align="center">{doctorData.phone}</TableCell>
//               <TableCell align="center">{doctorData.gender}</TableCell>
//               <TableCell align="center">
//                 <button
//                   style={{
//                     color: '#fff',
//                     background: '#000',
//                     padding: '10px 15px',
//                     cursor: 'pointer',
//                     border: 'none',
//                     borderRadius: '5px',
//                     backgroundColor: 'red',
//                     marginRight: '5px',
//                   }}
//                   onClick={() => {
//                     if (window.confirm('Are you sure you want to delete this doctor?')) {
//                       deleteMutate(doctorData._id);
//                     }
//                   }}
//                 >
//                   Delete
//                 </button>
//                 <button
//                   style={{
//                     color: '#fff',
//                     background: '#000',
//                     padding: '10px 15px',
//                     cursor: 'pointer',
//                     border: 'none',
//                     borderRadius: '5px',
//                     backgroundColor: 'green',
//                   }}
//                   onClick={() => {
//                     if (window.confirm('Are you sure you want to update this doctor?')) {
//                       handleUpdate(doctorData._id, updatedData); // Pass the id and updated data
//                     }
//                   }}
//                 >
//                   Update
//                 </button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import { useNavigate } from 'react-router-dom'; // Import useHistory hook from react-router-dom
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export default function DeleteDoctor() {
  const queryClient = useQueryClient();
  const history = useNavigate(); // Initialize useHistory hook

  const fetchApprovedDoctors = async () => {
    let response = await fetch("http://localhost:5000/approvedDoctors")
    const data = await response.json()
    return data;
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['approvedDoctors'],
    queryFn: fetchApprovedDoctors,
  });

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/doctors/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete doctor');
      }
      queryClient.refetchQueries(['approvedDoctors'])
      alert('Deleted doctor Successfully');
    } catch (error) {
      console.error('Error deleting doctor:', error.message);
      alert('Failed to delete doctor');
    }
  };

  const handleUpdate = (id) => {
    // Redirect to the update page with the doctor's id as a URL parameter
    history.push(`/UpdateDoctor/${id}`);
  };

  const { mutate: deleteMutate } = useMutation(handleDelete);
  
  if (isLoading) {
    return <span>Loading doctors</span>;
  }
  if (isError) {
    return <span>Internal server error</span>;
  }
  if (!data) {
    return <span>No data available</span>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ my: 3 }}>
        NUMBER OF AVAILABLE DOCTORS: {data?.length}
      </Typography>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Specialist</TableCell>
            <TableCell align="center">Available</TableCell>
            <TableCell align="center">Fee</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((doctorData) => (
            <TableRow key={doctorData._id}>
              <TableCell align="center">{doctorData.name}</TableCell>
              <TableCell align="center">{doctorData.specialist}</TableCell>
              <TableCell align="center">{doctorData.time}</TableCell>
              <TableCell align="center">{doctorData.fee}</TableCell>
              <TableCell align="center">{doctorData.phone}</TableCell>
              <TableCell align="center">{doctorData.gender}</TableCell>
              <TableCell align="center">
                <button
                  style={{
                    color: '#fff',
                    background: '#000',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: 'red',
                    marginRight: '5px',
                  }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this doctor?')) {
                      deleteMutate(doctorData._id);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  style={{
                    color: '#fff',
                    background: '#000',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: 'green',
                  }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to update this doctor?')) {
                      // Assuming handleUpdate is a function that navigates to the "/UpdateDoctor" page
                      window.location.href = "/IIIT"; // Navigate to the UpdateDoctor page
                    }
                  }}
                  
                >
                  Update
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
