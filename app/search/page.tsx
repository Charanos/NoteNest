import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import getSongByTitle from "@/actions/getSongByTitle";
import SearchContent from "./components/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export const revalidate = 0;

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongByTitle(searchParams.title);

  return (
    <div className="h-full bg-alphaColor rounded-lg w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-secondaryColor">
        <div className="flex mb-2 flex-col gap-y-2">
          <h1 className="text-textColor md:my-1 text-3xl mt-6 capitalize font-secondaryFont">
            search
          </h1>

          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;
