import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HiMiniXMark } from "react-icons/hi2";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import apis from "../../../apis";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";
import NormalDropdown from "../../../components/dropdowns/NormalDropdown";
import ProductStatus from "../../../components/icons/ProductStatusIcon";

export default function EditProduct() {
  // Lưu lại danh sách categories từ server
  const [singleData, setSingleData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  const [formData, setformData] = useState({});
  const [imageArr, setImageArr] = useState([]);

  const [loadingCate, setLoadingCate] = useState(false);
  const [listCate, setListCate] = useState([]);
  const [loadingCreate, setLoadingCreate] = useState(false);

  const params = useParams();
  console.log(params.id);

  let navigate = useNavigate();

  useEffect(() => {
    setLoadingGet(true);
    apis.products
      .getSingleData(params.id)
      .then(
        (res) => {
          const { product } = res.data.data;
          // xử lý category nếu cần (Xử lý computed data)
          setSingleData(product);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setTimeout(() => {
          setLoadingGet(false);
        }, 1000);
      });
    return () => {};
  }, []);
  console.log(singleData);

  useEffect(() => {
    console.log('set image arr');
    console.log(singleData.images);
    setImageArr(singleData.images);
  }, [singleData.images]);

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
  }, []);

  const submit = () => {
    apis.products
      .update(params.id, formData)
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
        setLoadingCreate(false);
      });
  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  return (
    <>
      {loadingGet ? (
        <div>Loading data</div>
      ) : (
        <>
          {singleData.length !== 0 ? (
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
                    iconStyle="size-5"
                    icon={<HiMiniXMark />}
                    type="submit"
                    onClick={handleCancel}
                  >
                    Cancel
                  </NormalButton>
                  <NormalButton
                    color="bg-[#5C59E8]"
                    text="text-white"
                    border="border border-[#5C59E8]"
                    iconStyle="size-5"
                    icon={<HiMiniWrenchScrewdriver />}
                    type="submit"
                    onClick={submit}
                  >
                    Edit Product
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
                          value={singleData.name}
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
                          rows="4"
                          type="text"
                          value={singleData.description}
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
                          name="CategoryImage"
                          updated={(_value) => {
                            setImageArr((imageArr) => [...imageArr, _value]);

                            setformData({
                              ...formData,
                              images: imageArr,
                            });
                          }}
                        >
                          Photo
                        </NormalInput>
                      </div>
                      <div className="mb-3 grid grid-cols-4 gap-2">
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
                          value={singleData.price}
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

                {/* category */}
                <div className="col-span-1 row-span-2">
                  <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
                    <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                      Category
                    </div>
                    <div>
                      <div className="mb-3">
                        <NormalDropdown
                          listData={listCate}
                          placeholder="Select a category"
                          searchPlaceholder="Enter category name..."
                          value={singleData.category}
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

                  {/* <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
                <div className="flex justify-between">
                  <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                    Status
                  </div>
                  <ProductStatus status={singleData.status.id} />
                </div>
                <div>
                  <div className="mb-3">
                    <NormalInput
                      size="w-full"
                      type="text"
                      value={singleData.category.name}
                      name={`ProductStatus`}
                      isDisabled="true"
                    >
                      Product Status
                    </NormalInput>
                  </div>
                </div>
              </div> */}
                </div>
              </div>
            </div>
          ) : (
            <h1>Product does not exist</h1>
          )}
        </>
      )}
    </>
  );
}
