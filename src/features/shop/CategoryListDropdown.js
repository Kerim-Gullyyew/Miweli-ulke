import { useState } from 'react'

const CategoryListDropdown = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCategory ? selectedCategory : 'Select a category'}
        <svg
          className={`w-5 h-5 ml-2 transform transition-transform ${
            isOpen ? '-rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.707a1 1 0 0 1 1.414 0L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg">
          {categories.map((category, key) => (
            <div key={key}>
              <button
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                onClick={() => handleCategoryClick(category.title)}
              >
                {category.title}
              </button>
              {category.children && (
                <div className="pl-4">
                  {category.children.map((childCategory) => (
                    <button
                      key={childCategory}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                      onClick={() => handleCategoryClick(childCategory)}
                    >
                      {childCategory}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryListDropdown