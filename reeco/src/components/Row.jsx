import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../redux/orderReducer/action";

export const Row = ({
  id,
  name,
  brand,
  price,
  qty,
  status,
  orderStatus,
  month,
  day,
  year,
}) => {
  const { data } = useSelector((state) => state.orderReducer);
  const [p, setP] = useState(price);
  const [q, setQ] = useState(qty);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const dispatch = useDispatch();
  const color1 = status === "Approved" ? "#3DCA72" : "";
  const color2 =
    status === "Missing-Urgent"
      ? "#DB2114"
      : status === "Missing"
      ? "#F66D44"
      : "";

  let date = new Date();
  month =
    month == "Jan"
      ? 0
      : month == "Feb"
      ? 1
      : month == "Mar"
      ? 2
      : month == "Apr"
      ? 3
      : month == "May"
      ? 4
      : month == "Jun"
      ? 5
      : month == "Jul"
      ? 6
      : month == "Aug"
      ? 7
      : month == "Sep"
      ? 8
      : month == "Oct"
      ? 9
      : month == "Nov"
      ? 10
      : 11;

  function approveFn(id, status) {
    let curDate=date.getFullYear()+""+date.getMonth()+date.getDate();
    let shipDate=year+''+month+day;
    if (
      curDate<shipDate &&
      !orderStatus
    ) {
      let updated = data[0]?.products.map((el) => {
        if (el.id === id) {
          el.status = status;
        }
        return el;
      });

      data[0].products = updated;
      dispatch(updateData(data));
    } else {
      alert(
        "You can make change only before the shipping date or if the order is not approved."
      );
    }
  }

  function editFn(id) {
    let curDate=date.getFullYear()+""+date.getMonth()+date.getDate();
    let shipDate=year+''+month+day;
    if (
      curDate<shipDate &&
      !orderStatus
    ) {
      let updated = data[0]?.products.map((el) => {
        if (el.id === id) {
          if (p !== el.price && q !== el.qty) {
            el.status = "Price & Qty Updated";
          } else if (p !== el.price) {
            el.status = "Price Updated";
          } else if (q !== el.qty) {
            el.status = "Qty Updated";
          }
          el.price = p;
          el.qty = q;
        }
        return el;
      });

      data[0].products = updated;
      dispatch(updateData(data));
      onCloseEdit();
    } else {
      alert(
        "You can make change only before the shipping date and if the order is not approved."
      );
    }
  }

  return (
    <Tr>
      <Td p={0}>
        <Img
          src={id % 2 == 0 ? "Avocado Hass.jpg" : "Apple Green Smith.png"}
          w={"3vw"}
        />
      </Td>
      <Td>{name}</Td>
      <Td>{brand}</Td>
      <Td>$ {price}</Td>
      <Td>{qty}</Td>
      <Td>$ {qty * price}</Td>
      <Td p={0}>
        <Text
          m={"auto"}
          p={2}
          w={"fit-content"}
          borderRadius={20}
          color={"white"}
          bg={!status ? "" : color1 + color2 || "#3DCA72"}
        >
          {status}
        </Text>
      </Td>
      <Td cursor={"pointer"} color={color1}>
        <IoCheckmark onClick={() => approveFn(id, "Approved")} />
      </Td>
      <Td cursor={"pointer"} color={color2} onClick={onOpen}>
        ×
      </Td>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Missing Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Is '{name}' urgent?</ModalBody>

          <ModalFooter>
            <Button
              bg={"#1E633F"}
              color={"white"}
              borderRadius={20}
              px={5}
              onClick={() => {
                approveFn(id, "Missing-Urgent");
                onClose();
              }}
            >
              Yes
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                approveFn(id, "Missing");
                onClose();
              }}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Td cursor={"pointer"} onClick={onOpenEdit}>
        Edit
      </Td>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {name}
            <Text fontSize={16} fontWeight={"normal"}>
              {brand}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify={"space-between"}>
              <Image
                width={"40%"}
                src={id % 2 == 0 ? "Avocado Hass.jpg" : "Apple Green Smith.png"}
              />
              <Box>
                <FormLabel>Price ($)</FormLabel>
                <Input
                  type="number"
                  placeholder="Price"
                  value={p}
                  onChange={(e) => setP(+e.target.value)}
                />
                <FormLabel>Quantity</FormLabel>
                <HStack>
                  <FaCircleMinus
                    cursor={"pointer"}
                    fontSize={40}
                    color="#3DCA72"
                    onClick={() => setQ((pre) => pre && pre - 1)}
                  />
                  <Input
                    type="number"
                    placeholder="Quantity"
                    value={q}
                    onChange={(e) => setQ(+e.target.value)}
                  />
                  <FaCirclePlus
                    cursor={"pointer"}
                    fontSize={40}
                    color="#3DCA72"
                    onClick={() => setQ((pre) => pre + 1)}
                  />
                </HStack>
                <FormLabel>Total</FormLabel>
                <Text>$ {p * q}</Text>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              bg={"#1E633F"}
              color={"white"}
              borderRadius={20}
              px={5}
              onClick={() => editFn(id)}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Tr>
  );
};
