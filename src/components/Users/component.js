import React, { useState, useEffect } from "react";
import Button from "../Button/component";
import "./index.scss";

import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/slices/userSlice";

const Users = () => {
  const [disabled, setDisabled] = useState(false);
  const {
    users: { users, links },
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (links?.next_url === null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [links]);

  const showMore = () => dispatch(fetchUsers(links.next_url));

  return (
    <div className="users container mb-140">
      <div className="users__title title mb-50">Working with GET request</div>
      <div className="users__body mb-50">
        {users &&
          users.map((user) => (
            <div className="users__body__item item-user" key={user.id}>
              <div className="item-user__avatar">
                <img src={user.photo} alt={user.name} />
              </div>
              <div className="item-user__name item-user_w">{user.name}</div>
              <div className="item-user__info">
                <div className="item-user__position">{user.position}</div>
                <div className="item-user__email modal">{user.email}</div>
                <div className="item-user__phone">{user.phone}</div>
              </div>
            </div>
          ))}
      </div>
      <div className="users__button">
        <Button actionOnClick={showMore} disabled={disabled}>
          Show more
        </Button>
      </div>
    </div>
  );
};

export default Users;
