// Below code is for previous version of code for student management table{
//   /* Student Management Table */
// }
// <Card className="rounded-xl border p-10 shadow-sm">
//   <CardHeader className="flex items-center justify-between px-2 pb-8">
//     <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
//       <Users className="h-6 w-6" />
//       Student Management
//     </CardTitle>

//     <Button size="sm" className="bg-blue-600 px-4 py-2 text-white">
//       <Plus className="mr-2 h-4 w-4" /> Add Student
//     </Button>
//   </CardHeader>

//   <CardContent className="px-2">
//     {/* Select Class */}
//     <div className="mb-8">
//       <label className="mb-2 block text-sm font-medium">Select Class</label>
//       <select
//         value={selectedClass}
//         onChange={(e) => setSelectedClass(e.target.value)}
//         className="w-48 rounded-lg border px-4 py-2"
//       >
//         {classes.map((cls) => (
//           <option key={cls.id} value={cls.id}>
//             {cls.name}
//           </option>
//         ))}
//       </select>
//     </div>

//     {/* Table */}
//     <div className="overflow-hidden rounded-xl border">
//       <Table>
//         <TableHeader>
//           <TableRow className="bg-gray-50">
//             <TableHead>Student Name</TableHead>
//             <TableHead>Student Code</TableHead>
//             <TableHead>Class</TableHead>
//             <TableHead className="pr-6 text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {filteredStudents.map((student) => (
//             <TableRow key={student.id}>
//               <TableCell className="font-medium">{student.name}</TableCell>
//               <TableCell>
//                 <code className="rounded-md bg-gray-100 px-3 py-1 text-sm">
//                   {student.code}
//                 </code>
//               </TableCell>
//               <TableCell>{student.class}</TableCell>
//               <TableCell className="flex justify-end gap-4 pr-6">
//                 <Edit className="h-4 w-4 cursor-pointer" />
//                 <MessageSquare className="h-4 w-4 cursor-pointer" />
//                 <UserCircle className="h-4 w-4 cursor-pointer" />
//                 <Trash2 className="h-4 w-4 cursor-pointer text-red-600" />
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   </CardContent>
// </Card>;
