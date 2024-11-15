import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useAppContext } from '../context/AppProvider'
import { FormControl } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import { FiFilter } from 'react-icons/fi';
import { MdOutlineLogout } from "react-icons/md";
import { Filter as FilterType } from '../misc/types';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { logout } from '../api-client';
import { useNavigate } from 'react-router-dom';
import { debounce } from '../misc/helpers';

interface Props {
  filter: FilterType,
  setFilter: Dispatch<SetStateAction<FilterType>>,
  setOpenedFilterModal: Dispatch<SetStateAction<boolean>>,
}

const ShiftHeader = ({ filter, setFilter, setOpenedFilterModal }: Props): React.ReactNode => {
  const { user, showToast, setLayout } = useAppContext()
  const { t: translating } = useTranslation("global")
  const queryClient = useQueryClient()
  const navigateTo = useNavigate()

  const [searcher, setSearcher] = useState<string>(filter.searcher || "")

  const mutationLogout = useMutation(logout, {
    onMutate: () => setLayout(true),
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken")
      showToast({ message: translating("shifts.logout.success"), type: "SUCCESS" });
      navigateTo("/");
    },
    onError: () => {
      showToast({ message: translating("shifts.logout.error"), type: "ERROR" });
    },
    onSettled: () => setLayout(false)
  })

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setFilter(prev => ({
        ...prev,
        searcher: value,
        page: 1
      }));
    }, 1000), []
  );

  return (
    <div className="filters-holder mt-4 px-2 w-100 flex-center-y gap-3">

      {user.role === "admin"
        ?
        <React.Fragment>
          <div className="w-100 position-relative">
            <CiSearch size={30} className="position-absolute search" />
            <FormControl
              value={searcher}
              onChange={e => {
                debouncedSearch(e.target.value)
                setSearcher(e.target.value)
              }}
              type="text"
              placeholder={translating("shifts.search")}
              className="pe-5 py-2"
            />
          </div>

          <div className='position-relative'>
            <FiFilter onClick={() => setOpenedFilterModal(true)} size={30} />
            {(filter.companyName || filter.date1 || filter.date2 || filter.workerName) && <div className='filter-flag bg-danger position-absolute rounded-circle' />}
          </div>
        </React.Fragment>
        : <div className='flex-center-y justify-content-between w-100 px-2 border-bottom border-2 pb-1'>
          <p className='m-0 fs-3 fw-medium'>{user.fullName}</p>
          <MdOutlineLogout onClick={() => mutationLogout.mutate()} size={30} />
        </div>
      }
    </div>
  )
}

export default ShiftHeader
