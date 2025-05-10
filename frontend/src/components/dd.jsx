import { useNavigate } from "react-router-dom";
import Hair from "../assets/images/hair.jpg";
import useFetchCategory from "../hooks/useFetchCategory";

const HomeCards = () => {
  const { categories, loading, error } = useFetchCategory();
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate(`/services#${id}`);
  };

  return (
    <div className="container mx-auto px-4 relative z-10">
      {/* MODIFICATION: Changed -mx-2 to -mx-1 for smaller horizontal gutters */}
      <div className="flex flex-wrap -mx-1">
        {categories.map((categories) => (
          <div
            key={category.id}
            // MODIFICATION: Changed px-2 to px-1 for smaller horizontal gutters
            className="w-full sm:w-1/2 px-1 mb-4"
            onClick={() => handleCategoryClick(categories.id)}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 max-w-sm mx-auto">
              <div className="h-48 overflow-hidden">
                <img
                  src={categories.image}
                  alt={categories.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div
                  className={`w-16 h-1 ${categories.color} mb-4 rounded-full`}
                ></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">{categories.description}</p>
                <button className="flex items-center text-gray-800 font-semibold group">
                  Book Now
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCards;
