import { ListChecks, Plus } from 'lucide-react';
import { useRef } from 'react';
import Button from '../../button';
import Input from '../../input';
import Modal from '../../modal';
import ChecklistItem from './checklistItem';

type ChecklistModalProps = {
  checklist: TChecklist;
  isOpen: boolean;
  closeModal: () => void;
  createItem: (checkListId: string, itemDescription: string) => void;
  toggleItem: (chekListId: string, itemId: string) => void;
  deleteItem: (checkListId: string, itemId: string) => void;
};
export default function ChecklistModal({
  checklist,
  toggleItem,
  createItem,
  deleteItem,
  ...props
}: ChecklistModalProps) {
  const newItemInput = useRef<HTMLInputElement>(null);
  const checkedItems = checklist.items.reduce(
    (acc, item) => (item.checked ? acc + 1 : acc),
    0
  );

  return (
    <Modal
      {...props}
      className="max-w-4xl min-w-2xl"
      title={
        <div className="flex gap-5 items-center font-semibold">
          <div className="flex gap-3 items-center">
            <ListChecks />
            <h1 className="text-xl">{checklist.title}</h1>
          </div>
          <p className="opacity-70">
            {checkedItems} / {checklist.items.length}
          </p>
        </div>
      }
    >
      <form
        className="flex gap-5 my-4 items-center"
        onSubmit={e => {
          e.preventDefault();
          if (newItemInput.current) {
            createItem(checklist.id, newItemInput.current.value);
            newItemInput.current.value = '';
          }
        }}
      >
        <Input
          required
          autoFocus
          ref={newItemInput}
          type="text"
          placeholder="Novo item"
        />
        <Button type="submit">
          <Plus />
        </Button>
      </form>
      <section className="mt-4 overflow-auto h-full">
        {checklist.items.map(item => (
          <ChecklistItem
            key={`${item.id}-${item.description}`}
            checklistId={checklist.id}
            deleteItem={deleteItem}
            item={item}
            toggleItem={toggleItem}
          />
        ))}
      </section>
    </Modal>
  );
}
