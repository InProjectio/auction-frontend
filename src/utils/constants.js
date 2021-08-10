export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const EMPLOYEE_STATUS_SELECT = [{
  label: 'All',
  value: ''
}, {
  label: 'Active',
  value: 'ACTIVE'
}, {
  label: 'Inactive',
  value: 'INACTIVE'
}]

export const EMPLOYEE_STATUS = [{
  label: 'Active',
  value: 'ACTIVE'
}, {
  label: 'Inactive',
  value: 'INACTIVE'
}]

export const EMPLOYEE_STATUS_OBJ = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
}

export const GROUP_STATUS_SELECT = [{
  label: 'All',
  value: ''
}, {
  label: 'Active',
  value: 'ACTIVE'
}, {
  label: 'Inactive',
  value: 'INACTIVE'
}]

export const GROUP_STATUS = [{
  label: 'Active',
  value: 'ACTIVE'
}, {
  label: 'Inactive',
  value: 'INACTIVE'
}]

export const GROUP_STATUS_OBJ = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
}

export const INVITING_STATUS_SELECT = [{
  label: 'All',
  value: ''
}, {
  label: 'Accepted',
  value: 'ACCEPT'
}, {
  label: 'Pending',
  value: 'PENDING'
}, {
  label: 'Canceled',
  value: 'REJECT'
}]

export const INVITING_STATUS = [{
  label: 'Accepted',
  value: 'ACCEPT'
}, {
  label: 'Pending',
  value: 'PENDING'
}]

export const INVITING_STATUS_OBJ = {
  ACCEPT: 'Accepted',
  PENDING: 'Pending',
  REJECT: 'Canceled'
}

export const REQUESTING_STATUS_SELECT = [{
  label: 'All',
  value: ''
}, {
  label: 'Pending',
  value: 'UNVERIFY'
}, {
  label: 'Accepted',
  value: 'ACCEPT'
}, {
  label: 'Rejected',
  value: 'REJECT'
}]

export const REQUESTING_STATUS = [{
  label: 'Pending',
  value: 'UNVERIFY'
}, {
  label: 'Accepted',
  value: 'ACCEPT'
}, {
  label: 'Rejected',
  value: 'REJECT'
}
]

export const REQUESTING_STATUS_OBJ = {
  PENDING: 'Pending',
  ACCEPT: 'Accepted',
  REJECT: 'Rejected',
  UNVERIFY: 'Pending'
}

export const EMPLOYEE_ROLES_SELECT = [{
  label: 'All',
  value: ''
}, {
  label: 'View',
  value: 'EMPLOYEE'
}, {
  label: 'Edit',
  value: 'PROFILE'
}]

export const EMPLOYEE_ROLES = [{
  label: 'View',
  value: 'EMPLOYEE'
}, {
  label: 'Edit',
  value: 'PROFILE'
}]

export const EMPLOYEE_ROLE_OBJ = {
  EMPLOYEE: 'View',
  PROFILE: 'Edit',
  OWNER: 'Owner'
}

export const BIDDERS = [{
  label: 'Open bidding',
  value: 'PUBLIC'
}, {
  label: 'Private bidding',
  value: 'PRIVATE'
}]

export const BIDDERS_OBJ = {
  PUBLIC: 'Open bidding',
  PRIVATE: 'Private bidding'
}

export const BIDDERS_METHODS = [{
  label: 'Single Stage - One Envelope Bidding Procedure',
  value: 'SIMPLE_STAGE'
}]

export const BIDDERS_METHODS_OBJ = {
  SIMPLE_STAGE: 'Single Stage - One Envelope Bidding Procedure',
}

export const BIDDING_STATUS = [{
  label: 'All',
  value: ''
}, {
  label: 'Accept',
  value: 'ACCEPT'
}, {
  label: 'Reject',
  value: 'REJECT'
}]

export const BIDDING_STATUS_OBJ = {
  ACCEPT: 'Accept',
  REJECT: 'Reject'
}

export const PACKAGE_STATUS = [{
  label: 'All',
  value: ''
}, {
  label: 'Bidding',
  value: 'BIDDING'
}, {
  label: 'Selecting',
  value: 'SELECTING'
}]

export const PACKAGE_STATUS_COMPLETE = [{
  label: 'All',
  value: ''
}, {
  label: 'Cancel',
  value: 'CANCEL'
}, {
  label: 'Done',
  value: 'CLOSING'
}]

export const PACKAGE_STATUS_OBJ = {
  BIDDING: 'Bidding',
  SELECTING: 'Selecting',
  CANCEL: 'Cancel',
  CLOSING: 'Done'
}
