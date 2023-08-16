import React, { useContext, useState } from "react";
import "./style.scss";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import { useEffect } from "react";

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const {products} = useContext(ShoppingContext);
    useEffect(() => {
        const filtered = products.filter(product =>
            product.productname.toLowerCase().includes(searchText.toLowerCase())
          );
          setFilteredProducts(filtered);

    }, [searchText])
    console.log(filteredProducts);
  return (<>
    <div className="src">
      <input
        type="text"
        className="src-input"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    <div className="src-products">
        {
            filteredProducts.map((filtered)=>{
                <div className="">{filtered.productname}</div>

            })
        }

    </div>
    </div>
    </>
  );
};

export default Search;
