import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Spinner,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { getOrderData, updateData } from "../redux/orderReducer/action";
import { LuPrinter } from "react-icons/lu";
import { Row } from "../components/Row";

const Order = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.orderReducer);
  console.log(data);

  useEffect(() => {
    dispatch(getOrderData());
  }, []);

  function approveOrderFn(){
    data[0].status=!data[0].status
    dispatch(updateData(data))
  }

  return !loading ? (
    <Box>
      <Box py={5} boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"} mb={5}>
        <Text maxW={"1300px"} m={"auto"} color={"gray"}>
          Orders {">"} <u>Order {data[0]?.id}</u>
        </Text>
        <Flex maxW={"1300px"} m={"auto"} mt={4} justify={"space-between"}>
          <Text fontWeight={"bold"} fontSize={30}>
            Order {data[0]?.id}
          </Text>
          <HStack>
            <Button
              bg={"white"}
              color={"#1E633F"}
              border={"1px solid #1E633F"}
              px={5}
              borderRadius={20}
            >
              Back
            </Button>
            <Button bg={"#1E633F"} color={"white"} borderRadius={20} px={5} onClick={approveOrderFn}>
              {data[0]?.status?"Disapprove Order":'Approve Order'}
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Flex
        p={5}
        px={0}
        justify={"space-between"}
        maxW={"1300px"}
        m={"auto"}
        border={"1px solid gainsboro"}
        borderRadius={20}
      >
        <Box borderRight={"1px solid gainsboro"} w={300} px={16}>
          <Text fontSize={14}>Supplier</Text>
          <Text fontWeight={"bold"} fontSize={17}>
            {data[0]?.supplier}
          </Text>
        </Box>
        <Box borderRight={"1px solid gainsboro"} w={300} px={16}>
          <Text fontSize={14}>Shipping Date</Text>
          <Text fontWeight={"bold"} fontSize={17}>
            {data[0]?.shipDay +
              ", " +
              data[0]?.shipMonth +
              " " +
              data[0]?.shipDate}
          </Text>
        </Box>
        <Box borderRight={"1px solid gainsboro"} w={300} px={16}>
          <Text fontSize={14}>Total</Text>
          <Text fontWeight={"bold"} fontSize={17}>
            {"$" +
              data[0]?.products
                .reduce((acc, el) => {
                  acc += el?.price * el?.qty;
                  return acc;
                }, 0)
                .toFixed(2)}
          </Text>
        </Box>
        {/* <Box borderRight={'1px solid gainsboro'} h={20} px={16}>
                <Text fontSize={14}>Category</Text>
                <Text fontWeight={'bold'} fontSize={17}>17h</Text>
            </Box> */}
        <Box borderRight={"1px solid gainsboro"} w={300} px={16}>
          <Text fontSize={14}>Department</Text>
          <Text fontWeight={"bold"} fontSize={17}>
            {data[0]?.dep}
          </Text>
        </Box>
        <Box px={12}>
          <Text fontSize={14}>Status</Text>
          <Text fontWeight={"bold"} fontSize={17}>
            {data[0]?.status ? "Approved" : "Awaiting your approvel"}
          </Text>
        </Box>
      </Flex>
      <Box
        maxW={"1300px"}
        m={"20px auto"}
        border={"1px solid gainsboro"}
        borderRadius={20}
      >
        <Flex p={5} justify={"space-between"} align={"center"}>
          <InputGroup size="md" w={"40%"}>
            <Input
              placeholder="Search..."
              borderRight="1px solid white"
              borderLeftRadius={50}
            />
            <InputRightAddon
              bg="white"
              children={<CiSearch />}
              borderRightRadius={50}
              borderLeft="1px solid white"
            />
          </InputGroup>
          <HStack w={"15%"} justify={"space-between"}>
            <Button
              bg={"white"}
              color={"#1E633F"}
              border={"1px solid #1E633F"}
              px={5}
              borderRadius={20}
            >
              Add Item
            </Button>
            <LuPrinter color={"#1E633F"} fontSize={35} />
          </HStack>
        </Flex>
        <Box p={5}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Product Name</Th>
                <Th>Brand</Th>
                <Th>Price</Th>
                <Th>Quantity</Th>
                <Th>Total</Th>
                <Th textAlign={'center'}>Status</Th>
                <Th colSpan={3}>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data[0]?.products.map((el, i) => (
                <Row key={el.id} {...el} orderStatus={data[0]?.status} month={data[0].shipMonth} day={data[0].shipDate} year={data[0].shipYear}/>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  ) : (
    <Spinner size={"xl"} display={"block"} m={"40vh auto"} />
  );
};

export default Order;
