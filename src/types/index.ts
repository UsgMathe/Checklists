type TChecklistItem = {
  id: string;
  description: string;
  checked: boolean;
};

type TChecklist = {
  id: string;
  title: string;
  items: TChecklistItem[];
};
