import React, { Dispatch, SetStateAction } from 'react'
import { Company as CompanyType } from '../../misc/types'
import { useTranslation } from 'react-i18next'
import { useAppContext } from '../../context/AppProvider'
import { useMutation } from 'react-query'

interface Props {
  company: CompanyType,
  onClose: () => void,
  setCompanies: Dispatch<SetStateAction<CompanyType[]>>
}

const Company = ({ company, onClose, setCompanies }: Props): React.ReactNode => {
  const isEdit = company.id !== -1

  const { t: translating } = useTranslation("global")
  const { showToast } = useAppContext()
  const mutationCreate = useMutation(createWorker, {
    onSuccess: (data) => {
      showToast({ message: translating("workers.modal.create.success"), type: "SUCCESS" })
      handleWorkerCreate(data.user, setWorkers)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("workers.modal.create.error"), type: "ERROR" })
    },
  })
  const mutationEdit = useMutation(editWorker, {
    onSuccess: (data) => {
      showToast({ message: translating("workers.modal.edit.success"), type: "SUCCESS" })
      handleWorkerEdit(data.user, setWorkers)
      onClose()
    },
    onError: () => {
      showToast({ message: translating("workers.modal.edit.error"), type: "ERROR" })
    },
  })

  return (
    <div>

    </div>
  )
}

export default Company
