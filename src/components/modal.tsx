import { X } from 'lucide-react';
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  children?: ReactNode | string;
  className?: string;
  closeModal: () => void;
  title?: string | ReactNode;
};

export default function Modal({
  isOpen,
  children,
  className,
  closeModal,
  title,
}: ModalProps) {
  return (
    <div
      data-hidden={!isOpen}
      className={`data-[hidden=true]:hidden fixed top-0 left-0 w-full h-full backdrop-blur-[1.5px] z-10 bg-black/10 flex justify-center items-center`}
    >
      <div
        data-isopen={isOpen}
        className={`${className}  data-[isopen=true]:translate-y-0 data-[isopen=false]:-translate-y-full max-w-[90%] min-w-96 max-h-[90vh] w-full md:w-auto  absolute bg-white p-8 md:p-10 mt-16 rounded-md transition-all duration-300 flex flex-col`}
      >
        <header className="flex justify-between gap-10">
          <div className="text-xl font-semibold">{title}</div>
          <X
            size={35}
            onClick={closeModal}
            className="cursor-pointer hover:scale-90 transition-all duration-200"
          />
        </header>
        <hr className="mb-5 mt-2 " />
        {children}
      </div>
    </div>
  );
}
