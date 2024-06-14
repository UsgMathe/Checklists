import { Trash } from 'lucide-react';

type ChecklistProps = {
  item: TChecklistItem;
  checklistId: string;
  toggleItem: (chekListId: string, itemId: string) => void;
  deleteItem: (checkListId: string, itemId: string) => void;
};
export default function ChecklistItem({
  item,
  checklistId,
  deleteItem,
  toggleItem,
}: ChecklistProps) {
  return (
    <div
      key={`${item.id}-${item.description}`}
      data-checked={item.checked}
      className="flex items-center gap-3 px-4 data-[checked=true]:opacity-60 hover:bg-slate-50"
    >
      <input
        onClick={() => toggleItem(checklistId, item.id)}
        id={`${item.id}-${item.description}`}
        type="checkbox"
        name={item.description}
        checked={item.checked}
        className="size-5"
      />
      <label
        htmlFor={`${item.id}-${item.description}`}
        data-checked={item.checked}
        className="data-[checked=true]:line-through w-full py-2 text-lg  text-wrap"
      >
        {item.description}
      </label>
      <button type="button" onClick={() => deleteItem(checklistId, item.id)}>
        <Trash
          className="hover:text-red-600 transition-all duration-200 hover:scale-95"
          size={20}
        />
      </button>
    </div>
  );
}
