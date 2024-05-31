import { Link } from "react-router-dom";

export default function CompanyCards() {
  const CompanyItems = [
    {
      id: 1,
      title: "Breaking News of IEEE CISSC",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxd6bVJa4ogFe0WDtyWRMaSNPMwoh9pEiqxw&s",
      content:
      "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },
    {
      id: 2,
      title: "Latest Update",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSd0p8MuIBgR7qsjV9XHuQlhaPF6ZEVS9e-Q&s",
      content: "Here is the latest news update for you.",
    },
    {
      id: 3,
      title: "Breaking News of IEEE CISSC",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnt253Qlda-6a5x8LltLHZD4IWMCmk7LOQ9Q&s",
      content:
      "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },
    {
      id: 4,
      title: "Breaking News of IEEE CISSC",
      logo: "https://1000logos.net/wp-content/uploads/2021/05/Intel-logo.png",
      content:
        "New Events were going to organize in BEL 5th floor of IEEE SRM Chapter Room",
    },
  ];
  return (
    <section className="bg-white mt-10">
      <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-8">
        {/* <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-4 xl:grid-cols-6 dark:text-gray-400"> */}
        <div className="flex items-center" >
          <div className="w-1/2">
            {
              CompanyItems.map((e, i) => {
                return (
                  <Link key={i} className="flex justify-center items-center cursor-pointer">
                    <img
                      className="mb-3 rounded-md"
                      src={e.logo}
                      style={{ width: 120 - i * 20 }}
                    />
                  </Link>
                )
              })
            }

          </div>
          <div className="w-1/2 ml-2">
            <h1 className="text-xl text-black font-extrabold sm:text-4xl text-center">
              Our Trending <br /> Company
            </h1>
            <h5 className="text-sm text-black sm:text-md text-black font-bold text-center mt-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, nam!
            </h5>
            <div className="flex justify-center mt-3">
              <button className='text-xs  sm:text-sm text-white bg-black px-4 py-2'>Try Trending Company!</button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </section>
  )
}
