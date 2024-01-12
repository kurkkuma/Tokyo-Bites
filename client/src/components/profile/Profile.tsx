import { useEffect, useState } from "react";
import { useAddUserMutation } from "../../store/api/userApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, setUser } from "../../store/userSlice";
import loading from "/images/loading.gif";

function Profile() {
  const [userName, setUserName] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");

  const user = useAppSelector((state) => state.user.user);
  const userDispatch = useAppDispatch();
  const [addUser, { isLoading, isError, isSuccess }] = useAddUserMutation();
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setUserName(user.name);
    setUserPhone(user.phone);
    setUserAddress(user.address);
  }, [user.name, user.phone, user.address]);

  const handleUpdateUser = async () => {
    setErrors([]);

    if (
      userName.trim() !== "" &&
      userPhone.trim().length >= 9 &&
      userAddress.trim() !== ""
    ) {
      try {
        const newUser = {
          name: userName,
          phone: userPhone,
          address: userAddress,
        };

        const payload = await addUser(newUser).unwrap();
        if (payload.user) {
          userDispatch(setUser(payload.user));
          setMessage(payload.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrors((prev) => [
        ...prev,
        "Please double-check that the fields you filled in are correct. ",
      ]);
    }
  };
  const handleLogout = () => {
    userDispatch(logout());
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
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Your name"
            value={userName}
          />
        </div>
        <div>
          <input
            className={isSuccess === true ? "success" : ""}
            onChange={(e) => {
              setUserPhone(e.target.value);
            }}
            type="phone"
            placeholder="Сontact phone number"
            maxLength={15}
            value={userPhone}
          />
        </div>
        <div>
          <input
            className={isSuccess === true ? "success" : ""}
            onChange={(e) => setUserAddress(e.target.value)}
            type="text"
            placeholder="Your shipping address"
            value={userAddress}
          />
        </div>

        {isLoading && (
          <img src={loading} style={{ width: "2rem", height: "2rem" }} />
        )}
        <div className="messages">
          {isSuccess && <p className="success">Success! </p>}
          {message && <p className="success">{message}</p>}
          {isError && <p className="error">Error! Please try again</p>}
          {errors.length === 0 &&
            (userName === "" || userPhone === "" || userAddress === "") && (
              <p className="error">Please fill in all fields</p>
            )}
          {errors.map((error, index) => {
            return (
              <p key={index} className="error">
                {error}
              </p>
            );
          })}
        </div>

        <button onClick={handleUpdateUser}>SAVE</button>
        <p onClick={handleLogout} className="logout-btn">
          Log out of your account
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
