import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, Text, Checkbox, Box } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [attendance, setAttendance] = useState({});

  const handleAddStudent = () => {
    if (editIndex !== null) {
      handleUpdateStudent(editIndex);
      return;
    }
    const updatedAttendance = { ...attendance };
    const currentDate = new Date().toISOString().split("T")[0];
    if (editIndex !== null) {
      updatedAttendance[editIndex] = updatedAttendance[editIndex] || [];
      updatedAttendance[editIndex].push(currentDate);
      const updatedStudents = students.map((student, index) => (index === editIndex ? { name, age, grade } : student));
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      setStudents([...students, { name, age, grade }]);
      updatedAttendance[students.length] = [currentDate];
    }
    setAttendance(updatedAttendance);
    setName("");
    setAge("");
    setGrade("");
  };

  const handleEditStudent = (index) => {
    setEditIndex(index === editIndex ? null : index);
  };

  const handleUpdateStudent = (index) => {
    const updatedStudents = students.map((student, i) => (i === index ? { name, age, grade } : student));
    setStudents(updatedStudents);
    setEditIndex(null);
    setName("");
    setAge("");
    setGrade("");
  };

  const handleDeleteStudent = (index) => {
    const updatedAttendance = { ...attendance };
    delete updatedAttendance[index];
    setAttendance(updatedAttendance);
    setStudents(students.filter((_, i) => i !== index));
  };

  const handleAttendanceChange = (index, date) => {
    const updatedAttendance = { ...attendance };
    if (!updatedAttendance[index]) {
      updatedAttendance[index] = [];
    }
    if (updatedAttendance[index].includes(date)) {
      updatedAttendance[index] = updatedAttendance[index].filter((d) => d !== date);
    } else {
      updatedAttendance[index].push(date);
    }
    setAttendance(updatedAttendance);
  };

  const totalPresent = Object.values(attendance).filter((dates) => dates.includes(new Date().toISOString().split("T")[0])).length;
  const totalNotPresent = students.length - totalPresent;

  const currentDate = new Date().toLocaleDateString();

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Box width="100%" textAlign="center" mb={4}>
          <Text fontSize="lg">Current Date: {currentDate}</Text>
        </Box>
        <Text fontSize="2xl" mb={4}>
          Student Information System
        </Text>
        <HStack spacing={4} width="100%">
          <Text fontSize="lg">Total Present: {totalPresent}</Text>
          <Text fontSize="lg">Total Not Present: {totalNotPresent}</Text>
        </HStack>
        <HStack spacing={4} width="100%">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
          <Input placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
          <Button onClick={handleAddStudent}>{editIndex !== null ? "Update" : "Add"}</Button>
        </HStack>
        <HStack spacing={4} width="100%">
          <Text fontSize="lg">Mark Attendance for Today:</Text>
          <Checkbox isDisabled={!name || !age || !grade} onChange={() => handleAttendanceChange(editIndex, new Date().toISOString().split("T")[0])}>
            Present
          </Checkbox>
        </HStack>
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Grade</Th>
              <Th>Attendance</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student, index) => (
              <Tr key={index}>
                <Td>{editIndex === index ? <Input value={name} onChange={(e) => setName(e.target.value)} /> : student.name}</Td>
                <Td>{editIndex === index ? <Input value={age} onChange={(e) => setAge(e.target.value)} /> : student.age}</Td>
                <Td>{editIndex === index ? <Input value={grade} onChange={(e) => setGrade(e.target.value)} /> : student.grade}</Td>
                <Td>
                  <Checkbox isChecked={attendance[index] && attendance[index].includes(new Date().toISOString().split("T")[0])} onChange={() => handleAttendanceChange(index, new Date().toISOString().split("T")[0])}>
                    Present
                  </Checkbox>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    {editIndex === index ? <Button onClick={() => handleUpdateStudent(index)}>Update</Button> : <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditStudent(index)} />}
                    <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDeleteStudent(index)} />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
