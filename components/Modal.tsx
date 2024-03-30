import { IoMdClose } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps {
  title: string;
  isOpen: boolean;
  description: string;
  children: React.ReactNode;
  onChange: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  children,
  onChange,
  description,
}) => {
  return (
    <div>
      <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-primaryColor/60 backdrop-blur-sm fixed inset-0" />

          <Dialog.Content className="fixed drop-shadow-md border border-accentColor/30 top-[50%] left-[50%] shadow-lg max-h-full h-full md:h-auto md:max-h-[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-primaryColor text-textColor p-[25px] focus:outline-none">
            <Dialog.Title className="text-xl text-center font-medium mb-4 uppercase font-secondaryFont">
              {title}
            </Dialog.Title>

            <Dialog.Description className="mb-5 text-sm leading-normal text-center capitalize">
              {description}
            </Dialog.Description>

            <div className="">{children}</div>

            <Dialog.Close asChild>
              <button className="text-secondaryColor/60 hover:text-secondaryColor absolute top-[10px] right-[10px] inline-flex h-[30px] w-[30px] appearance-none items-center justify-center rounded-full focus:outline-none hover:scale-110">
                <IoMdClose />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Modal;
