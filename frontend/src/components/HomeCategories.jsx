import { useNavigate } from "react-router-dom";
import Hair from "../assets/images/hair.jpg";

// Expanded categories array with more beauty services
const categories = [
  {
    id: "hair",
    title: "Hair Styling",
    description: "Expert cuts, coloring, and styling for all hair types and preferences.",
    image: Hair,
    color: "bg-pink-600",
  },
  {
    id: "facial",
    title: "Facial Treatments",
    description: "Rejuvenating facials for glowing, healthy skin and relaxation.",
    image: "/images/facial.jpg", // You'll need to add this image
    color: "bg-purple-600",
  },
  {
    id: "nails",
    title: "Nail Services",
    description: "Manicures, pedicures, and nail art by experienced technicians.",
    image: "/images/nails.jpg", // You'll need to add this image
    color: "bg-blue-600",
  },
  {
    id: "makeup",
    title: "Makeup Services",
    description: "Professional makeup for special events, photoshoots, or everyday glam.",
    image: "/images/makeup.jpg", // You'll need to add this image
    color: "bg-red-600",
  }
];

const HomeCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate(`/services#${id}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Beauty Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of beauty treatments designed to enhance your natural beauty
            and provide a relaxing, rejuvenating experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className={`w-16 h-1 ${category.color} mb-4 rounded-full`}></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button className="flex items-center text-gray-800 font-semibold group">
                  Book Now
                  <svg 
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;