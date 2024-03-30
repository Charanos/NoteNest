import Header from "@/components/Header";
import ListItem from "@/components/ListItem";

export default function Home() {
  return (
    <div className="text-textColor">
      <div className="capitalize bg-alphaColor rounded-lg w-full h-screen overflow-hidden overflow-y-auto backdrop-blur-md">
        <Header>
          <div className="mb-2 mt-16">
            <h1 className="text-3xl font-semibold capitalize">welcome back.</h1>

            <div className="grid gap-3 mt-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <ListItem
                href="liked"
                name="Liked Songs"
                image="/images/liked.png"
              />
            </div>
          </div>
        </Header>

        <div className="mt-6 mb-7 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold capitalize">release radar</h1>
          </div>

          <div className="capitalize mt-6">list of songs!!</div>
        </div>
      </div>
    </div>
  );
}
