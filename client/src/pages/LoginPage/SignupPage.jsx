import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";

const SignupPage = () => {
  const [phonenumber, setPhonenumber] = useState('');
  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <form action="">
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Full Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter FullName"
                className="form-control rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name">
                <strong>Region</strong>
              </label>
              <select
                name="region"
                className="form-control rounded"
                defaultChecked="0"
                required
              >
                <option className="form-control rounded" value="Sumqayit">
                  --Choose Your Region--
                </option>
                <option className="form-control rounded" value="Sumqayit">
                  Abşeron-Xızı
                </option>
                <option className="form-control rounded" value="Baki">
                  Bakı
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Dağlıq Şirvan
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Gəncə-Daşkəsən
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Lənkəran-Astara
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Mərkəzi Aran
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Mil Muğan
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Naxçıvan
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Qarabağ
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Qazax-Tovuz
                </option>
                <option className="form-control rounded" value="Gence">
                  Quba-Xaçmaz
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Şəki-Zaqatala
                </option>
                <option className="form-control rounded" value="Mingechevir">
                  Şərqi Zəngəzur
                </option>
                <option className="form-control rounded" value="Lankaran">
                  Şirvan-Salyan
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">
                <strong>Phone Number(xx-xxx-xx-xx)</strong>
              </label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon1">
                  +994
                </span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                //   value={phonenumber}
                  onChange={setPhonenumber}
                  class="form-control"
                  placeholder="Enter phone number"
                  pattern="[0-9]{9}"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control rounded"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded"
              />
            </div>
            <button className="btn btn-success w-100">
              <strong>Create Account</strong>
            </button>
            <p>You are agree to our policies and terms</p>
            <Link to="/login" className="btn btn-default border w-100 bg-light">
              Login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
