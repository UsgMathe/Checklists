import { FormEvent, useEffect, useRef, useState } from 'react';
import { api } from './services/api';
import ChecklistCard from './components/ChecklistCard';
import Button from './components/button';
import Input from './components/input';
import { randomHexId } from './utils';
import Modal from './components/modal';
import { Search } from 'lucide-react';

function App() {
  const [checklistQuery, setChecklistQuery] = useState<string>();
  const [checklists, setChecklists] = useState<TChecklist[]>();

  const newChecklistInput = useRef<HTMLInputElement>(null);

  const doneChecklists = checklists?.reduce(
    (acc, checklist) =>
      checklist.items.length > 0 && checklist.items.every(item => item.checked)
        ? acc + 1
        : acc,
    0
  );

  function getCheckListById(id: string) {
    return checklists?.find(checklist => checklist.id == id);
  }

  function getChecklists(query?: string) {
    if (query) {
      const filtredChecklist = checklists?.filter(checklist =>
        checklist.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
      if (filtredChecklist) setChecklists(filtredChecklist);
    } else {
      api.get('/checklists').then(response => setChecklists(response.data));
    }
  }

  function handleSubmitChecklistForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newChecklistInput.current) {
      api
        .post('/checklists', {
          title: newChecklistInput.current.value,
          items: [],
        })
        .then(() => getChecklists());
      newChecklistInput.current.value = '';
    }
  }

  function handleToggleChecklistItem(checkListId: string, itemId: string) {
    const checklist = getCheckListById(checkListId);

    if (!checklist) return;

    const findedItemIndex = checklist.items?.findIndex(
      item => item.id == itemId
    );

    if (findedItemIndex === undefined || findedItemIndex === -1) return;

    const updatedChecklist = {
      ...checklist,
      items: checklist.items.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    };

    updateCheckList(checkListId, updatedChecklist);
  }

  function handleCreateChecklistItem(
    checklistId: string,
    itemDescription: string
  ) {
    const checklist = getCheckListById(checklistId);

    if (!checklist) {
      return;
    }

    const newItem = {
      id: randomHexId(8),
      description: itemDescription,
      checked: false,
    };

    const updatedChecklist = {
      ...checklist,
      items: [...checklist.items, newItem],
    };

    updateCheckList(checklistId, updatedChecklist);
  }

  function handleDeleteChecklist(checklistId: string) {
    api
      .delete(`/checklists/${checklistId}`)
      .then(() => getChecklists())
      .catch(() => alert('erro ao deletar checklist'));
  }

  function updateCheckList(checklistId: string, newCheckList: TChecklist) {
    api
      .patch(`/checklists/${checklistId}`, newCheckList)
      .then(() => getChecklists())
      .catch(() => alert('Ocorreu um erro ao adicionar item ao checklist'));
  }

  function handleDeleteChecklistItem(checklistId: string, ItemId: string) {
    const checklist = getCheckListById(checklistId);

    if (!checklist) return;

    const updatedChecklist = {
      ...checklist,
      items: checklist.items.filter(item => item.id != ItemId),
    };

    updateCheckList(checklistId, updatedChecklist);
  }

  useEffect(() => {
    getChecklists(checklistQuery);
  }, [checklistQuery]);

  useEffect(() => {
    getChecklists();
    getCheckListById('e40aa');
  }, []);

  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  return (
    <section>
      <Modal
        closeModal={() => setIsOpenDialog(false)}
        isOpen={isOpenDialog}
        title="Tem certeza?"
      >
        <p className="mb-8">Não será possível recuperar</p>
        <div className="grid grid-flow-col gap-5">
          <Button variant="outline">Manter</Button>
          <Button variant="destructive">Exluir</Button>
        </div>
      </Modal>
      <main className="px-5 mt-10 max-w-6xl mx-auto pb-20 ">
        <div className="grid gap-5  px-10 py-5">
          <Input
            onChange={e => setChecklistQuery(e.target.value)}
            className="bg-white p-2"
            type="text"
            placeholder="Buscar checklist"
            label={
              <div className="flex gap-2 items-center">
                <Search /> Busca
              </div>
            }
          />
          <form
            className="grid gap-5 items-center my-5 justify-center"
            onSubmit={handleSubmitChecklistForm}
          >
            <Input
              required
              ref={newChecklistInput}
              type="text"
              className="p-2  outline outline-1 "
              placeholder="Título do checklist"
            />
            <Button>Criar</Button>
          </form>
          <p className="text-start font-semibold text-lg">
            Concluídos: {doneChecklists} / {checklists?.length}
          </p>
          <div className="overflow-y-auto max-h-[40vh] gap-8 px-4 grid">
            {checklists?.length ? (
              checklists.map(checklist => (
                <ChecklistCard
                  deleteItem={handleDeleteChecklistItem}
                  createItem={handleCreateChecklistItem}
                  deleteChecklist={handleDeleteChecklist}
                  toggleItem={handleToggleChecklistItem}
                  key={checklist.id}
                  checklist={checklist}
                />
              ))
            ) : checklistQuery ? (
              <p>Nenhum checklist encontrado</p>
            ) : (
              <p>Nenhum checklist criado...</p>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}

export default App;
