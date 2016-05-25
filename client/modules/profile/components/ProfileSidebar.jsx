import React from 'react';
import Constants from '../../core/libs/constants';
import authContainer from '../../accounts/containers/auth';

const ProfileSidebar = ({ user }) => (
  <ul className="sidebar-menu">
    {user && user.mergedServices.map((key, i) => (
      <li key={key + i}>
        <a href={`/profile/${key}`}>
          {Constants.services[key].title}
        </a>
      </li>
    ))}
    <li>
      <a href="/profile/settings">
        Settings
      </a>
    </li>
  </ul>
);

ProfileSidebar.propTypes = {
  user: React.PropTypes.object,
};

export default authContainer(ProfileSidebar);
