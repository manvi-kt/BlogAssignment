import React from 'react';
import { useRouter } from 'next/router';
import OptionList from './OptionList';
import SubList from './Sublist';
import { AboutDatas } from '@/data/data';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const AboutLayout: React.FC = () => {
  const router = useRouter();
  const { optionId, infoId } = router.query;

  const handleOptionClick = (id: string) => {
    router.push(`/about/${id}`);
  };

  const handleInfoClick = (infoId: string) => {
    if (optionId) {
      router.push(`/about/${optionId}/${infoId}`);
    }
  };

  const selectedOption = AboutDatas.options.find((opt) => opt.id.toString() === optionId);

  return (
    <>
    <Header></Header>
    <div className=" w-full flex flex-col">
      <div className="flex ">
        <div className="w-1/5 fixed top-0 left-0 h-full">
        <aside className="w-64 bg-white mt-10 text-blue-800 p-6 space-y-4 min-h-screen rounded-lg shadow-lg">
      <nav className="space-y-2">
        <a
          href="/"
          className=" mt-5 block py-2 px-4 rounded hover:bg-blue-100"
        >
          Home
        </a>
        <a
          href="/about/"
          className="block py-2 px-4 rounded hover:bg-blue-100"
        >
          About
        </a>
      </nav>
    </aside>
        </div>
        <main className="ml-[20%] flex-1 max-w-4xl mx-auto mt-6 p-6">
          <div className="flex space-x-8">
            <div className="flex-grow">
              <OptionList
                options={AboutDatas.options}
                selectedOptionId={optionId as string}
                onOptionClick={handleOptionClick}
              />
            </div>
            <div className="flex-grow">
              {selectedOption && (
                <SubList
                  info={selectedOption.info}
                  selectedInfoId={infoId as string}
                  onInfoClick={handleInfoClick}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
   
  );
};

export default AboutLayout;
