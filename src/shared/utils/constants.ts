import Env from './env';

export const apiConstants = {
  __test__: Env.get('NODE_ENV') === 'test',
  __dev__: Env.get('NODE_ENV') === 'development',
  __prod__: Env.get('NODE_ENV') === 'production',
  __verifyme__: 'test',
  ROLE_CREATED: 'Role created successfully',
  ROLE_FETCHED: 'Role fetched successfully',
  ROLE_NOT_FOUND: 'Role not found',
  ROLE_UPDATED: 'Role updated',
  ROLE_DELETED: 'Role deleted successfully',
  CANNOT_DELETE_ROLE: 'Cannot delete an active role',
  ROLES_FETCHED: 'Roles fetched',
  ADMIN_CREATED: 'Admin created successfully',
  ADMIN_UPDATED: 'Admin updated',
  ADMIN_NOT_FOUND: 'Admin not found',
  OTP_EXPIRED: 'Otp expired',
  WRONG_OTP: 'Otp is incorrect',
  OTP_VERIFIED:
    'Your otp has been succesfully verified, now you can proceed to create a new password to access your account',
  ADMIN_NOT_EXIST: 'Admin does not exist',
  INVALID_LOGIN: 'Invalid login',
  LOGIN_SUCCESS: 'Login successful',
  MISSING_TOKEN: 'Missing token',
  UNAUTHORIZED_REQUEST: 'Unauthorized',
  ADMINS_FETCHED: 'Admins fetched',
  ADMIN_FETCHED: 'Admin fetched',
  ADMIN_DELETED: 'Admin deleted',
  CANNOT_DELETE_ADMIN: 'Cannot delete an active admin',
  ADMIN_FORBIDDEN:
    'You currently lack sufficient permissions to perform this action',
  ADMIN_EXISTS: 'Email already exists',
  ROLE_EXISTS: 'A role with the same name already exists',
  STATUS_FAILED: 'failure',
  OTP_SENT: 'Otp sent',
  CREATE_PASSWORD:
    'Your password has been saved successfully and your account has been created',
  ACTIVATE: 'activate',
  ROLE_HAS_USERS:
    'Sorry, unable to deactivate role. Users are currently assigned to this role',
  // DEV_FRONTEND_LINK: 'https://generic-project.envern.com/auth/create-password',
  OTP_MAIL_SUBJECT: 'Password Reset OTP',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SELECT_ACTIVE_ROLE: 'Please select an active role',
  CANNOT_DELETE_SUPERADMIN: 'Cannot delete a super admin',
  ADMIN_INVITE_SUBJECT: 'Admin Invite',
  CANNOT_EDIT_SUPER_ADMIN: 'Cannot edit super admin',
  ACTIVATE_ACCOUNT: 'Contact your admin to activate your account',
  COMMUNITIES_FETCHED: 'Communities details fetched',
  CANNOT_FETCH_COMMUNITIES: 'Error fetching savings details',
  COMMUNITY_FETCHED: 'Community fetched successfully',
  COMMUNITY_NOT_FOUND: 'Community not found',
  PARTICIPANTS_FETCHED: 'Participants fetched',
  GENERIC_SUCCESS: 'Request successful',
  CANNOT_REMOVE_OWNER: 'Cannot remove owner',
  MEMBER_LIMIT: (count: string) =>
    `Sorry, there are already ${count} members in this group you can only add a maximum of 12 members to a group.`,
  ADDED_MEMBERS: (count: string, communityName: string) =>
    `You have successfully added ${count} members to "${communityName}"`,
  COMMUNITY_DELETED: 'Community deleted',
  COMMUNITY_CREATED: (name: string) =>
    `You have successfully created a thrift community - "${name}"`,
};

export const scheduleTimes = {
  EVERY_THIRTY_MINUTES: '*/30 * * * *',
  EVERY_TWO_MINUTES: '*/2 * * * *',
};
