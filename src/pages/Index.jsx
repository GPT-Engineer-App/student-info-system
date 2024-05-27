import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, Text } from "@chakra-ui/react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleAddStudent = () => {
    if (editIndex !== null) {
      const updatedStudents = students.map((student, index) => (index === editIndex ? { name, age, grade } : student));
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      setStudents([...students, { name, age, grade }]);
    }
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
    setStudents(students.filter((_, i) => i !== index));
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
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Grade</Th>
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
