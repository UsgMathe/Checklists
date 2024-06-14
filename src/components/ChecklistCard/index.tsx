import { useReducer } from 'react';
import ChecklistModal from './ChecklistModal';
import { Check, ListChecks, Trash2 } from 'lucide-react';

type ChecklistCardProps = {
  checklist: TChecklist;
  toggleItem: (chekListId: string, itemId: string) => void;
  deleteChecklist: (checklistId: string) => void;
  createItem: (checkListId: string, itemDescription: string) => void;
  deleteItem: (checkListId: string, itemId: string) => void;
};

export default function ChecklistCard({
  deleteChecklist,
  ...props
}: ChecklistCardProps) {
  const [isModalOpen, toggleIsModalOpen] = useReducer(state => !state, false);
  const checkedItems = props.checklist.items.reduce(
    (acc, item) => (item.checked ? acc + 1 : acc),
    0
  );
  return (
    <>
      <ChecklistModal
        isOpen={isModalOpen}
        closeModal={toggleIsModalOpen}
        {...props}
      />
      <div
        data-checked={
          props.checklist.items.length > 0 &&
          checkedItems == props.checklist.items.length
        }
        className="data-[checked=true]:opacity-60 relative bg-slate-200 rounded-md px-5  flex justify-between gap-5  items-center font-medium"
      >
        <span
          data-hidden={
            !(
              props.checklist.items.length > 0 &&
              checkedItems == props.checklist.items.length
            )
          }
          className="data-[hidden=true]:hidden h-[2px] bg-slate-600 w-[90%] absolute"
        />
        <div
          className=" flex gap-5 w-full items-center py-5 cursor-pointer"
          onClick={toggleIsModalOpen}
        >
          <div className="flex gap-3 items-center">
            <ListChecks />
            <p className="text-lg">{props.checklist.title}</p>
          </div>
          <p className="text-nowrap">
            {checkedItems} / {props.checklist.items.length}
          </p>
          {props.checklist.items.length > 0 &&
          checkedItems == props.checklist.items.length ? (
            <Check />
          ) : null}
        </div>
        <Trash2
          onClick={() => deleteChecklist(props.checklist.id)}
          className="text-red-500 hover:text-red-600 cursor-pointer"
        />
      </div>
    </>
  );
}
