import React, { useState } from 'react';
import Page from '../layouts/Page';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppProvider';
import { useMutation, useQuery } from 'react-query';
import { deleteShift, downloadShiftsReport, fetchCompaniesIdentity, fetchShifts, fetchWorkersIdentity } from '../api-client';
import Loading from '../layouts/Loading';
import Scroll from '../layouts/Scroll';
import { CompanyIdentity, Filter as FilterType, ShiftControl, Shift as ShiftType, WorkerIdentity } from '../misc/types';
import ShiftCard from '../components/ShiftCard';
import { handleDeleteShifts } from '../misc/helpers';
import ShiftController from '../components/Modals/shifts/Control';
import Filter from '../components/Modals/shifts/Filter';
import View from '../components/Modals/shifts/View';
import { MdOutlineFileDownload } from "react-icons/md";
import PaginationButtons from '../components/PaginationButtons';
import ShiftHeader from '../components/ShiftHeader';

const Shifts = (): React.JSX.Element => {
  const [totalPages, setTotalPages] = useState<number>(1)
  const [shifts, setShifts] = useState<ShiftType[]>([]);
  const [selectedShift, setSelectedShift] = useState<ShiftControl | undefined>(undefined);
  const [viewedShift, setViewedShift] = useState<ShiftType | undefined>(undefined);
  const [companies, setCompanies] = useState<CompanyIdentity[]>([]);
  const [workers, setWorkers] = useState<WorkerIdentity[]>([]);
  const [openedFilterModal, setOpenedFilterModal] = useState<boolean>(false);

  const { showToast, setLayout, showWarning, user } = useAppContext();
  const [filter, setFilter] = useState<FilterType>({
    companyName: "",
    workerName: user.role === "worker" ? user.fullName : "",
    date1: "",
    date2: '',
    searcher: "",
    limit: 12,
    page: 1
  });

  const { t: translating } = useTranslation("global");

  const { isLoading, isRefetching } = useQuery(
    ["shifts", filter.page, filter.workerName, filter.companyName, filter.date1, filter.date2, filter.searcher],
    () => fetchShifts(filter),
    {
      onSuccess: (fetchedData) => {
        setShifts(fetchedData.shifts)
        setTotalPages(fetchedData.totalPages)
      },
      onError: () => {
        showToast({ message: "Something went wrong", type: "ERROR" });
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: isLoadingCompanies } = useQuery(
    "companiesIdentity",
    fetchCompaniesIdentity,
    {
      onSuccess: (fetchedData) => {
        setCompanies(fetchedData.companies);
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
        setWorkers(fetchedData.workers);
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const mutationDelete = useMutation(deleteShift, {
    onMutate: () => {
      setLayout(true);
    },
    onSuccess: (data) => {
      showToast({ message: translating("shifts.delete.success"), type: "SUCCESS" });
      handleDeleteShifts<ShiftType>(data.id, shifts, setShifts, filter.page, setFilter);
    },
    onError: () => {
      showToast({ message: translating("shifts.delete.error"), type: "ERROR" });
    },
    onSettled: () => {
      setLayout(false);
    }
  });

  const mutationDownload = useMutation(downloadShiftsReport, {
    onMutate: () => {
      setLayout(true)
    },
    onSuccess: () => {
      showToast({ message: translating("shifts.download.success"), type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: translating("shifts.download.error"), type: "SUCCESS" });
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
      handleBtn2: () => mutationDelete.mutate(id),
    });
  };

  if ((isLoading && shifts.length === 0 && isLoadingCompanies && isLoadingWorkers) || isRefetching)
    return <Loading />;

  return (
    <Page id="shifts">
      <ShiftHeader
        filter={filter}
        setFilter={setFilter}
        setOpenedFilterModal={() => setOpenedFilterModal(true)}
      />

      <div className="mt-2 flex-center-y justify-content-between w-100 px-2">
        {user.role === "admin"
          && <React.Fragment>
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
              className="border-0 fw-semibold bg-main text-main rounded-1 px-3 py-1"
            >
              {translating("shifts.add")}
            </button>

            {filter.workerName && shifts.length > 0 &&
              <button
                onClick={async () => await mutationDownload.mutateAsync(filter)}
                className="border-0 fw-semibold bg-main text-main rounded-1 px-3 py-1 flex-center-y gap-2"
              >
                <MdOutlineFileDownload
                  size={20} />
                {translating("shifts.download.button")}
              </button>}
          </React.Fragment>
        }
      </div>

      {!isLoading && shifts.length === 0 ? (
        <h1 className="text-center text-secondary mt-2 w-100">{translating("workers.empty")}</h1>
      ) : (
        <Scroll>
          <div className="d-flex flex-column align-items-start justify-content-start gap-2 py-2">
            {shifts
              .map(shift => (
                <ShiftCard
                  key={`shift-${shift.id}`}
                  shift={shift}
                  handleDelete={() => handleDelete(shift.id, shift.company.name + " shift")}
                  handleEdit={() => {
                    setSelectedShift({
                      companyId: shift.company.id,
                      date: shift.date,
                      endHour: shift.endHour || "",
                      startHour: shift.startHour || "",
                      id: shift.id,
                      location: shift.location || "",
                      workerId: shift.worker ? shift.worker.id : -1,
                      workType: shift.workType || "",
                      notes: shift.notes || ""
                    });
                  }}
                  handleView={() => setViewedShift(shift)}
                />
              ))}
          </div>

          <PaginationButtons
            currentPage={filter.page}
            setPage={(number) => setFilter(prevFilter => ({ ...prevFilter, page: number }))}
            setNextPage={() => setFilter(prevFilter => ({ ...prevFilter, page: prevFilter.page + 1 }))}
            setPrevPage={() => setFilter(prevFilter => ({ ...prevFilter, page: prevFilter.page - 1 }))}
            totalPages={totalPages}
          />
        </Scroll>
      )}

      {selectedShift && (
        <ShiftController
          onClose={() => setSelectedShift(undefined)}
          companies={companies}
          workers={workers}
          shift={selectedShift}
          setShifts={setShifts}
        />
      )}

      {openedFilterModal && (
        <Filter
          filter={filter}
          setFilter={setFilter}
          workers={workers}
          companies={companies}
          onClose={() => setOpenedFilterModal(false)}
        />
      )}

      {viewedShift && <View onClose={() => setViewedShift(undefined)} shift={viewedShift} />}
    </Page>
  );
};

export default Shifts;
