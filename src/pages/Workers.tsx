import React, { useState } from 'react';
import Page from '../layouts/Page';
import Header from '../layouts/Header';
import { useQuery } from 'react-query';
import { fetchWorkers } from '../api-client';
import { useAppContext } from '../context/AppProvider';
import RecordCard from '../components/RecordCard';
import { Col, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Scroll from '../layouts/Scroll';
import Loading from '../layouts/Loading';
import { Worker } from '../misc/types';
import { useTranslation } from 'react-i18next';

const Workers = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [workers, setWorkers] = useState<Worker[]>([])

  const { t: translating } = useTranslation("global")
  const { showToast } = useAppContext();
  const { isLoading } = useQuery(["workers", page], () => fetchWorkers(page), {
    onSuccess: (fetchedData) => {
      const newData = fetchedData.workers;

      if (newData.length > 0) {
        setWorkers((prevWorkers) => [...prevWorkers, ...newData]);
        setPage((prevPage) => prevPage + 1);

        if (newData.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    },
    onError: () => {
      showToast({ message: "Something went wrong", type: "ERROR" });
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: page === 1 || workers.length === 0
  });

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (isLoading && workers.length === 0 && hasMore)
    return <div className='flex-1 flex-center'>
      <Loading />
    </div>

  return (
    <Page id='workers' className='d-flex flex-column align-items-start overflow-hidden'>
      <Header name={translating("workers.title")} />

      <button className='m-2 border-0 fw-semibold bg-main text-main rounded-1 px-3 py-1'>{translating("workers.add")}</button>

      {!isLoading && workers.length === 0
        ? <h1 className='text-center text-secondary mt-2 w-100'>{translating("workers.empty")}</h1>
        : <Scroll>
          <InfiniteScroll
            dataLength={workers.length}
            className='overflow-hidden px-1'
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<></>}
            scrollThreshold={0.9}
          >
            <Row className='align-items-start justify-content-start g-2 py-2'>
              {workers.map(worker => (
                <Col key={worker.id} xs={12} sm={6}>
                  <RecordCard withWhatsApp id={worker.id} name={worker.fullName} phone={worker.phone} />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </Scroll >}
    </Page >
  );
};

export default Workers;
