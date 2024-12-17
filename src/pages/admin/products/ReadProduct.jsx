import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

import apis from "../../../apis";

import BreadCrumb from "../../../components/layouts/BreadCrumb";
import NormalButton from "../../../components/buttons/NormalButton";

import NormalInput from "../../../components/forms/NormalInput";
import NormalTextarea from "../../../components/forms/NormalTextarea";

import ProductStatus from "../../../components/icons/ProductStatusIcon";

export default function ReadProduct() {
  // Lưu lại danh sách categories từ server
  const [singleData, setSingleData] = useState([]);
  // Dùng để set state loading của table (first load hoặc searching)
  const [loadingGet, setLoadingGet] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const handleEditProduct = () => {
    // Xử lý đăng nhập thành công
    navigate(`/admin/products/${params.id}/edit`);
  };

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

  return (
    <>
      {singleData.length !== 0 ? (
        <div className="mx-6 my-8 ">
        <div className="flex justify-between mb-6">
          <div>
            <BreadCrumb />
          </div>
          <div className="flex gap-x-4 items-end ">
            <NormalButton
              color="bg-[#5C59E8]"
              text="text-white"
              border="border border-[#5C59E8]"
              type="submit"
              icon={<HiMiniWrenchScrewdriver />}
              iconStyle="size-5"
              onClick={handleEditProduct}
            >
              Edit Product
            </NormalButton>
          </div>
        </div>
        {loadingGet ? (
          <div>Loading data</div>
        ) : (
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
                      name={`ProductName`}
                      isDisabled="true"
                    >
                      Product Name
                    </NormalInput>
                  </div>
                  <div>
                    <NormalTextarea
                      size="w-full "
                      rows="6"
                      type="text"
                      value={singleData.description}
                      name={`ProductDesc`}
                      isDisabled="true"
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
                  </div>
                  <div className="mb-3 grid grid-cols-4 gap-2">
                    {singleData.images ? (
                      <>
                        {singleData.images.map((img) => {
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
                      name={`ProductPrice`}
                      isDisabled="true"
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
                    <NormalInput
                      size="w-full"
                      type="text"
                      value={singleData.category.name}
                      name={`ProductCate`}
                      isDisabled="true"
                    >
                      Product Category
                    </NormalInput>
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
        )}
      </div>
      ) : (<h1>Product does not exist</h1>)}
      
    </>
  );
}
