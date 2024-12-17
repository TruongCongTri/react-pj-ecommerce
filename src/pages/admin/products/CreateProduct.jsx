import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import { HiMiniPlus } from "react-icons/hi2";
import { HiMiniXMark } from "react-icons/hi2";

import apis from "../../../apis";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";
import ProductStatus from "../../../components/icons/ProductStatusIcon";
import ProductFooter from "../../../components/layouts/admin/ProductFooter";
import NormalDropdown from "../../../components/dropdowns/NormalDropdown";

export default function CreateProduct() {
  const [formData, setformData] = useState({});
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [loadingCate, setLoadingCate] = useState(false);
  const [listCate, setListCate] = useState([]);
  const [imageArr, setImageArr] = useState([]);
  const listProductStatus = [
    {
      id: 4,
      name: "Draft",
    },
    {
      id: 1,
      name: "Published",
    },
    {
      id: 2,
      name: "Low Stock",
    },
    {
      id: 3,
      name: "Out of Stock",
    },
  ];
  let navigate = useNavigate();
  const submit = () => {
    apis.products
      .create(formData)
      .then(
        (res) => {
          // thành công
          navigate("/admin/products");
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setLoadingProduct(false);
      });
  };

  useEffect(() => {
    setLoadingCate(true);
    apis.categories
      .getData()
      .then(
        (res) => {
          const { categories } = res.data.data;
          // xử lý categories nếu cần (Xử lý computed data)
          setListCate(categories);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setLoadingCate(false);
        }, 5000);
      });
    return () => {};
  }, []);
  /**
   * Description
   *
   * Nhận vào một chuỗi là đường dẫn ảnh và update vào 'formData'
   *
   * @param {string} img
   * @returns {void}
   */

  const handleCancel = () => {
    navigate("/admin/products");
  };

  return (
    <>
      <div className="mx-6 my-8 ">
        <div className="flex justify-between mb-6">
          <div>
            <BreadCrumb />
          </div>
          <div className="flex gap-x-4 items-end ">
            <NormalButton
              color="bg-[#F9F9FC]"
              text="text-neutral-400"
              border="border border-neutral-400"
              type="submit"
              icon={<HiMiniXMark />}
              iconStyle="size-5 "
              onClick={handleCancel}
            >
              Cancel
            </NormalButton>

            <NormalButton
              color="bg-[#5C59E8]"
              text="text-white"
              border="border border-[#5C59E8]"
              // size="min-w-[147px] max-w-[147px] min-h-10 max-h-10"
              type="submit"
              icon={<HiMiniPlus />}
              iconStyle="size-5"
              onClick={submit}
            >
              Add Product
            </NormalButton>
          </div>
        </div>

        <div className="grid grid-cols-4 grid-rows-3 gap-5">
          <div className="col-span-3 row-span-2.5">
            {/* general information */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                General Information
              </div>
              <div>
                <div className="mb-3">
                  <NormalInput
                    size="w-full"
                    type="text"
                    placeholder="Type product name here. . ."
                    name="ProductName"
                    updated={(_value) => {
                      setformData({
                        ...formData,
                        name: _value,
                      });
                    }}
                  >
                    Product Name
                  </NormalInput>
                </div>
                <div>
                  <NormalTextarea
                    size="w-full "
                    rows="6"
                    type="text"
                    placeholder="Type product description here. . ."
                    name="ProductDescription"
                    updated={(_value) => {
                      setformData({
                        ...formData,
                        description: _value,
                      });
                    }}
                  >
                    Description
                  </NormalTextarea>
                </div>
              </div>
            </div>

            {/* media */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Media
              </div>
              <div>
                <div className="mb-3">
                  <NormalInput
                    size="w-full"
                    type="text"
                    placeholder="Drag and drop image here, or click add image"
                    name="CategoryImageOne"
                    updated={(_value) => {
                      setImageArr(imageArr => [...imageArr, _value])
                      
                      setformData({
                        ...formData,
                        images: imageArr,
                      });
                    }}
                  >
                    Photo
                  </NormalInput>
                </div>
                {/* <div className="mb-3">
                  <NormalInput
                    size="w-full"
                    type="text"
                    placeholder="Drag and drop image here, or click add image"
                    name="CategoryImageTwo"
                    updated={(_value) => {
                      setformData({
                        ...formData,
                        images: [_value],
                      });
                    }}
                  >
                    Photo 2
                  </NormalInput>
                </div>
                <div className="mb-3">
                  <NormalInput
                    size="w-full"
                    type="text"
                    placeholder="Drag and drop image here, or click add image"
                    name="CategoryImageThree"
                    updated={(_value) => {
                      setformData({
                        ...formData,
                        images: [_value],
                      });
                    }}
                  >
                    Photo 3
                  </NormalInput>
                </div> */}
                <div className="mb-3 grid grid-cols-4">
                  {imageArr ? (
                    <>
                      {imageArr.map((img) => {
                        return (
                          <>
                            {img ? (
                              <img
                                src={img}
                                alt=""
                                key={img}
                                className="w-full h-[250px] object-cover col-span-1 rounded-lg"
                              />
                            ) : null}
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </div>
                <div></div>
              </div>
            </div>

            {/* pricing */}
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Pricing
              </div>
              <div>
                <div className="mb-3">
                  <NormalInput
                    size="w-full"
                    type="number"
                    min="0"
                    placeholder="Type product name here. . ."
                    name="ProductPrice"
                    updated={(_value) => {
                      setformData({
                        ...formData,
                        price: _value,
                      });
                    }}
                  >
                    Base Price
                  </NormalInput>
                </div>
              </div>
            </div>

            {/* iventory */}
            {/* <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Inventory
              </div>
              <div>
                <div className="mb-3 grid grid-cols-3 gap-[14px]">
                  <div className="col-span-1">
                    <NormalInput
                      size="w-full"
                      type="number"
                      min="0"
                      placeholder="Type product quantity here. . ."
                      name="ProductQuantity"
                      updated={(_value) => {
                        setformData({
                          ...formData,
                          quantity: _value,
                        });
                      }}
                    >
                      Quantity
                    </NormalInput>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <div className="col-span-1 row-span-2">
            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                Category
              </div>
              <div>
                <div className="mb-3">
                  <div className="">
                    <NormalDropdown
                      listData={listCate}
                      placeholder="Select a category"
                      searchPlaceholder="Enter category name..."
                      updated={(_value) => {
                        setformData({
                          ...formData,
                          categoryId: _value,
                        });
                      }}
                    >
                      Product Category
                    </NormalDropdown>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
              <div className="flex justify-between">
                <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                  Status
                </div>
                <ProductStatus />
              </div>
              <div>
                <div className="mb-3">
                  <div className="">
                    <NormalDropdown
                      listData={listProductStatus}
                      loading={loadingCate}
                      placeholder="Select a status"
                      updated={(_value) => {
                      setformData({
                        ...formData,
                        statusId: _value,
                      });
                    }}
                    >
                      Product Status
                    </NormalDropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductFooter />
    </>
  );
}
