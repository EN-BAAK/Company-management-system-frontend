import React, { useEffect, useState } from 'react';
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
import PaginationButton from '../components/PaginationButton';

const Companies = (): React.JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [cachePage, setCachePage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);

  const { t: translating } = useTranslation("global");
  const { showToast, setLayout, showWarning } = useAppContext();

  const maxCompaniesPerPage = 25;

  const { isLoading } = useQuery(["companies", page], () => fetchCompanies(page, maxCompaniesPerPage), {
    onSuccess: (fetchedData) => {
      const newCompanies = fetchedData.companies;

      if (page === 1) {
        setCompanies(newCompanies);
      } else {
        setCompanies((prevCompanies) => [...prevCompanies, ...newCompanies]);
      }

      if (newCompanies.length === 0) {
        setHasMore(false)
        setPage(prevPage => prevPage - 1)
      }
      else if (newCompanies.length < maxCompaniesPerPage) {
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

  const mutationDelete = useMutation(deleteCompany, {
    onMutate: () => {
      setLayout(true);
    },
    onSuccess: (data) => {
      showToast({ message: translating("companies.delete.success"), type: "SUCCESS" });
      handleDeleteFunc<Company>(data.id, companies, setCompanies);
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
    const neededPages = Math.ceil(companies.length / maxCompaniesPerPage)
    if (page < neededPages || page > neededPages)
      setPage(neededPages)
    if (cachePage > neededPages && neededPages !== 0)
      setCachePage(neededPages)
  }, [companies])

  if (isLoading && companies.length === 0 && hasMore) return <Loading />;

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

      {!isLoading && companies.length === 0
        ? <h1 className='text-center text-secondary mt-2 w-100'>{translating("workers.empty")}</h1>
        : <Scroll>
          <div className='d-flex flex-column align-items-start justify-content-start gap-2 py-2'>
            {companies
              .slice((cachePage - 1) * maxCompaniesPerPage, cachePage * maxCompaniesPerPage)
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
        </Scroll>}

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

      {selectedCompany && <CompanyModal
        company={selectedCompany}
        onClose={() => setSelectedCompany(undefined)}
        setCompanies={setCompanies}
      />}
    </Page>
  );
};

export default Companies;
