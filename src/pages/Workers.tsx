import React, { useEffect, useState } from 'react';
import Page from '../layouts/Page';
import Header from '../layouts/Header';
import { useMutation, useQuery } from 'react-query';
import { deleteWorker, fetchWorkers } from '../api-client';
import { useAppContext } from '../context/AppProvider';
import RecordCard from '../components/RecordCard';
import Scroll from '../layouts/Scroll';
import Loading from '../layouts/Loading';
import { Worker } from '../misc/types';
import { useTranslation } from 'react-i18next';
import { handleDelete as handleDeleteFunc } from '../misc/helpers';
import WorkerModal from '../components/Modals/Worker';
import PaginationButton from '../components/PaginationButton';

const Workers = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [cachePage, setCachePage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [workers, setWorkers] = useState<Worker[]>([])
  const [selectedWorkers, setSelectedWorkers] = useState<Worker | undefined>(undefined)

  const { t: translating } = useTranslation("global")
  const { showToast, setLayout, showWarning } = useAppContext();

  const maxWorkersPerPage = 25;

  const { isLoading } = useQuery(["workers", page], () => fetchWorkers(page, maxWorkersPerPage), {
    onSuccess: (fetchedData) => {
      const newWorkers = fetchedData.workers;

      if (page === 1) {
        setWorkers(newWorkers);
      } else {
        setWorkers((prevWorkers) => [...prevWorkers, ...newWorkers]);
      }

      if (newWorkers.length === 0) {
        setHasMore(false)
        setPage(prevPage => prevPage - 1)
      }
      else if (newWorkers.length < maxWorkersPerPage) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    },
    onError: () => {
      showToast({ message: "Something went wrong", type: "ERROR" });
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: hasMore
  });

  const mutationDelete = useMutation(deleteWorker, {
    onMutate: () => {
      setLayout(true)
    },
    onSuccess: (data) => {
      showToast({ message: translating("workers.delete.success"), type: "SUCCESS" })
      handleDeleteFunc<Worker>(data.id, workers, setWorkers)
    },
    onError: () => {
      showToast({ message: translating("workers.delete.error"), type: "ERROR" })
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

  const goToNextPage = () => {
    if (hasMore && !isLoading) {
      const newPage = page + 1
      setPage(newPage)
      setCachePage(newPage)
    } else {
      setCachePage(prevPage => prevPage + 1)
    }
  };

  const goToPreviousPage = () => {
    setCachePage(prevPage => prevPage - 1)
  };

  useEffect(() => {
    const neededPages = Math.ceil(workers.length / maxWorkersPerPage)
    if (page < neededPages || page > neededPages)
      setPage(neededPages)
    if (cachePage > neededPages && neededPages !== 0)
      setCachePage(neededPages)
  }, [workers])

  if (isLoading && workers.length === 0 && hasMore)
    return <Loading />

  return (
    <Page id='workers'>
      <Header name={translating("workers.title")} />

      <button
        onClick={() => setSelectedWorkers({
          id: -1,
          fullName: "",
          personal_id: "",
          phone: "",
          password: "",
          notes: ""
        })}
        className='m-2 border-0 fw-semibold bg-main text-main rounded-1 px-3 py-1'>
        {translating("workers.add")}
      </button>

      {!isLoading && workers.length === 0
        ? <h1 className='text-center text-secondary mt-2 w-100'>{translating("workers.empty")}</h1>
        : <Scroll>
          <div className='d-flex flex-column align-items-start justify-content-start gap-2 py-2'>
            {workers
              .slice((cachePage - 1) * maxWorkersPerPage, cachePage * maxWorkersPerPage)
              .map(worker => (
                <RecordCard
                  key={`worker-${worker.id}`}
                  handleDelete={handleDelete}
                  withWhatsApp
                  id={worker.id}
                  name={worker.fullName}
                  phone={worker.phone}
                  handleSelectRecord={() => {
                    setSelectedWorkers({
                      id: worker.id,
                      fullName: worker.fullName,
                      personal_id: worker.personal_id,
                      phone: worker.phone,
                      password: "",
                      notes: worker.notes
                    })
                  }}
                />
              ))}
          </div>
        </Scroll >}

      <div className="pagination-buttons mt-3 d-flex justify-content-between px-2 w-100">
        <PaginationButton
          title={translating("global.prev")}
          onClick={goToPreviousPage}
          disabled={cachePage === 1 || isLoading}
        />

        <PaginationButton
          title={translating("global.next")}
          onClick={goToNextPage}
          disabled={(cachePage >= page && !hasMore) || isLoading}
        />
      </div>

      {selectedWorkers && <WorkerModal
        worker={selectedWorkers}
        onClose={() => setSelectedWorkers(undefined)}
        setWorkers={setWorkers}
      />}
    </Page >
  );
};

export default Workers;
