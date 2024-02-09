"use client"
import React from "react";
import { Modal as M, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider, } from "@nextui-org/react";
interface ModalProps {
    children: any;
    title: string;
    isOpen: boolean;
    onOpenChange: any;
    btnActionTitle: string;
    submit?: any;
    loading?: boolean;
    noAction?: boolean;
}
export default function Modal({ children, title, isOpen, onOpenChange, btnActionTitle, submit, loading, noAction}:ModalProps) {
  return (
    <>
      <M 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement='center'
        className="m-4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold text-dark-blue">{title}</ModalHeader>
              <Divider className="mb-4"/>
              <form onSubmit={submit}>
                <ModalBody className="whitespace-pre-wrap">
                  {children}
                </ModalBody>
                <ModalFooter className={`${noAction ? "hidden":"flex"} mx-auto justify-center`}>
                  <Button 
                    variant="ghost" 
                    className="border-dark-blue text-dark-blue" 
                    onPress={onClose} 
                    radius="sm" 
                    size="sm"
                  >
                    Close
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-dark-blue text-white" 
                    radius="sm" 
                    size="sm"
                    isLoading={loading}
                  >
                    {btnActionTitle}
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </M>
    </>
  );
}
