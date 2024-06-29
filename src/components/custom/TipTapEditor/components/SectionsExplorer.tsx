import { Button } from '@/components/ui/button';
import { makeRequest } from '@/requests/request.handler';
import { createNewSection, retrieveAllSections, updateSection, updateSectionList } from '@/requests/section.requests';
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider';
import { SectionType, getNewSection } from '@/utils/types/section.types';
import { useContext, useEffect, useState } from 'react';
import SectionCard from './SectionCard';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ section, setSection }: { section: any, setSection: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <SectionCard key={section.id} section={section} setSection={setSection} />
    </div>
  );
};

const SectionsExplorer = () => {
  const { storyId } = useContext(TipTopEditorContext);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!storyId) {
      return;
    }
    makeRequest({
      request: () => retrieveAllSections(storyId),
      setObject: setSections,
      setIsLoading,
    });
  }, [storyId]);

  const onAddNewSection = async () => {
    const newSection = getNewSection();
    newSection.storyId = storyId;
    newSection.displayOrder = sections.length + 1;

    const createdSection = await makeRequest<SectionType>({
      request: () => createNewSection(storyId, newSection),
    });
    if (!createdSection) {
      return;
    }
    setSections([...sections, createdSection]);
  };

  const onEditSection = async (newSection: SectionType) => {
    const updatedSection = await makeRequest<SectionType>({
      request: () => updateSection(newSection.id, newSection),
    });
    if (!updatedSection) {
      return;
    }

    const oldSectionIndex = sections.findIndex((s) => s.id === newSection.id);
    const newSections = [...sections];
    newSections[oldSectionIndex] = updatedSection;
    setSections(newSections);
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, // Start drag after moving 10 pixels
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // Start drag after holding for 250ms
        tolerance: 10, // Start drag after moving 10 pixels
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = sections.findIndex((section) => section.id === active.id);
      const newIndex = sections.findIndex((section) => section.id === over.id);
      const newSections = arrayMove(sections, oldIndex, newIndex).map((section, index) => ({...section, displayOrder: index + 1}));
      setSections(newSections);
      makeRequest<SectionType[]>({ request: () => updateSectionList(newSections) });
    }
  };

  return (
    <div className="w-[12.5vw] h-[100vh] px-1 pt-14 bg-slate-300 text-slate-900">
      <h1 className="text-2xl text-center mb-6">Sections</h1>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          <div>
            {(sections || []).map((section) => (
              <SortableItem key={section.id} section={section} setSection={onEditSection} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="w-full flex justify-center mt-4">
        <Button onClick={onAddNewSection}>New Section +</Button>
      </div>
    </div>
  );
};

export default SectionsExplorer;
