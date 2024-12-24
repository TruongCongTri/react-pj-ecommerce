import React, { useState, useContext, useRef } from "react";
import NormalInput from "../../components/forms/NormalInput";
import NormalButton from "../../components/buttons/NormalButton";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SnackBarContext } from "../../contexts/SnackBarContext";
import apis from "../../apis";
import { AuthenticateContext } from "../../contexts/AuthenticateContext";

// const usernameSchema = yup.string()
//   .required('Vui lòng nhập username')
//   .test('no-special-chars', 'Username không được chứa ký tự đặc biệt', (value) => {
//     if (!value) return false;
//     return /^[A-Za-z0-9]+$/.test(value);
//   });
const signupSchema = yup.object({
  name: yup
    .string()
    .test(
      "no-special-chars",
      "Username không được chứa ký tự đặc biệt",
      (value) => {
        if (!value) return false;
        return /^[A-Za-z0-9]+$/.test(value);
      }
    )
    .required("Vui lòng nhập tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    // .matches(
    //   RegExp("(.*[a-z].*)"),
    //   "Mật khẩu cần phải có ít nhất 1 chữ in thường"
    // )
    // .matches(RegExp("(.*[A-Z].*)"), "Mật khẩu cần phải có ít nhất 1 chữ in HOA")
    // .matches(RegExp("(.*\\d.*)"), "Mật khẩu cần phải có ít nhất 1 chữ số")
    // .matches(
    //   RegExp('[!@#$%^&*(),.?":{}|<>]'),
    //   "Mật khẩu cần phải có ít nhất 1 ký tự đặc biệt"
    // )
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không trùng khớp")
    .required("Vui lòng xác nhận mật khẩu"),
});

export default function Register() {
 const { isAuthenticate } = useContext(AuthenticateContext);
   
  const [formData, setformData] = useState({});
  const [errorsForm, setErrorsForm] = useState({});
  const [loadingPost, setLoadingPost] = useState(false);

  const { addSnack } = useContext(SnackBarContext);

  //1. useRef: ghi nhớ 1 state mà không bị update theo re-render
  const isSubmit = useRef(false);
  //2. useRef: ghi nhớ 1 jsx element
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const navigate = useNavigate();
  const submit = () => {
    setLoadingPost(true);

    //set useRef flag when submit button is clicked
    isSubmit.current = true;

    signupSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        console.log("validate success");
        console.log("call API");
        const formDataTwo = Object.keys(formData)
        .filter((key) => !key.includes("confirmPassword"))
        .reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: formData[key]
            });
      }, {});
        apis.authorization
        .register(formDataTwo)
        .then(
          (result) => {
            // console.log(result.data.data.user);
            // localStorage.setItem(
            //   "user",
            //   JSON.stringify(result.data.data.user)
            // );
            // localStorage.setItem(
            //   "role",
            //   JSON.stringify(result.data.data.user.role)
            // );
            // localStorage.setItem(
            //   "token",
            //   JSON.stringify(result.data.data.user.token)
            // );
            
            addSnack("success", "Đăng ký thành công");
            navigate("/login");
          },
          (err) => {
            console.log(err);
            addSnack("error", "Đăng ký thất bại");
          }
        )
        .catch((err) => {
          console.log(err);
          addSnack("error", "Đăng ký thất bại");
        });
      })
      .catch((err) => {
        const errObj = {};
        err.inner.map((o) => {
          addSnack("error", "Đăng nhập thất bại");
          errObj[o.path] = o.message;
        });
        console.log(errObj);
        setErrorsForm(errObj);
        setTimeout(() => {
          if ("name" in errObj) {
            nameInput.current.classList.add("border-red-500");
            nameInput.current.focus();
          } else {
            emailInput.current.classList.remove("border-red-500");
          }
          if ("email" in errObj) {
            emailInput.current.classList.add("border-red-500");
            emailInput.current.focus();
          } else {
            emailInput.current.classList.remove("border-red-500");
          }
          if ("password" in errObj) {
            passwordInput.current.classList.add("border-red-500");
            passwordInput.current.value = "";
          } else {
            passwordInput.current.classList.remove("border-red-500");
          }
          if ("confirmPassword" in errObj) {
            confirmPasswordInput.current.classList.add("border-red-500");
            confirmPasswordInput.current.value = "";
          } else {
            passwordInput.current.classList.remove("border-red-500");
          }
        }, 0);
        // console.log(err.errors);
      })
      .finally(() => {
        setTimeout(() => {
          setLoadingPost(false);
        isSubmit.current = true;
        }, 1000);
      });
  };

  if (isAuthenticate) {
    return <Navigate to='/admin'> </Navigate>
  }
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 m-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-md">
          <div className="space-y-4 p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">
              Create an account
            </h1>
            <div className="mb-3">
              <NormalInput
                reference={nameInput}
                size="w-full"
                type="text"
                placeholder="Name"
                name="name"
                updated={(_value) => {
                  setformData({
                    ...formData,
                    name: _value,
                  });
                }}
              >
                Name
              </NormalInput>
              {isSubmit.current ? (
                <small className="text-red-500">{errorsForm.name || ""}</small>
              ) : null}
            </div>
            <div className="mb-3">
              <NormalInput
                reference={emailInput}
                size="w-full"
                type="text"
                placeholder="Email..."
                name="email"
                updated={(_value) => {
                  setformData({
                    ...formData,
                    email: _value,
                  });
                }}
              >
                Email
              </NormalInput>
              {isSubmit.current ? (
                <small className="text-red-500">{errorsForm.email || ""}</small>
              ) : null}
            </div>
            <div className="mb-3">
              <NormalInput
                reference={passwordInput}
                size="w-full"
                type="password"
                placeholder="••••••••"
                name="password"
                updated={(_value) => {
                  setformData({
                    ...formData,
                    password: _value,
                  });
                }}
              >
                Password
              </NormalInput>
              {isSubmit.current ? (
                <small className="text-red-500">
                  {errorsForm.password || ""}
                </small>
              ) : null}
            </div>
            <div className="mb-3">
              <NormalInput
                reference={confirmPasswordInput}
                size="w-full"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                updated={(_value) => {
                  setformData({
                    ...formData,
                    confirmPassword: _value,
                  });
                }}
              >
                Confirm Password
              </NormalInput>
              {isSubmit.current ? (
                <small className="text-red-500">
                  {errorsForm.confirmPassword || ""}
                </small>
              ) : null}
            </div>
            <div className="flex items-start mb-3">
              <div className="flex items-center block my-auto">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded-lg bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                  required=""
                />
              </div>
              <div className="ml-3 font-medium text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-sm text-neutral-500 my-3"
                >
                  I accept the{" "}
                  <Link
                    className="font-medium text-sm text-neutral-600 hover:underline"
                    to="#"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>
            <NormalButton
              color="bg-[#5C59E8]"
              text="text-white"
              border="border border-[#5C59E8]"
              type="submit"
              // icon={<HiMiniXMark />}
              iconStyle="size-5 "
              onClick={submit}
              loading={loadingPost}
            >
              Register
            </NormalButton>
            <p className="font-light text-sm text-neutral-500 my-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-sm text-neutral-600  hover:underline "
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
