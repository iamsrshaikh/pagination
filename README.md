 React Product Pagination App
This is a simple React application that fetches and displays products from the DummyJSON API with pagination, search functionality, and sorting.

🚀 Features
Paginated Product List: Loads products 8 at a time with previous/next navigation.

Search with Debounce: Search products by name with 500ms debounce to avoid unnecessary API calls.

Client-side Sorting: Sort products by price (ascending or descending).

Skeleton Loading UI: Shows skeleton loaders while data is being fetched.

Smooth Scrolling: Automatically scrolls to top on pagination or search.

📦 Tech Stack
React

Axios

CSS for styling

DummyJSON for fake product data

🔍 How It Works
Pagination Logic
The page size is set to 8.

On changing pages, a skip value is calculated using:

const skip = (currentPage - 1) * PAGE_SIZE;

Products are fetched using:
https://dummyjson.com/products?limit=8&skip={skip}

Search:

When a user types in the search bar, the query is debounced by 500ms.
If the search term is not empty, it fetches results from:

https://dummyjson.com/products/search?q={query}


Sorting:
Sorting is done client-side after data is fetched.
Products can be sorted by price in ascending (asc) or descending (desc) order.

