import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from '../../Notes.client'; 

interface PageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const tagArray = resolvedParams.tag;
  const currentTag = tagArray && tagArray[0] !== 'all' ? tagArray[0] : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', currentTag], 
    queryFn: () => fetchNotes({ page: 1, search: undefined, perPage: 12, tag: currentTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={currentTag} />
    </HydrationBoundary>
  );
}