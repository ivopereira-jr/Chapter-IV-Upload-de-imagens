import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface CardProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async function fetchImages({ pageParam = null }) {
      const response = await api.get('/api/images', {
        params: { after: pageParam },
      });

      return response;
    },
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage =>
        lastPage.data.after ? lastPage.data.after : null,
    }
  );

  const formattedData: CardProps[] = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(page => page.data.data).flat();
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header />

          <Box maxW={1120} px={20} mx="auto" my={20}>
            {isError ? <Error /> : <CardList cards={formattedData} />}
            {hasNextPage ? (
              <Button mt={10} onClick={() => fetchNextPage()}>
                {!isFetchingNextPage ? 'Carregar mais' : 'Carregando...'}
              </Button>
            ) : (
              ''
            )}
          </Box>
        </>
      )}
    </>
  );
}
