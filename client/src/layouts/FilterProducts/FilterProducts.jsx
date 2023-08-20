import React, { useContext, useState, useEffect } from "react";
import "./style.scss";
import { ShoppingContext } from "../../assets/context/shoppingContext";
import filtericon from "./img/filter.png";
import filtericon2 from "./img/filter2.png";
import xicon from "./img/xicon.png";
import xicon2 from "./img/xicon2.png";
import greenicon from "./img/greenicon.png"
import redicon from "./img/redicon.png"
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
const FilterProducts = ({
  OnlySearchFilteredOrAllProducts,
  filteredProducts,
  setFilteredProducts,
}) => {
  const { products } = useContext(ShoppingContext);
  const [filterProducts, setFilterProducts] = useState({
    minPrice: 0,
    maxPrice: 1000,
    category: "",
    fresh: "",
    region: "",
    city: "",
  });
  const [showFilter, setShowFilter] = useState(false);
  console.log(filterProducts);
  useEffect(() => {
    const filtered = OnlySearchFilteredOrAllProducts.filter(
      (
        product //return true or false
      ) =>
        (filterProducts.minPrice ||
          filterProducts.maxPrice ||
          filterProducts.category ||
          filterProducts.fresh ||
          filterProducts.region ||
          filterProducts.city) &&
        (!filterProducts.minPrice ||
          (product.productprice &&
            product.productprice >= filterProducts.minPrice)) &&
        (!filterProducts.maxPrice ||
          (product.productprice &&
            product.productprice <= filterProducts.maxPrice)) &&
        (!filterProducts.category ||
          (product.productcategory &&
            product.productcategory.toLowerCase() ===
              filterProducts.category.toLowerCase())) &&
        (!filterProducts.fresh ||
          (product.producttype &&
            product.producttype.toLowerCase() ===
              filterProducts.fresh.toLowerCase())) &&
        (!filterProducts.region ||
          (product.region &&
            product.region.toLowerCase() ===
              filterProducts.region.toLowerCase())) &&
        (!filterProducts.city ||
          (product.city &&
            product.city
              .toLowerCase()
              .includes(filterProducts.city.toLowerCase())))
    );
    if (
      filterProducts.minPrice > 0 ||
      filterProducts.maxPrice ||
      filterProducts.category ||
      filterProducts.fresh ||
      filterProducts.region ||
      filterProducts.city
    )
      setFilteredProducts(filtered);
    else setFilteredProducts(OnlySearchFilteredOrAllProducts);
  }, [
    products,
    filterProducts.minPrice,
    filterProducts.maxPrice,
    filterProducts.category,
    filterProducts.fresh,
    filterProducts.region,
    filterProducts.city,
  ]);
  return (
    <div className="FilterProducts">
      <div className="FilterProducts-icon ml-5">
        <div className=" d-flex flex-row gap-1 align-items-center justify-content-center">
          <img src={greenicon} alt="" width={"18px"} height={"18px"}/><h5>Not experied date</h5>
          <img src={redicon} alt="" width={"18px"} height={"18px"} /><h5>Experied date</h5>
        </div>
        <img
          src={showFilter ? filtericon2 : filtericon}
          alt="filter"
          onClick={() => {
            setShowFilter(!showFilter);
          }}
        />
      </div>

      {showFilter && (
        <div className="filter-container">
         <div className="filter-inputs">
        <div className="w-25 d-flex align-items-center justify-content-center"> Price range</div>
          <Box sx={{ width: 300 }} className="w-100">
            <Slider
              getAriaLabel={() => "Price Range"}
              value={[filterProducts.minPrice, filterProducts.maxPrice]}
              onChange={(event, newValue) => {
                setFilterProducts({
                  ...filterProducts,
                  minPrice: Number(newValue[0]),
                  maxPrice: Number(newValue[1]),
                });
              }}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
            />
          </Box>
         </div>
          <div className="filter-inputs">
            <div className="filter-input">
              <label>Min Price:</label>
              <input
                type="number"
                value={filterProducts.minPrice}
                onChange={(e) =>
                  setFilterProducts({
                    ...filterProducts,
                    minPrice: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="filter-input">
              <label>Max Price:</label>
              <input
                type="number"
                value={filterProducts.maxPrice}
                onChange={(e) =>
                  setFilterProducts({
                    ...filterProducts,
                    maxPrice: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="filter-input">
              <label>Category:</label>
              <select
                value={filterProducts.category}
                onChange={(e) =>
                  setFilterProducts({
                    ...filterProducts,
                    category: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Bakery">Bakery</option>
                <option value="Pastry">Pastry</option>
                <option value="Dairy">Dairy</option>
                <option value="Eggs">Eggs</option>
                <option value="Delikatessen">Delikatessen</option>
                <option value="Savoury Grocery">Savoury Grocery</option>
                <option value="Meat">Meat</option>
                <option value="Poultry">Poultry</option>
              </select>
            </div>
            <div className="filter-input">
              <label>Fresh:</label>
              <select
                value={filterProducts.fresh}
                onChange={(e) =>
                  setFilterProducts({
                    ...filterProducts,
                    fresh: e.target.value,
                  })
                }
              >
                <option value="">All</option>
                <option value="fresh">Fresh</option>
                <option value="Greenhouse">Greenhouse</option>
                <option value="Imported">Imported</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="filter-input">
              <label>Region:</label>
              <select
                value={filterProducts.region}
                defaultChecked="0"
                onChange={(e) =>
                  setFilterProducts({
                    ...filterProducts,
                    region: e.target.value,
                  })
                }
              >
                <option className="form-control rounded" value="">
                  All
                </option>
                <option className="form-control rounded" value="Abşeron-Xızı">
                  Abşeron-Xızı
                </option>
                <option className="form-control rounded" value="Bakı">
                  Bakı
                </option>
                <option className="form-control rounded" value="Dağlıq Şirvan">
                  Dağlıq Şirvan
                </option>
                <option className="form-control rounded" value="Gəncə-Daşkəsən">
                  Gəncə-Daşkəsən
                </option>
                <option
                  className="form-control rounded"
                  value="Lənkəran-Astara"
                >
                  Lənkəran-Astara
                </option>
                <option className="form-control rounded" value="Mərkəzi Aran">
                  Mərkəzi Aran
                </option>
                <option className="form-control rounded" value="Mil Muğan">
                  Mil Muğan
                </option>
                <option className="form-control rounded" value="Naxçıvan">
                  Naxçıvan
                </option>
                <option className="form-control rounded" value="Qarabağ">
                  Qarabağ
                </option>
                <option className="form-control rounded" value="Qazax-Tovuz">
                  Qazax-Tovuz
                </option>
                <option className="form-control rounded" value="Quba-Xaçmaz">
                  Quba-Xaçmaz
                </option>
                <option className="form-control rounded" value="Şəki-Zaqatala">
                  Şəki-Zaqatala
                </option>
                <option className="form-control rounded" value="Şərqi Zəngəzur">
                  Şərqi Zəngəzur
                </option>
                <option className="form-control rounded" value="Şirvan-Salyan">
                  Şirvan-Salyan
                </option>
              </select>
            </div>
            <div className="filter-input">
              <label>City: </label>
              <input
                type="text"
                value={filterProducts.city}
                onChange={(e) =>
                  setFilterProducts({ ...filterProducts, city: e.target.value })
                }
                placeholder="full name of the city"
              />
            </div>
            <div className="filter-x">
              {/* <img src={onmouseenter? xicon2:xicon} alt="X" /> */}
              <div
                onClick={() => {
                  setFilterProducts({
                    minPrice: 0,
                    maxPrice: 1000,
                    category: "",
                    fresh: "",
                    region: "",
                    city: "",
                  });
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterProducts;
