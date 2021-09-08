import React from 'react';
import HomeIcon from 'src/assets/icons/home.svg';
import LogoutIcon from 'src/assets/logout.png';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const SideBar = () => {
    const logout = () => {
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('fullName');
        cookies.remove('username');
        cookies.remove('phoneNumber');
        cookies.remove('avatar');
        cookies.remove('hashedPassword');

        window.location.reload();
    }

    return (
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={HomeIcon} alt="hospital" width="30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={logout}>
                    <img src={LogoutIcon} alt="logout" width="30" />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
