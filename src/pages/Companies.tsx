import React, { useState } from 'react';
import Page from '../layouts/Page';
import Header from '../layouts/Header';
import { useMutation, useQuery } from 'react-query';
import { deleteCompany, fetchCompanies } from '../api-client';
import { useAppContext } from '../context/AppProvider';
import RecordCard from '../components/RecordCard';
import Loading from '../layouts/Loading';
import Scroll from '../layouts/Scroll';
import { Company } from '../misc/types';
import { useTranslation } from 'react-i18next';
import { handleDelete as handleDeleteFunc } from '../misc/helpers';
import CompanyModal from '../components/Modals/Company';
import PaginationButtons from '../components/PaginationButtons';

const Companies = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1)
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);

  const { t: translating } = useTranslation("global");
  const { showToast, setLayout, showWarning } = useAppContext();

  const maxCompaniesPerPage = 25;

  const { isLoading, isRefetching } = useQuery(
    ["companies", page],
    () => fetchCompanies(page, maxCompaniesPerPage),
    {
      onSuccess: (fetchedData) => {
        setCompanies(fetchedData.companies)
        setTotalPages(fetchedData.totalPages)
      },
      onError: () => {
        showToast({ message: "Something went wrong", type: "ERROR" });
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  const mutationDelete = useMutation(deleteCompany, {
    onMutate: () => {
      setLayout(true);
    },
    onSuccess: (data) => {
      showToast({ message: translating("companies.delete.success"), type: "SUCCESS" });
      handleDeleteFunc<Company>(data.id, companies, setCompanies, page, setPage);
    },
    onError: () => {
      showToast({ message: translating("companies.delete.error"), type: "ERROR" });
    },
    onSettled: () => {
      setLayout(false);
    }
  });

  const handleDelete = (id: number, name: string) => {
    showWarning({
      message: `${translating("global.confirmDelete")} ${name}?`,
      btn1: translating("global.cancel"),
      btn2: translating("global.delete"),
      handleBtn2: () => mutationDelete.mutate(id)
    });
  };


  if ((isLoading && companies.length === 0) || isRefetching) return <Loading />;

  return (
    <Page id='companies'>
      <Header name={translating("companies.title")} />

      <button
        onClick={() => setSelectedCompany({
          id: -1,
          name: "",
          phone: "",
          notes: ""
        })}
        className='m-2 border-0 fw-semibold bg-main text-main rounded-1 px-3 py-1'>
        {translating("companies.add")}
      </button>

      {companies.length === 0
        ? <h1 className='text-center text-secondary mt-2 w-100'>{translating("workers.empty")}</h1>
        : <Scroll>
          <div className='d-flex flex-column align-items-start justify-content-start gap-2 py-2'>
            {companies
              .map(company => (
                <RecordCard
                  key={`company-${company.id}`}
                  handleDelete={handleDelete}
                  id={company.id}
                  name={company.name}
                  phone={company.phone}
                  handleSelectRecord={() => setSelectedCompany({
                    id: company.id,
                    name: company.name,
                    phone: company.phone,
                    notes: company.notes || ""
                  })}
                />
              ))}
          </div>

          <PaginationButtons
            currentPage={page}
            totalPages={totalPages}
            setPage={(number) => setPage(number)}
            setNextPage={() => setPage(prevPage => prevPage + 1)}
            setPrevPage={() => setPage(prevPage => prevPage - 1)}
          />
        </Scroll>}

      {selectedCompany && <CompanyModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(undefined)}
        setCompanies={setCompanies}
      />}
    </Page>
  );
};

export default Companies;
