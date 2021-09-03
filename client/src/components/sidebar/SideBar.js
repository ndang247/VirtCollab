import React from 'react';
import HomeIcon from 'src/assets/icons/home.svg';
import LogoutIcon from 'src/assets/logout.png';

const SideBar = () => {
    return (
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon1">
                <div className="icon1__inner">
                    <img src={HomeIcon} alt="hospital" width="30" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner">
                    <img src={LogoutIcon} alt="logout" width="30" />
                </div>
            </div>
        </div>
    );
}

export default SideBar;
