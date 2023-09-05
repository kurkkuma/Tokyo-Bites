import { useState } from "react";
import { useAddUserMutation } from "../../store/api/userApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setName, setPhone, setAddress } from "../../store/userSlice";
import loading from "/images/loading.gif";

function Profile() {
  const user = useAppSelector((state) => state.user.user);
  const userDispatch = useAppDispatch();
  const [addUser, { isLoading, isError, isSuccess }] = useAddUserMutation();
  const [errors, setErrors] = useState<string[]>([]);

  const handleUpdateUser = async () => {
    setErrors([]);
    if (
      user.name.trim() !== "" &&
      user.address.trim() !== "" &&
      user.phone.trim().length >= 10
    ) {
      const phoneRegex = /^\+380\d{9}$/;
      if (phoneRegex.test(user.phone)) {
        await addUser(user).unwrap();
        if (isSuccess) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      } else {
        setErrors((prev) => [
          ...prev,
          "The phone number must match the pattern +380ХХХХХХХХХ",
        ]);
      }
    } else {
      setErrors((prev) => [
        ...prev,
        "Please complete all fields: name and address",
      ]);
    }
  };
  const handleReset = () => {
    userDispatch(setName(""));
    userDispatch(setPhone("+380"));
    userDispatch(setAddress(""));
  };
  return (
    <div className="profile">
      <img
        className="profile-sushi"
        src="/images/profile-sushi.png"
        alt="sushi-profile"
      />
      <h1 className="title">Your profile</h1>
      <div className="form">
        <img
          className="profile-photo"
          src="/images/icons/user.png"
          alt="profile-photo"
        />
        <div>
          <input
            className={isSuccess === true ? "success" : ""}
            onChange={(e) => userDispatch(setName(e.target.value))}
            type="text"
            placeholder="Your name"
            value={user.name}
          />
        </div>
        <div>
          <input
            className={isSuccess === true ? "success" : ""}
            onChange={(e) => {
              userDispatch(setPhone(e.target.value));
            }}
            type="phone"
            placeholder="+380XXXXXXXXX"
            maxLength={13}
            value={user.phone}
            style={{
              color: user.phone.length > 4 ? "white" : "rgb(119,119,119)",
              fontSize: "1.20rem",
            }}
          />
        </div>
        <div>
          <input
            className={isSuccess === true ? "success" : ""}
            onChange={(e) => userDispatch(setAddress(e.target.value))}
            type="text"
            placeholder="Your shipping address"
            value={user.address}
          />
        </div>

        {isLoading && (
          <img src={loading} style={{ width: "2rem", height: "2rem" }} />
        )}
        {isSuccess && <p className="success">Success!</p>}
        {isError && <p className="error">Error! Please try again</p>}

        {errors.length === 0 &&
          (user.name === "" ||
            user.phone === "+380" ||
            user.address === "") && (
            <p className="error">Please fill in all fields</p>
          )}
        {errors.map((error, index) => {
          return (
            <p key={index} className="error">
              {error}
            </p>
          );
        })}

        <button onClick={handleUpdateUser}>SAVE</button>
        <p
          onClick={handleReset}
          style={{ color: "grey", cursor: "pointer", fontSize: "1rem" }}
        >
          Reset all data
        </p>
      </div>
      <h1 className="title">Why can you trust us with your data?</h1>
      <ul className="text">
        <li>
          Your safety and trust is our top priority! We value each of our
          clients and take all necessary measures to protect your personal data.
          We are committed to using the information you provide (name, phone
          number, and shipping address) solely for the purposes of processing
          orders and providing quality service.
        </li>
        <br />
        <li>
          Your data will remain strictly confidential and will not be shared
          with third parties without your express consent. We will use your
          telephone number to contact you regarding your order, to notify you of
          its status, or to resolve any issues that may arise. The delivery
          address will be required for accurate and timely delivery of the
          order.
        </li>
        <br />

        <li>
          We use state-of-the-art technical security measures to protect your
          data from unauthorized access, alteration, or loss. Our servers are
          secured with encryption and strict security protocols.
        </li>
        <br />

        <li>
          In addition, we will not use your information to send you unsolicited
          information or spam. You can always unsubscribe from our notifications
          or request that your data be deleted from our system.
        </li>
        <br />

        <li>
          We appreciate your trust and are ready to answer any questions
          regarding the use of your data. Please contact us if you have any
          questions or concerns.
        </li>
        <br />

        <li>
          Thank you for choosing our sushi bar! We are committed to providing
          you with high-quality products and reliable service, and your trust is
          an integral part of this process.
        </li>
      </ul>
    </div>
  );
}

export default Profile;
