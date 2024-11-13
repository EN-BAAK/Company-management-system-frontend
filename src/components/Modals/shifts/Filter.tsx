import React, { Dispatch, SetStateAction } from 'react'
import ModalCard from '../ModalCard'
import { CompanyIdentity, Filter as FilterType, Shift, WorkerIdentity } from '../../../misc/types'
import { Form, Formik } from 'formik'
import FormikControl from '../../form/FormikControl'
import { useTranslation } from 'react-i18next'
import Button from '../../form/Button'
import { Col, Row } from 'react-bootstrap'

interface Props {
  onClose: () => void,
  filter: FilterType,
  setFilter: Dispatch<SetStateAction<FilterType>>
  companies: CompanyIdentity[],
  workers: WorkerIdentity[],
  setShifts: Dispatch<SetStateAction<Shift[]>>
}

const Filter = ({ onClose, filter, setFilter, companies, workers, setShifts }: Props): React.JSX.Element => {
  const { t: translating } = useTranslation("global")

  const onSubmit = (data: FilterType) => {
    setShifts([]);
    setFilter({ ...data, });
    onClose();
  }

  const resetFilter = () => {
    setFilter(prevFilter => ({
      ...prevFilter,
      workerName: "",
      companyName: "",
      date1: "",
      date2: ""
    }))
    onClose()
  }

  return (
    <ModalCard
      onClose={onClose}
      title={translating("shifts.filter.title")}
    >
      <Formik
        initialValues={filter}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form className='form d-flex flex-column gap-3 w-100'>
            <h3>{translating("shifts.filter.query")}</h3>

            <FormikControl
              control='select'
              name='workerName'
              placeholder={translating("shifts.filter.workerName")}
              options={workers.map(worker => {
                return {
                  id: `${worker.fullName}-${worker.id}`,
                  key: worker.fullName,
                  value: worker.fullName
                }
              })}
            />

            <FormikControl
              control='select'
              name='companyName'
              placeholder={translating("shifts.filter.companyName")}
              options={companies.map(company => {
                return {
                  id: `${company.name}-${company.id}`,
                  key: company.name,
                  value: company.name
                }
              })}
            />

            <h3>{translating("shifts.filter.date")}</h3>

            <FormikControl
              control='date'
              name='date1'
              label={translating("shifts.filter.from")}
            />

            <FormikControl
              control='date'
              name='date2'
              label={translating("shifts.filter.to")}
            />

            <Row>
              <Col xs={6}>
                <Button
                  type='submit'
                  disabled={!formik.isValid || formik.isSubmitting || !formik.dirty}
                >
                  {translating("shifts.filter.confirm")}
                </Button>
              </Col>

              <Col xs={6}>
                <Button
                  onClick={() => resetFilter()}
                  type='button'
                >
                  {translating("shifts.filter.reset")}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </ModalCard>
  )
}

export default Filter
