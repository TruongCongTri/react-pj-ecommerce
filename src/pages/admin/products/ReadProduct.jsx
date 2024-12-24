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
  // Lưu lại data cuar product từ server
  const [formData, setFormData] = useState([]);
  // Dùng để set state loading của data
  const [loadingGet, setLoadingGet] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const handleEditProduct = () => {
    // Xử lý truy cập trang chỉnh sửa product
    navigate(`/admin/products/${params.id}/edit`);
  };

  useEffect(() => {
    setLoadingGet(true);
    apis.products
      .getSingleData(params.id)
      .then(
        (res) => {
          const { product } = res.data.data;
          // xử lý product nếu cần (Xử lý computed data)
          setFormData(product);
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        setLoadingGet(false);
      });
    return () => {};
  }, []);

  console.log(formData);
  //formData.length !== 0 ?
  return (
    <>
      <div className="mx-6 my-8 ">
        {/* btn */}
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
              isDisabled={formData.length !== 0 ? false : true}
            >
              Edit Product
            </NormalButton>
          </div>
        </div>
        {/* data layout */}
        {loadingGet ? (
          <div>Loading data</div>
        ) : (
          <>
            {formData.length !== 0 ? (
              <div className="grid grid-cols-4 gap-5">
                <div className="col-span-3 ">
                  {/* general information */}
                  <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
                    <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                      General Information
                    </div>
                    <div>
                      <div className="mb-3">
                        <NormalInput
                          size="w-full"
                          value={formData.name}
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
                          value={formData.description}
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
                      <div className="mb-3"></div>
                      <div className="mb-3 grid grid-cols-4 gap-2">
                        {formData.images ? (
                          <>
                            {formData.images.map((img) => {
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
                          value={formData.price}
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
                <div className="col-span-1 ">
                  <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
                    <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                      Category
                    </div>
                    <div>
                      <div className="mb-3">
                        <NormalInput
                          size="w-full"
                          type="text"
                          value={formData.category.name}
                          name={`ProductCate`}
                          isDisabled="true"
                        >
                          Product Category
                        </NormalInput>
                      </div>
                    </div>
                  </div>

                  {/* status */}
                  {/* <div className="bg-white p-6 border border-neutral-100 rounded-lg mb-6">
                <div className="flex justify-between">
                  <div className="text-neutral-800 font-medium text-lg pb-[14px]">
                    Status
                  </div>
                  <ProductStatus status={formData.status} />
                </div>
                <div>
                  <div className="mb-3">
                    <NormalInput
                      size="w-full"
                      type="text"
                      value={formData.status}
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
            ) : (
              <div>Product does not exist</div>
            )}
          </>
        )}
      </div>
    </>
  );
}
