import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal as ChakraModal,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface Props {
  open: boolean;
  handleClose?: (...args: Array<any>) => any;
  title?: string;
  content?: ReactNode;
  buttons?: ReactNode;
  isCentered?: boolean;
  closeOnOverlayClick?: boolean;
  scrollBehavior?: 'inside' | 'outside'
  size?: "xs"| "sm"| "md"| "lg"| "xl"| "full"
}

const Modal: FC<Props> = ({
  open,
  title,
  content,
  buttons,
  handleClose = () => undefined,
  isCentered = false,
  closeOnOverlayClick = false,
  scrollBehavior = 'inside',
  size = 'lg'
}) => {
  return (
    <ChakraModal
      closeOnOverlayClick={closeOnOverlayClick}
      isOpen={open}
      onClose={handleClose}
      isCentered={isCentered}
      scrollBehavior={scrollBehavior}
      size={size}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{content}</ModalBody>
        {!!buttons ? <ModalFooter>{buttons}</ModalFooter> : <br />}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
