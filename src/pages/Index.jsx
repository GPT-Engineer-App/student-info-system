import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, Text, Checkbox } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [attendance, setAttendance] = useState({});

  const handleAddStudent = () => {
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
    setEditIndex(index);
    setName(students[index].name);
    setAge(students[index].age);
    setGrade(students[index].grade);
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

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" mb={4}>
          Student Information System
        </Text>
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
                <Td>{student.name}</Td>
                <Td>{student.age}</Td>
                <Td>{student.grade}</Td>
                <Td>
                  <Checkbox isChecked={attendance[index] && attendance[index].includes(new Date().toISOString().split("T")[0])} onChange={() => handleAttendanceChange(index, new Date().toISOString().split("T")[0])}>
                    Present
                  </Checkbox>
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEditStudent(index)} />
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
