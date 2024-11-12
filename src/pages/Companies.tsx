import React, { useState } from 'react';
import Page from '../layouts/Page';
import Header from '../layouts/Header';
import { useMutation, useQuery } from 'react-query';
import { deleteCompany, fetchCompanies } from '../api-client';
import { useAppContext } from '../context/AppProvider';
import RecordCard from '../components/RecordCard';
import { Col, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import Scroll from '../layouts/Scroll';
import Loading from '../layouts/Loading';
import { Company } from '../misc/types';
import { useTranslation } from 'react-i18next';
import { handleCompanyDelete } from '../misc/helpers';
const Companies = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [companies, setCompanies] = useState<Company[]>([])

  const { t: translating } = useTranslation("global")
  const { showToast, setLayout, showWarning } = useAppContext();
  const { isLoading } = useQuery(["companies", page], () => fetchCompanies(page), {
    onSuccess: (fetchedData) => {
      const newData = fetchedData.companies;

      if (newData.length > 0) {
        setCompanies((prevCompanies) => [...prevCompanies, ...newData]);
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
    enabled: page === 1 || companies.length === 0
  });

  const mutationDelete = useMutation(deleteCompany, {
    onMutate: () => {
      setLayout(true)
    },
    onSuccess: (data) => {
      showToast({ message: translating("companies.delete.success"), type: "SUCCESS" })
      handleCompanyDelete(data.id, companies, setCompanies)
    },
    onError: () => {
      showToast({ message: translating("companies.delete.error"), type: "ERROR" })
    },
    onSettled: () => {
      setLayout(false)
    }
  })


  const handleDelete = (id: number, name: string) => {
    showWarning({
      message: `${translating("global.confirmDelete")} ${name}?`,
      btn1: translating("global.cancel"),
      btn2: translating("global.delete"),
      handleBtn2: () => mutationDelete.mutate(id)
    })
  }

  const fetchMoreData = () => {
    if (hasMore && !isLoading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (isLoading && companies.length === 0 && hasMore)
    return <div className='flex-1 flex-center'>
      <Loading />
    </div>

  return (
    <Page id='companies' className='d-flex flex-column align-items-start overflow-hidden'>
      <Header name={translating("companies.title")} />

      <button className='m-2 border-0 fw-semibold bg-main text-main rounded-1 px-3 py-1'>{translating("companies.add")}</button>

      {!isLoading && companies.length === 0
        ? <h1 className='text-center text-secondary mt-2 w-100'>{translating("workers.empty")}</h1>
        : <Scroll>
          <InfiniteScroll
            dataLength={companies.length}
            className='overflow-hidden px-1'
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<></>}
            scrollThreshold={0.9}
          >
            <Row className='align-items-start justify-content-start g-2 py-2'>
              {companies.map(worker => (
                <Col key={worker.id} xs={6} sm={6}>
                  <RecordCard
                    handleDelete={handleDelete}
                    id={worker.id}
                    name={worker.name}
                    phone={worker.phone} />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </Scroll >}
    </Page >
  )
}

export default Companies
