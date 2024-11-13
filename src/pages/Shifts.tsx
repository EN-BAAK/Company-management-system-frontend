import React, { useState } from 'react'
import Page from '../layouts/Page'
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import { useMutation, useQuery } from 'react-query';
import { deleteShift, fetchCompaniesIdentity, fetchShifts, fetchWorkersIdentity } from '../api-client';
import Loading from '../layouts/Loading';
import Scroll from '../layouts/Scroll';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CompanyIdentity, Filter as FilterType, ShiftControl, Shift as ShiftType, WorkerIdentity } from '../misc/types';
import ShiftCard from '../components/ShiftCard';
import { handleShiftDelete, searchText } from '../misc/helpers';
import { FormControl } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import ShiftController from '../components/Modals/shifts/Control';
import Filter from '../components/Modals/shifts/Filter';
import View from '../components/Modals/shifts/View';

const Shifts = (): React.JSX.Element => {
  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [shifts, setShifts] = useState<ShiftType[]>([])
  const [selectedShift, setSelectedShift] = useState<ShiftControl | undefined>(undefined)
  const [viewedShift, setViewedShift] = useState<ShiftType | undefined>(undefined)
  const [companies, setCompanies] = useState<CompanyIdentity[]>([])
  const [workers, setWorkers] = useState<WorkerIdentity[]>([])
  const [openedFilterModal, setOpenedFilterModal] = useState<boolean>(false)
  const [filter, setFilter] = useState<FilterType>({
    companyName: "",
    workerName: "",
    date1: "",
    date2: ''
  })

  const { t: translating } = useTranslation("global")
  const { showToast, setLayout, showWarning } = useAppContext();

  const quickFilteredShifts = shifts.filter(shift =>
    (shift.worker?.fullName && searchText(search, shift.worker.fullName)) ||
    (shift.worker?.phone && searchText(search, shift.worker.phone)) ||
    (shift.workType && searchText(search, shift.workType)) ||
    (searchText(search, shift.location)) ||
    (searchText(search, shift.company.name)))

  const { isLoading: isLoadingShifts } = useQuery(
    ["shifts", page, filter.workerName, filter.companyName, filter.date1, filter.date2],
    () => fetchShifts({ ...filter, page }),
    {
      onSuccess: (fetchedData) => {
        const newShifts = fetchedData.shifts;

        if (newShifts.length > 0) {
          setShifts((prevShifts) => [...prevShifts, ...newShifts]);
          setPage((prevPage) => prevPage + 1);

          if (newShifts.length < 10) {
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
      enabled: page === 1 || shifts.length === 0,
    }
  );

  const { isLoading: isLoadingCompanies } = useQuery(
    "companiesIdentity",
    fetchCompaniesIdentity,
    {
      onSuccess: (fetchedData) => {
        setCompanies(fetchedData.companies)
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: isLoadingWorkers } = useQuery(
    "workersIdentity",
    fetchWorkersIdentity,
    {
      onSuccess: (fetchedData) => {
        setWorkers(fetchedData.workers)
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const mutationDelete = useMutation(deleteShift, {
    onMutate: () => {
      setLayout(true)
    },
    onSuccess: (data) => {
      showToast({ message: translating("shifts.delete.success"), type: "SUCCESS" })
      handleShiftDelete(data.id, shifts, setShifts)
    },
    onError: () => {
      showToast({ message: translating("shifts.delete.error"), type: "ERROR" })
    },
    onSettled: () => {
      setLayout(false)
    }
  })

  const handleDelete = (id: number, name: string) => {
    showWarning({
      message: `${translating("shifts.delete.confirm")} ${name}?`,
      btn1: translating("global.cancel"),
      btn2: translating("global.delete"),
      handleBtn2: () => mutationDelete.mutate(id)
    })
  }

  const fetchMoreData = () => {
    if (hasMore && !isLoadingShifts) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (isLoadingShifts && shifts.length === 0 && hasMore && isLoadingCompanies && isLoadingWorkers)
    return <div className='flex-1 flex-center'>
      <Loading />
    </div>

  return (
    <Page id='shifts'>
      <div className='filters-holder mt-4 px-2 w-100 flex-center-y gap-3'>
        <div className='w-100 position-relative'>
          <CiSearch
            size={30}
            className='position-absolute search' />
          <FormControl
            value={search}
            onChange={e => setSearch(e.target.value)}
            type='text'
            placeholder={translating("shifts.search")}
            className='pe-5 py-2' />
        </div>

        <FiFilter
          onClick={() => setOpenedFilterModal(true)}
          size={30}
        />
      </div>

      <button
        onClick={() => setSelectedShift({
          companyId: -1,
          date: "",
          endHour: "",
          startHour: "",
          id: -1,
          location: "",
          workerId: -1,
          workType: ""
        })}
        className='mt-2 border-0 fw-semibold bg-main text-main rounded-1 px-3 py-1'>
        {translating("shifts.add")}</button>

      {!isLoadingShifts && shifts.length === 0
        ? <h1 className='text-center text-secondary mt-2 w-100'>{translating("workers.empty")}</h1>
        : <Scroll>
          <InfiniteScroll
            dataLength={quickFilteredShifts.length}
            className='overflow-hidden px-1'
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<></>}
            scrollThreshold={0.9}
          >
            <div className='d-flex flex-column align-items-start justify-content-start gap-2 py-2'>
              {quickFilteredShifts.map(shift => (
                <ShiftCard
                  key={`shift-${shift.id}`}
                  shift={shift}
                  handleDelete={() => handleDelete(shift.id, shift.company.name + " shift")}
                  handleEdit={() => {
                    setSelectedShift(
                      {
                        companyId: shift.company.id,
                        date: shift.date,
                        endHour: shift.endHour || "",
                        startHour: shift.startHour || "",
                        id: shift.id,
                        location: shift.location,
                        workerId: shift.worker ? shift.worker.id : -1,
                        workType: shift.workType || "",
                        notes: shift.notes || ""
                      }
                    )
                  }}
                  handleView={() => setViewedShift(shift)}
                />
              ))}
            </div>
          </InfiniteScroll>
        </Scroll >}

      {selectedShift &&
        <ShiftController
          onClose={() => setSelectedShift(undefined)}
          companies={companies}
          workers={workers}
          shift={selectedShift}
          setShifts={setShifts}
        />
      }

      {openedFilterModal &&
        <Filter
          filter={filter}
          setFilter={setFilter}
          workers={workers}
          companies={companies}
          onClose={() => setOpenedFilterModal(false)}
        />}

      {viewedShift &&
        <View
          onClose={() => setViewedShift(undefined)}
          shift={viewedShift}
        />}

    </Page>
  )
}

export default Shifts
