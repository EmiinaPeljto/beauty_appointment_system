import { useNavigate } from "react-router-dom";
import useFetchCategory from "../hooks/useFetchCategory";

const HomeCards = () => {
  const { categories, loading, error } = useFetchCategory();
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate(`/services#${id}`);
  };

  return (
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
            onClick={() => handleCategoryClick(category.id)}
          >
            {/* Image on left */}
            <div className="h-48 overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Content on right */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <div
                  className={`w-16 h-1 ${category.color} mb-4 rounded-full`}
                ></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
              </div>

              <button
                className="flex items-center text-gray-800 font-semibold group self-start"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCategoryClick(category.id);
                }}
              >
                View Services
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
        ))}
      </div>
    </div>
  );
};

export default HomeCards;
